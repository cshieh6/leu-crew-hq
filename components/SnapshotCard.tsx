type SnapshotCardProps = {
  remainingTasks: number;
  remainingShopping: number;
};

export default function SnapshotCard({
  remainingTasks,
  remainingShopping,
}: SnapshotCardProps) {
  return (
    <section
      style={{
        borderRadius: 20,
        padding: 24,
        background: "#f8f8f8",
        border: "1px solid #ddd",
        marginBottom: 24,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        ☀️ Today&apos;s Snapshot
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
        }}
      >
        <div>
          <strong>✅ Tasks</strong>
          <p style={{ margin: "6px 0" }}>
            {remainingTasks} remaining
          </p>
        </div>

        <div>
          <strong>🛒 Shopping</strong>
          <p style={{ margin: "6px 0" }}>
            {remainingShopping} items
          </p>
        </div>

        <div>
          <strong>📅 Calendar</strong>
          <p style={{ margin: "6px 0" }}>
            Coming soon
          </p>
        </div>

        <div>
          <strong>🐶 Kobe</strong>
          <p style={{ margin: "6px 0" }}>
            Care tracker coming soon
          </p>
        </div>
      </div>
    </section>
  );
}