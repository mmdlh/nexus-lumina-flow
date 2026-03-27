import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import StatCard from "@/components/StatCard";
import { AlertTriangle, Shield, Bell, CheckCircle } from "lucide-react";

const alertTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}日`,
  严重: Math.floor(Math.random() * 3),
  警告: Math.floor(Math.random() * 8) + 2,
  提示: Math.floor(Math.random() * 15) + 5,
}));

const alertTypeData = [
  { name: "过载预警", value: 28 },
  { name: "电压异常", value: 22 },
  { name: "温度过高", value: 18 },
  { name: "设备故障", value: 15 },
  { name: "通信中断", value: 10 },
  { name: "其他", value: 7 },
];

const responseTime = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  平均响应: 12 - i * 0.5 + Math.random() * 3,
  目标: 8,
}));

const COLORS = ["hsl(0,85%,55%)", "hsl(30,100%,55%)", "hsl(45,100%,55%)", "hsl(195,100%,50%)", "hsl(270,80%,60%)", "hsl(160,100%,45%)"];

const activeAlerts = [
  { id: 1, level: "严重", msg: "华东区域#3变压器温度超限 (92°C)", time: "2分钟前", color: "hsl(0,85%,55%)" },
  { id: 2, level: "警告", msg: "B栋数据中心负荷接近容量上限 (95%)", time: "8分钟前", color: "hsl(30,100%,55%)" },
  { id: 3, level: "警告", msg: "光伏组串#12通信异常", time: "15分钟前", color: "hsl(30,100%,55%)" },
  { id: 4, level: "提示", msg: "储能站点E SOC低于30%", time: "22分钟前", color: "hsl(45,100%,55%)" },
  { id: 5, level: "提示", msg: "西北区域风速下降，预计出力减少20%", time: "35分钟前", color: "hsl(45,100%,55%)" },
  { id: 6, level: "严重", msg: "C区配电线路接地故障告警", time: "41分钟前", color: "hsl(0,85%,55%)" },
];

export default function Alerts() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日告警总数" value="47" unit="条" trend={-12.5} icon={<Bell size={18} />} />
        <StatCard title="严重告警" value="3" unit="条" icon={<AlertTriangle size={18} />} />
        <StatCard title="已处理率" value="89.4" unit="%" trend={5.2} icon={<CheckCircle size={18} />} />
        <StatCard title="平均响应" value="6.2" unit="分钟" trend={-18.3} icon={<Shield size={18} />} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Live alerts list */}
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">实时告警列表</h3>
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="glass-panel p-3 flex items-start gap-3 animate-pulse-glow" style={{ animationDelay: `${alert.id * 0.3}s` }}>
                <span className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.color, boxShadow: `0 0 8px ${alert.color}` }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${alert.color}20`, color: alert.color }}>
                      {alert.level}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{alert.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">30日告警趋势</h3>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={alertTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={8} interval={4} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="严重" fill="hsl(0,85%,55%)" stackId="a" radius={[0, 0, 0, 0]} opacity={0.8} />
              <Bar dataKey="警告" fill="hsl(30,100%,55%)" stackId="a" opacity={0.7} />
              <Bar dataKey="提示" fill="hsl(45,100%,55%)" stackId="a" radius={[3, 3, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">告警类型分布</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={alertTypeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: 'hsl(210,20%,40%)' }} fontSize={10}>
                {alertTypeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">月度平均响应时间</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={responseTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="平均响应" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="目标" stroke="hsl(160,100%,45%)" strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
