import { LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { Zap, Battery, Gauge, Cable } from "lucide-react";

const hourlyLoad = Array.from({ length: 48 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
  负荷: 2800 + Math.sin(i / 6) * 1200 + Math.random() * 200,
  预测: 2900 + Math.sin(i / 6) * 1100 + Math.random() * 100,
}));

const voltageData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}日`,
  A相: 220 + Math.random() * 5 - 2.5,
  B相: 220 + Math.random() * 5 - 2.5,
  C相: 220 + Math.random() * 5 - 2.5,
}));

const frequencyData = Array.from({ length: 60 }, (_, i) => ({
  sec: `${i}s`,
  频率: 50 + (Math.random() - 0.5) * 0.1,
}));

const regionData = [
  { region: "华北", 发电: 1520, 用电: 1480, 峰值: 1800 },
  { region: "华东", 发电: 2100, 用电: 2050, 峰值: 2500 },
  { region: "华南", 发电: 1380, 用电: 1350, 峰值: 1600 },
  { region: "西北", 发电: 980, 用电: 720, 峰值: 1100 },
  { region: "东北", 发电: 860, 用电: 830, 峰值: 1000 },
  { region: "西南", 发电: 1100, 用电: 980, 峰值: 1300 },
];

export default function PowerAnalysis() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="总装机容量" value="8,542" unit="MW" trend={3.2} icon={<Zap size={18} />} />
        <StatCard title="电网频率" value="50.01" unit="Hz" icon={<Gauge size={18} />} />
        <StatCard title="线路损耗" value="3.2" unit="%" trend={-0.5} icon={<Cable size={18} />} />
        <StatCard title="备用容量" value="1,286" unit="MW" icon={<Battery size={18} />} />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">实时负荷 vs 预测负荷 (48h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="time" stroke="hsl(210,20%,40%)" fontSize={9} interval={5} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="负荷" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="预测" stroke="hsl(30,100%,55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">电网频率实时监控</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={frequencyData}>
              <defs>
                <linearGradient id="freqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,100%,45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,100%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="sec" stroke="hsl(210,20%,40%)" fontSize={9} interval={9} />
              <YAxis domain={[49.9, 50.1]} stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="频率" stroke="hsl(160,100%,45%)" fill="url(#freqGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">三相电压30日监测</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={9} interval={4} />
              <YAxis domain={[215, 225]} stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="A相" stroke="hsl(195,100%,50%)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="B相" stroke="hsl(160,100%,45%)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="C相" stroke="hsl(270,80%,60%)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">区域发用电对比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="region" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="发电" fill="hsl(195,100%,50%)" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Bar dataKey="用电" fill="hsl(270,80%,60%)" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Line type="monotone" dataKey="峰值" stroke="hsl(30,100%,55%)" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
