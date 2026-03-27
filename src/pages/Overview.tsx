import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import StatCard from "@/components/StatCard";
import { Zap, TrendingUp, Leaf, Activity } from "lucide-react";

const areaData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  电力: 300 + Math.sin(i / 3) * 150 + Math.random() * 50,
  天然气: 120 + Math.cos(i / 4) * 60 + Math.random() * 30,
  热力: 80 + Math.sin(i / 5) * 40 + Math.random() * 20,
}));

const pieData = [
  { name: "煤炭", value: 35 },
  { name: "天然气", value: 25 },
  { name: "风电", value: 18 },
  { name: "光伏", value: 15 },
  { name: "水电", value: 7 },
];

const radarData = [
  { subject: "供电可靠性", A: 92 },
  { subject: "能效比", A: 85 },
  { subject: "碳减排", A: 78 },
  { subject: "新能源占比", A: 88 },
  { subject: "负荷率", A: 72 },
  { subject: "设备健康", A: 90 },
];

const barData = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  发电量: 800 + Math.random() * 400,
  用电量: 700 + Math.random() * 350,
}));

const COLORS = ["hsl(195,100%,50%)", "hsl(160,100%,45%)", "hsl(270,80%,60%)", "hsl(30,100%,55%)", "hsl(45,100%,55%)"];

export default function Overview() {
  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日发电量" value="12,847" unit="MWh" trend={5.2} icon={<Zap size={18} />} />
        <StatCard title="实时负荷" value="4,256" unit="MW" trend={-2.1} icon={<Activity size={18} />} />
        <StatCard title="能源效率" value="94.7" unit="%" trend={1.8} icon={<TrendingUp size={18} />} />
        <StatCard title="碳减排量" value="3,580" unit="吨" trend={12.5} icon={<Leaf size={18} />} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">24小时多能源趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="cyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195,100%,50%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(195,100%,50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,100%,45%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(160,100%,45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(270,80%,60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(270,80%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="time" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="电力" stroke="hsl(195,100%,50%)" fill="url(#cyan)" strokeWidth={2} />
              <Area type="monotone" dataKey="天然气" stroke="hsl(160,100%,45%)" fill="url(#green)" strokeWidth={2} />
              <Area type="monotone" dataKey="热力" stroke="hsl(270,80%,60%)" fill="url(#purple)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">能源结构占比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">月度发用电对比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="发电量" fill="hsl(195,100%,50%)" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar dataKey="用电量" fill="hsl(270,80%,60%)" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">能源系统健康雷达</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(210,30%,18%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(210,20%,45%)" fontSize={10} />
              <Radar name="指标" dataKey="A" stroke="hsl(195,100%,50%)" fill="hsl(195,100%,50%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
