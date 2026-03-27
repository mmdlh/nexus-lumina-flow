import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { Leaf, Wind, TreePine, Globe } from "lucide-react";

const yearlyCarbon = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  排放量: 5000 - i * 120 + Math.random() * 200,
  配额: 5500 - i * 80,
  减排目标: 4800 - i * 150,
}));

const sectorData = [
  { sector: "电力", value: 42 },
  { sector: "工业", value: 28 },
  { sector: "交通", value: 16 },
  { sector: "建筑", value: 9 },
  { sector: "其他", value: 5 },
];

const tradingData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  碳价: 55 + Math.sin(i / 5) * 8 + Math.random() * 3,
  成交量: 200 + Math.random() * 300,
}));

const reductionPlan = [
  { year: "2020", 实际: 6200, 目标: 6500 },
  { year: "2021", 实际: 5800, 目标: 6100 },
  { year: "2022", 实际: 5400, 目标: 5700 },
  { year: "2023", 实际: 4900, 目标: 5300 },
  { year: "2024", 实际: 4500, 目标: 4900 },
  { year: "2025", 实际: 4100, 目标: 4500 },
  { year: "2026", 目标: 4000 },
  { year: "2027", 目标: 3500 },
  { year: "2028", 目标: 3000 },
  { year: "2030", 目标: 2000 },
];

const COLORS = ["hsl(195,100%,50%)", "hsl(160,100%,45%)", "hsl(270,80%,60%)", "hsl(30,100%,55%)", "hsl(45,100%,55%)"];

export default function Carbon() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="年度碳排放" value="48,200" unit="吨CO₂" trend={-8.3} icon={<Globe size={18} />} />
        <StatCard title="碳配额剩余" value="12,800" unit="吨" icon={<Leaf size={18} />} />
        <StatCard title="碳交易收益" value="256" unit="万元" trend={15.2} icon={<Wind size={18} />} />
        <StatCard title="植树当量" value="8,540" unit="棵" trend={22.1} icon={<TreePine size={18} />} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="chart-container glow-border">
          <h3 className="chart-title">月度碳排放趋势与配额</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yearlyCarbon}>
              <defs>
                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0,85%,55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(0,85%,55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="排放量" stroke="hsl(0,85%,55%)" fill="url(#carbonGrad)" strokeWidth={2} />
              <Line type="monotone" dataKey="配额" stroke="hsl(45,100%,55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="减排目标" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={false} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glow-border">
          <h3 className="chart-title">碳交易市场 (30日)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={9} interval={4} />
              <YAxis yAxisId="price" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis yAxisId="vol" orientation="right" stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Bar yAxisId="vol" dataKey="成交量" fill="hsl(210,20%,25%)" opacity={0.5} radius={[2, 2, 0, 0]} />
              <Line yAxisId="price" type="monotone" dataKey="碳价" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="chart-container glow-border">
          <h3 className="chart-title">行业碳排放占比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={sectorData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={{ stroke: 'hsl(210,20%,40%)' }} fontSize={10}>
                {sectorData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 chart-container glow-border">
          <h3 className="chart-title">碳中和路径规划 (2020-2030)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reductionPlan}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="year" stroke="hsl(210,20%,40%)" fontSize={10} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="实际" fill="hsl(195,100%,50%)" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Bar dataKey="目标" fill="hsl(160,100%,45%)" radius={[3, 3, 0, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
