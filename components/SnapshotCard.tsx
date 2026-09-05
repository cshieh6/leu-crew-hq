"use client";

type SnapshotCardProps = {
  remainingTasks: number;
  remainingShopping: number;
  events: any[];
  pets: any[];
  tasks: any[];
  shopping: any[];
  discussions: any[];
};

function daysUntil(date: string | Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);

  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target.getTime() - today.getTime()) /
      86400000
  );
}

export default function SnapshotCard({
  remainingTasks,
  remainingShopping,
  pets,
  tasks,
  discussions,
}: SnapshotCardProps) {
  const activeTasks = tasks.filter(
    (task) => !task.completed
  );

  const overdueTasks = activeTasks.filter(
    (task) =>
      task.due_date &&
      daysUntil(task.due_date) < 0
  );

  const todayTasks = activeTasks.filter(
    (task) =>
      task.due_date &&
      daysUntil(task.due_date) === 0
  );

  const activeDiscussions = discussions.filter(
    (item) => !item.completed
  );

  const upcomingPets = pets
    .map((pet) => {
      const nextDate = new Date(
        pet.last_completed
      );

      nextDate.setDate(
        nextDate.getDate() +
          pet.frequency_days
      );

      return {
        ...pet,
        nextDate,
      };
    })
    .sort(
      (a, b) =>
        a.nextDate.getTime() -
        b.nextDate.getTime()
    );

  const nextPet = upcomingPets[0];

  const petDays = nextPet
    ? daysUntil(nextPet.nextDate)
    : null;

  const hasAttention =
    overdueTasks.length > 0 ||
    todayTasks.length > 0 ||
    activeDiscussions.length > 0 ||
    (petDays !== null && petDays <= 0);

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h2>
        🚨 Leu Crew Snapshot
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
        }}
      >
        <div>
          🔴{" "}
          <strong>
            {overdueTasks.length}
          </strong>
          <br />
          Overdue
        </div>

        <div>
          📋{" "}
          <strong>
            {remainingTasks}
          </strong>
          <br />
          Things To Do
        </div>

        <div>
          🛒{" "}
          <strong>
            {remainingShopping}
          </strong>
          <br />
          Shopping Items
        </div>

        <div>
          💬{" "}
          <strong>
            {activeDiscussions.length}
          </strong>
          <br />
          Discuss
        </div>
      </div>

      {hasAttention ? (
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #eee",
          }}
        >
          <h3>
            ⚡ Needs Attention
          </h3>

          {overdueTasks.map((task) => {
            const days = Math.abs(
              daysUntil(task.due_date)
            );

            return (
              <div
                key={`overdue-${task.id}`}
                style={{
                  marginBottom: 10,
                }}
              >
                🔴 <strong>{task.text}</strong>
                <div
                  style={{
                    fontSize: 14,
                  }}
                >
                  Overdue by {days}{" "}
                  {days === 1 ? "day" : "days"}
                </div>
              </div>
            );
          })}

          {todayTasks.map((task) => (
            <div
              key={`today-${task.id}`}
              style={{
                marginBottom: 10,
              }}
            >
              ⭐ <strong>{task.text}</strong>
              <div
                style={{
                  fontSize: 14,
                }}
              >
                Due today
              </div>
            </div>
          ))}

          {activeDiscussions.length > 0 && (
            <div
              style={{
                marginBottom: 10,
              }}
            >
              💬{" "}
              <strong>
                {activeDiscussions.length} discussion
                {activeDiscussions.length === 1
                  ? ""
                  : "s"}{" "}
                waiting
              </strong>
            </div>
          )}

          {nextPet && petDays !== null && petDays <= 0 && (
            <div>
              🐶{" "}
              <strong>
                Kobe — {nextPet.task}
              </strong>
              <div
                style={{
                  fontSize: 14,
                }}
              >
                {petDays < 0
                  ? `Overdue by ${Math.abs(
                      petDays
                    )} days`
                  : "Due today"}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #eee",
          }}
        >
          <h3>
            🎉 All caught up!
          </h3>

          <p>
            Nothing needs your attention right now.
          </p>
        </div>
      )}
    </section>
  );
}