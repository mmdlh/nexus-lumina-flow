import { AreaChart, Area, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { Battery, BatteryCharging, Gauge, CircleDollarSign } from "lucide-react";

const socData = Array.from({ length: 48 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
  SOC: 40 + Math.sin(i / 6) * 30 + Math.random() * 5,
  充放电: Math.sin(i / 4) * 500,
}));

const cycleData = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  循环次数: 180 + Math.random() * 60,
  健康度: 98 - i * 0.3 - Math.random() * 0.5,
}));

const economicData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  电价: i >= 8 && i <= 11 || i >= 17 && i <= 21 ? 0.8 + Math.random() * 0.3 : 0.3 + Math.random() * 0.15,
  储能策略: i >= 1 && i <= 6 ? 200 : i >= 8 && i <= 11 || i >= 17 && i <= 21 ? -300 : 0,
}));

const stationData = [
  { name: "站点A", soc: 85, fill: "hsl(160,100%,45%)" },
  { name: "站点B", soc: 62, fill: "hsl(195,100%,50%)" },
  { name: "站点C", soc: 45, fill: "hsl(45,100%,55%)" },
  { name: "站点D", soc: 92, fill: "hsl(270,80%,60%)" },
  { name: "站点E", soc: 28, fill: "hsl(0,85%,55%)" },
];

export default function Storage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="总装机容量" value="500" unit="MWh" icon={<Battery size={18} />} />
        <StatCard title="平均SOC" value="68.5" unit="%" icon={<BatteryCharging size={18} />} />
        <StatCard title="系统效率" value="92.3" unit="%" trend={0.8} icon={<Gauge size={18} />} />
        <StatCard title="日收益" value="12.8" unit="万元" trend={6.2} icon={<CircleDollarSign size={18} />} />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 chart-container glow-border">
          <h3 className="chart-title">储能SOC与充放电功率 (48h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={socData}>
              <defs>
                <linearGradient id="socGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,100%,45%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(160,100%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="time" stroke="hsl(210,20%,40%)" fontSize={9} interval={5} />
              <YAxis yAxisId="soc" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis yAxisId="power" orientation="right" stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area yAxisId="soc" type="monotone" dataKey="SOC" stroke="hsl(160,100%,45%)" fill="url(#socGrad)" strokeWidth={2} />
              <Line yAxisId="power" type="monotone" dataKey="充放电" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 chart-container glow-border">
          <h3 className="chart-title">各站点实时SOC</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="15%" outerRadius="85%" data={stationData} startAngle={180} endAngle={-180}>
              <RadialBar background={{ fill: 'hsl(210,30%,15%)' }} dataKey="soc" cornerRadius={5} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center">
            {stationData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                <span className="text-muted-foreground">{d.name} {d.soc}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="chart-title">月度循环与健康度</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis yAxisId="cycle" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis yAxisId="health" orientation="right" domain={[94, 100]} stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar yAxisId="cycle" dataKey="循环次数" fill="hsl(270,80%,60%)" radius={[3, 3, 0, 0]} opacity={0.7} />
              <Line yAxisId="health" type="monotone" dataKey="健康度" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={{ r: 3 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="chart-title">峰谷套利策略</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={economicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="hour" stroke="hsl(210,20%,40%)" fontSize={9} interval={3} />
              <YAxis yAxisId="price" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis yAxisId="strategy" orientation="right" stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar yAxisId="strategy" dataKey="储能策略" radius={[3, 3, 0, 0]}>
                {economicData.map((d, i) => (
                  <rect key={i} fill={d.储能策略 >= 0 ? "hsl(160,100%,45%)" : "hsl(30,100%,55%)"} opacity={0.7} />
                ))}
              </Bar>
              <Line yAxisId="price" type="stepAfter" dataKey="电价" stroke="hsl(45,100%,55%)" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
