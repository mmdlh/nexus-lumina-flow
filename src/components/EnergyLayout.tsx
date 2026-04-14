import { useLocation, useNavigate } from "react-router-dom";
import energyBg from "@/assets/energy-bg.jpg";

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0">
        <img src={energyBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'hsl(220 25% 6% / 0.3)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50" style={{
        background: 'linear-gradient(180deg, hsl(215 30% 10% / 0.95), hsl(220 25% 6% / 0.9))',
        backdropFilter: 'blur(20px)',
      }}>
        <div className="shimmer-line top-0" />
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left Nav */}
          <nav className="flex items-center gap-2">
            {leftNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item px-5 py-2.5 text-base ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Center Title */}
          <div className="flex flex-col items-center px-10">
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-[0.15em] energy-gradient-text whitespace-nowrap">
              能源分析预测平台
            </h1>
            <div className="text-[11px] tracking-[0.4em] text-muted-foreground mt-1 font-display">
              ENERGY ANALYTICS PLATFORM
            </div>
          </div>

          {/* Right Nav */}
          <nav className="flex items-center gap-2">
            {rightNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item px-5 py-2.5 text-base ${location.pathname === item.path ? "active" : ""}`}
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
