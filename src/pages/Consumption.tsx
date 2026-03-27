import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Treemap } from "recharts";
import StatCard from "@/components/StatCard";
import { Building2, Factory, Home, Lightbulb } from "lucide-react";

const buildingData = [
  { name: "A栋办公楼", 本月: 4520, 上月: 4300 },
  { name: "B栋研发中心", 本月: 6800, 上月: 6500 },
  { name: "C栋数据中心", 本月: 12500, 上月: 12800 },
  { name: "D栋生产车间", 本月: 8900, 上月: 8600 },
  { name: "E栋仓储", 本月: 2100, 上月: 2200 },
  { name: "F栋员工宿舍", 本月: 3200, 上月: 3100 },
];

const dailyData = Array.from({ length: 31 }, (_, i) => ({
  day: `${i + 1}`,
  用电: 800 + Math.sin(i / 4) * 300 + Math.random() * 100,
  用水: 200 + Math.cos(i / 5) * 80 + Math.random() * 30,
  用气: 150 + Math.sin(i / 3) * 60 + Math.random() * 20,
}));

const treemapData = [
  { name: "照明", size: 2800, fill: "hsl(195,100%,50%)" },
  { name: "空调暖通", size: 4500, fill: "hsl(160,100%,45%)" },
  { name: "动力设备", size: 3800, fill: "hsl(270,80%,60%)" },
  { name: "IT设备", size: 5200, fill: "hsl(30,100%,55%)" },
  { name: "电梯", size: 1200, fill: "hsl(45,100%,55%)" },
  { name: "生活热水", size: 800, fill: "hsl(0,85%,55%)" },
  { name: "其他", size: 600, fill: "hsl(180,70%,45%)" },
];

const COLORS = ["hsl(195,100%,50%)", "hsl(160,100%,45%)", "hsl(270,80%,60%)", "hsl(30,100%,55%)"];

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, fill } = props;
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} opacity={0.7} rx={4} stroke="hsl(210,30%,18%)" strokeWidth={2} />
      <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="hsl(200,100%,95%)" fontSize={11} fontWeight={500}>
        {name}
      </text>
    </g>
  );
};

export default function Consumption() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="本月总能耗" value="38,020" unit="kWh" trend={-3.8} icon={<Building2 size={18} />} />
        <StatCard title="工业能耗" value="21,400" unit="kWh" trend={2.1} icon={<Factory size={18} />} />
        <StatCard title="生活能耗" value="5,320" unit="kWh" trend={-5.2} icon={<Home size={18} />} />
        <StatCard title="节能率" value="8.6" unit="%" trend={1.3} icon={<Lightbulb size={18} />} />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 chart-container glow-border">
          <h3 className="chart-title">每日多维能耗趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
              <XAxis dataKey="day" stroke="hsl(210,20%,40%)" fontSize={9} />
              <YAxis stroke="hsl(210,20%,40%)" fontSize={10} />
              <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="用电" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="用水" stroke="hsl(160,100%,45%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="用气" stroke="hsl(270,80%,60%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 chart-container glow-border">
          <h3 className="chart-title">能耗分类矩阵</h3>
          <ResponsiveContainer width="100%" height={280}>
            <Treemap data={treemapData} dataKey="size" aspectRatio={4 / 3} content={<CustomTreemapContent />} />
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container glow-border">
        <h3 className="chart-title">各楼宇用电月度对比</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={buildingData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,30%,18%)" />
            <XAxis type="number" stroke="hsl(210,20%,40%)" fontSize={10} />
            <YAxis type="category" dataKey="name" stroke="hsl(210,20%,40%)" fontSize={10} width={100} />
            <Tooltip contentStyle={{ background: 'hsl(215,30%,12%)', border: '1px solid hsl(210,40%,25%)', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="本月" fill="hsl(195,100%,50%)" radius={[0, 4, 4, 0]} opacity={0.8} />
            <Bar dataKey="上月" fill="hsl(210,20%,35%)" radius={[0, 4, 4, 0]} opacity={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
