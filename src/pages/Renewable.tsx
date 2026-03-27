import { AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { Sun, Wind, Waves, Atom } from "lucide-react";

const solarData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  光伏出力: i >= 6 && i <= 18 ? Math.sin((i - 6) / 12 * Math.PI) * 800 + Math.random() * 50 : Math.random() * 10,
  辐照强度: i >= 6 && i <= 18 ? Math.sin((i - 6) / 12 * Math.PI) * 1000 : 0,
}));

const windData = Array.from({ length: 48 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
  风电出力: 200 + Math.sin(i / 8) * 150 + Math.random() * 80,
  风速: 4 + Math.sin(i / 8) * 3 + Math.random() * 1.5,
}));

const monthlyNew = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  光伏: 300 + Math.sin((i + 3) / 12 * Math.PI * 2) * 200 + Math.random() * 50,
  风电: 250 + Math.cos((i + 1) / 12 * Math.PI * 2) * 150 + Math.random() * 50,
  水电: 180 + Math.sin((i + 5) / 12 * Math.PI * 2) * 100 + Math.random() * 30,
}));

const capacityData = [
  { name: "光伏", value: 82, fill: "hsl(45,100%,55%)" },
  { name: "风电", value: 68, fill: "hsl(195,100%,50%)" },
  { name: "水电", value: 91, fill: "hsl(160,100%,45%)" },
  { name: "生物质", value: 45, fill: "hsl(270,80%,60%)" },
];

export default function Renewable() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="光伏发电" value="3,820" unit="MWh" trend={18.5} icon={<Sun size={18} />} />
        <StatCard title="风力发电" value="2,450" unit="MWh" trend={7.2} icon={<Wind size={18} />} />
        <StatCard title="水力发电" value="1,680" unit="MWh" trend={-3.1} icon={<Waves size={18} />} />
        <StatCard title="新能源占比" value="42.8" unit="%" trend={5.6} icon={<Atom size={18} />} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">光伏日出力曲线</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={solarData}>
              <defs>
                <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45,100%,55%)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(45,100%,55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="hour" stroke="hsl(210,20%,40%)" fontSize={9} interval={2} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="光伏出力" stroke="hsl(45,100%,55%)" fill="url(#solarGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">风电48h出力曲线</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={windData}>
              <defs>
                <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195,100%,50%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(195,100%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="time" stroke="hsl(210,20%,40%)" fontSize={9} interval={7} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="风电出力" stroke="hsl(195,100%,50%)" fill="url(#windGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">月度新能源发电量</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyNew}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="光伏" fill="hsl(45,100%,55%)" radius={[3, 3, 0, 0]} opacity={0.8} stackId="a" />
              <Bar dataKey="风电" fill="hsl(195,100%,50%)" radius={[3, 3, 0, 0]} opacity={0.8} stackId="a" />
              <Bar dataKey="水电" fill="hsl(160,100%,45%)" radius={[3, 3, 0, 0]} opacity={0.8} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">装机利用率</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={capacityData} startAngle={180} endAngle={-180}>
              <RadialBar background={{ fill: 'hsl(210,30%,15%)' }} dataKey="value" cornerRadius={5} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center">
            {capacityData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                <span className="text-muted-foreground">{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
