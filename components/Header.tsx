export default function Header() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header
      style={{
        marginBottom: 32,
      }}
    >
      <h1
        style={{
          fontSize: 36,
          marginBottom: 8,
        }}
      >
        🏡 Leu Crew HQ
      </h1>

      <p
        style={{
          fontSize: 18,
          margin: 0,
        }}
      >
        Good evening, Christine 👋
      </p>

      <p
        style={{
          color: "#666",
          marginTop: 8,
        }}
      >
        Keeping your family organized, one day at a time.
      </p>

      <p
        style={{
          marginTop: 12,
          fontSize: 14,
        }}
      >
        📅 {formattedDate}
      </p>
    </header>
  );
}