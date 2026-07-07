type DashboardCardProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  count?: string;
};

export default function DashboardCard({
  title,
  icon,
  children,
  count,
}: DashboardCardProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 20,
        padding: 24,
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minHeight: 160,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 0,
            fontSize: 20,
          }}
        >
          {icon} {title}
        </h2>

        {count && (
          <span
            style={{
              fontSize: 14,
              opacity: 0.6,
            }}
          >
            {count}
          </span>
        )}
      </div>

      {children}
    </section>
  );
}