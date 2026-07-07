type DashboardCardProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
};

export default function DashboardCard({
  title,
  icon,
  children,
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
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 0,
          marginBottom: 16,
          fontSize: 20,
        }}
      >
        {icon} {title}
      </h2>

      {children}
    </section>
  );
}