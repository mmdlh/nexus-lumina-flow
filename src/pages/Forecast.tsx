import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ZAxis } from "recharts";
import StatCard from "@/components/StatCard";
import { BrainCircuit, Target, Clock, TrendingUp } from "lucide-react";

const forecastData = Array.from({ length: 72 }, (_, i) => {
  const base = 3000 + Math.sin(i / 8) * 1200;
  return {
    hour: `${i}h`,
    实际负荷: i < 48 ? base + Math.random() * 200 : undefined,
    预测负荷: base + Math.random() * 150 - 75,
    上限: base + 400,
    下限: base - 400,
  };
});

const accuracyData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}日`,
  准确率: 92 + Math.random() * 6,
}));

const peakData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  工作日: 2500 + Math.sin((i - 3) / 8) * 1500,
  周末: 1800 + Math.sin((i - 5) / 8) * 800,
}));

const scatterData = Array.from({ length: 100 }, () => ({
  温度: 15 + Math.random() * 25,
  负荷: 2000 + Math.random() * 3000,
  z: 50 + Math.random() * 200,
}));

export default function Forecast() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="预测准确率" value="96.8" unit="%" icon={<Target size={18} />} />
        <StatCard title="AI模型版本" value="v3.2" icon={<BrainCircuit size={18} />} />
        <StatCard title="预测时长" value="72" unit="小时" icon={<Clock size={18} />} />
        <StatCard title="峰值预测" value="4,856" unit="MW" trend={3.1} icon={<TrendingUp size={18} />} />
      </div>

      <div className="chart-container glow-border">
        <h3 className="chart-title">72小时负荷预测 (含置信区间)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(195,100%,50%)" stopOpacity={0.1} />
                <stop offset="100%" stopColor="hsl(195,100%,50%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
            <XAxis dataKey="hour" stroke="hsl(210,20%,40%)" fontSize={9} interval={5} />
            <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
            <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="上限" stroke="none" fill="url(#confidenceGrad)" />
            <Area type="monotone" dataKey="下限" stroke="none" fill="url(#confidenceGrad)" />
            <Line type="monotone" dataKey="实际负荷" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="预测负荷" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="chart-container glow-border">
          <h3 className="chart-title">预测准确率 (30日)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={8} interval={4} />
              <YAxis domain={[88, 100]} stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="准确率" radius={[3, 3, 0, 0]}>
                {accuracyData.map((d, i) => (
                  <rect key={i} fill={d.准确率 > 95 ? "hsl(160,100%,45%)" : d.准确率 > 92 ? "hsl(45,100%,55%)" : "hsl(0,85%,55%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="chart-title">工作日 vs 周末负荷模式</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={peakData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="hour" stroke="hsl(210,20%,40%)" fontSize={9} interval={3} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="工作日" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="周末" stroke="hsl(270,80%,60%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="chart-title">温度-负荷相关性</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="温度" name="温度" unit="°C" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis dataKey="负荷" name="负荷" unit="MW" stroke="hsl(210,20%,40%)" fontSize={10} />
              <ZAxis dataKey="z" range={[20, 80]} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Scatter data={scatterData} fill="hsl(195,100%,50%)" opacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
