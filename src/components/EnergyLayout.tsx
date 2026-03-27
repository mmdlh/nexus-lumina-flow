import { useLocation, useNavigate } from "react-router-dom";

const leftNav = [
  { label: "综合概览", path: "/" },
  { label: "电力分析", path: "/power" },
  { label: "能耗监测", path: "/consumption" },
  { label: "碳排放", path: "/carbon" },
];

const rightNav = [
  { label: "新能源", path: "/renewable" },
  { label: "负荷预测", path: "/forecast" },
  { label: "储能管理", path: "/storage" },
  { label: "智能预警", path: "/alerts" },
];

export default function EnergyLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.03]" 
          style={{ background: 'radial-gradient(circle, hsl(195 100% 50%), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-[0.03]" 
          style={{ background: 'radial-gradient(circle, hsl(160 100% 45%), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]" 
          style={{ background: 'radial-gradient(circle, hsl(270 80% 60%), transparent)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50" style={{
        background: 'linear-gradient(180deg, hsl(215 30% 10% / 0.95), hsl(220 25% 6% / 0.9))',
        backdropFilter: 'blur(20px)',
      }}>
        <div className="shimmer-line top-0" />
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left Nav */}
          <nav className="flex items-center gap-1">
            {leftNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Center Title */}
          <div className="flex flex-col items-center px-6">
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-widest energy-gradient-text whitespace-nowrap">
              能源分析预测平台
            </h1>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-0.5 font-display">
              ENERGY ANALYTICS PLATFORM
            </div>
          </div>

          {/* Right Nav */}
          <nav className="flex items-center gap-1">
            {rightNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="shimmer-line bottom-0" />
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
