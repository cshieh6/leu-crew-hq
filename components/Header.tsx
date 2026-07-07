export default function Header() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

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
          opacity: 0.7,
        }}
      >
        Good evening, Christine 👋
      </p>

      <p
        style={{
          marginTop: 4,
          opacity: 0.6,
        }}
      >
        {formattedDate}
      </p>
    </header>
  );
}