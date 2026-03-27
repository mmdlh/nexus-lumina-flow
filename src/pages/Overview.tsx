import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, ComposedChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import StatCard from "@/components/StatCard";
import { Zap, TrendingUp, Leaf, Activity, Thermometer, Droplets, Gauge, ServerCrash } from "lucide-react";

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
  { subject: "供电可靠性", A: 92, B: 85 },
  { subject: "能效比", A: 85, B: 78 },
  { subject: "碳减排", A: 78, B: 70 },
  { subject: "新能源占比", A: 88, B: 80 },
  { subject: "负荷率", A: 72, B: 68 },
  { subject: "设备健康", A: 90, B: 82 },
];

const barData = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  发电量: 800 + Math.random() * 400,
  用电量: 700 + Math.random() * 350,
}));

const weeklyPeak = Array.from({ length: 7 }, (_, i) => {
  const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  return {
    day: days[i],
    峰值: 3800 + Math.random() * 800,
    谷值: 1200 + Math.random() * 400,
    平均: 2400 + Math.random() * 500,
  };
});

const regionCompare = [
  { region: "华北电网", 负荷: 4520, 容量: 5800, 利用率: 78 },
  { region: "华东电网", 负荷: 6200, 容量: 7500, 利用率: 83 },
  { region: "华南电网", 负荷: 3800, 容量: 4600, 利用率: 83 },
  { region: "西北电网", 负荷: 2100, 容量: 3200, 利用率: 66 },
  { region: "东北电网", 负荷: 2800, 容量: 3500, 利用率: 80 },
];

const efficiencyTrend = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  综合能效: 88 + Math.sin(i / 3) * 5 + Math.random() * 2,
  目标值: 92,
}));

const COLORS = ["hsl(195,100%,50%)", "hsl(160,100%,45%)", "hsl(270,80%,60%)", "hsl(30,100%,55%)", "hsl(45,100%,55%)"];

const tooltipStyle = { background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 };

const realtimeEvents = [
  { time: "14:32", event: "华东区域负荷突破6000MW", type: "info" },
  { time: "14:28", event: "光伏出力达到日峰值 820MW", type: "success" },
  { time: "14:15", event: "储能站B完成充电，SOC 95%", type: "success" },
  { time: "13:58", event: "#3变压器温度偏高，已降载运行", type: "warn" },
  { time: "13:42", event: "西北风电出力下降15%", type: "info" },
  { time: "13:30", event: "碳排放日累计达标进度 78%", type: "success" },
  { time: "13:15", event: "电网频率波动已恢复正常", type: "info" },
  { time: "12:55", event: "A栋办公楼用电量环比上升8%", type: "warn" },
];

const eventColors: Record<string, string> = {
  info: "hsl(195,100%,50%)",
  success: "hsl(160,100%,45%)",
  warn: "hsl(30,100%,55%)",
};

export default function Overview() {
  return (
    <div className="space-y-4">
      {/* Stats Row 1 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日发电量" value="12,847" unit="MWh" trend={5.2} icon={<Zap size={18} />} />
        <StatCard title="实时负荷" value="4,256" unit="MW" trend={-2.1} icon={<Activity size={18} />} />
        <StatCard title="能源效率" value="94.7" unit="%" trend={1.8} icon={<TrendingUp size={18} />} />
        <StatCard title="碳减排量" value="3,580" unit="吨" trend={12.5} icon={<Leaf size={18} />} />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="环境温度" value="26.5" unit="°C" icon={<Thermometer size={18} />} />
        <StatCard title="用水量" value="1,842" unit="m³" trend={-4.3} icon={<Droplets size={18} />} />
        <StatCard title="设备在线率" value="99.2" unit="%" icon={<ServerCrash size={18} />} />
        <StatCard title="电网频率" value="50.01" unit="Hz" icon={<Gauge size={18} />} />
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
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="电力" stroke="hsl(195,100%,50%)" fill="url(#cyan)" strokeWidth={2} />
              <Area type="monotone" dataKey="天然气" stroke="hsl(160,100%,45%)" fill="url(#green)" strokeWidth={2} />
              <Area type="monotone" dataKey="热力" stroke="hsl(270,80%,60%)" fill="url(#purple)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">能源结构占比</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" stroke="none">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-1">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 - 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">本周峰谷负荷</h3>
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={weeklyPeak}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="峰值" fill="hsl(30,100%,55%)" radius={[3, 3, 0, 0]} opacity={0.7} />
              <Bar dataKey="谷值" fill="hsl(195,100%,50%)" radius={[3, 3, 0, 0]} opacity={0.5} />
              <Line type="monotone" dataKey="平均" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">综合能效趋势</h3>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={efficiencyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis domain={[80, 100]} stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="综合能效" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={{ r: 3, fill: 'hsl(195,100%,50%)' }} />
              <Line type="monotone" dataKey="目标值" stroke="hsl(160,100%,45%)" strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">能源系统健康雷达</h3>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(210,30%,18%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(210,20%,45%)" fontSize={9} />
              <Radar name="本月" dataKey="A" stroke="hsl(195,100%,50%)" fill="hsl(195,100%,50%)" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="上月" dataKey="B" stroke="hsl(270,80%,60%)" fill="hsl(270,80%,60%)" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="3 3" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">月度发用电对比</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="发电量" fill="hsl(195,100%,50%)" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar dataKey="用电量" fill="hsl(270,80%,60%)" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">区域电网负荷率</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={regionCompare} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis type="number" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis type="category" dataKey="region" stroke="hsl(210,20%,40%)" fontSize={9} width={70} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="负荷" fill="hsl(195,100%,50%)" radius={[0, 4, 4, 0]} opacity={0.8} stackId="a" />
              <Bar dataKey="容量" fill="hsl(210,20%,25%)" radius={[0, 4, 4, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Real-time events */}
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">实时运行动态</h3>
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {realtimeEvents.map((ev, i) => (
              <div key={i} className="flex items-start gap-2.5 py-1.5 border-b border-border/30 last:border-0">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse-glow" style={{ background: eventColors[ev.type], boxShadow: `0 0 6px ${eventColors[ev.type]}` }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground/80 leading-relaxed">{ev.event}</p>
                  <span className="text-[10px] text-muted-foreground">{ev.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
