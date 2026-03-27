interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: number;
  color?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, unit, trend, icon }: StatCardProps) {
  return (
    <div className="glass-panel-glow p-5 glow-border animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        {icon && <span className="text-primary opacity-60">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="stat-value energy-gradient-text">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`text-xs mt-2 flex items-center gap-1 ${trend >= 0 ? "text-energy-green" : "text-energy-red"}`}>
          <span>{trend >= 0 ? "↑" : "↓"}</span>
          <span>{Math.abs(trend)}%</span>
          <span className="text-muted-foreground ml-1">较上月</span>
        </div>
      )}
    </div>
  );
}
