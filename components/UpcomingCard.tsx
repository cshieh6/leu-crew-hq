"use client";

import type { ReactNode } from "react";
import Card from "@/components/Card";
import { getEventInfo } from "@/lib/eventUtils";

type Event = {
  id: number;
  title: string;
  date: string;
  start_time?: string | null;
  emoji?: string | null;
  person?: string | null;
};

type FamilyMember = {
  id: number;
  name: string;
  birthday: string | null;
  emoji: string | null;
};

type Task = {
  id: number;
  text: string;
  completed: boolean;
  due_date?: string | null;
};

type UpcomingCardProps = {
  events: Event[];
  family: FamilyMember[];
  tasks: Task[];
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      title: "☀️ Good Morning, Leu Crew!",
      message: "Let's make today a great one.",
    };
  }

  if (hour < 17) {
    return {
      title: "🌤️ Good Afternoon, Leu Crew!",
      message: "Here's what's left for today.",
    };
  }

  return {
    title: "🌙 Good Evening, Leu Crew!",
    message: "Here's what's coming up next.",
  };
}

function daysUntil(date: string | Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target.getTime() - today.getTime()) / 86400000
  );
}

function friendlyDays(date: string) {
  const days = daysUntil(date);

  if (days === 0) return "Today 🎉";
  if (days === 1) return "Tomorrow";

  if (days < 7) {
    return `In ${days} days`;
  }

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(time: string | null | undefined) {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  const date = new Date();

  date.setHours(
    Number(hour),
    Number(minute)
  );

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        background: "#fafafa",
        border: "1px solid #eeeeee",
      }}
    >
      <h3
        style={{
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: 1,
          marginTop: 0,
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

export default function UpcomingCard({
  events,
  family,
  tasks,
}: UpcomingCardProps) {
  const greeting = getGreeting();

  // Today's calendar events
  const todayEvents = events
    .filter(
      (event) =>
        daysUntil(event.date) === 0
    )
    .sort((a, b) => {
      if (!a.start_time) return 1;
      if (!b.start_time) return -1;

      return a.start_time.localeCompare(
        b.start_time
      );
    });

  // Overdue + today's tasks
  const todayTasks = tasks.filter(
    (task) =>
      !task.completed &&
      task.due_date &&
      daysUntil(task.due_date) <= 0
  );

  // Future calendar events
  const upcomingEvents = events
    .filter(
      (event) =>
        daysUntil(event.date) > 0
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  // Find the next upcoming birthdays
  const birthdays = family
    .filter((member) => member.birthday)
    .map((member) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const birthday = new Date(
        member.birthday as string
      );

      birthday.setHours(0, 0, 0, 0);

      birthday.setFullYear(
        today.getFullYear()
      );

      // If the birthday already happened this year,
      // use next year's birthday.
      if (birthday < today) {
        birthday.setFullYear(
          today.getFullYear() + 1
        );
      }

      return {
        ...member,
        nextBirthday: birthday,
      };
    })
    .sort(
      (a, b) =>
        a.nextBirthday.getTime() -
        b.nextBirthday.getTime()
    )
    .slice(0, 3);

  const hasTodayItems =
    todayEvents.length > 0 ||
    todayTasks.length > 0;

  return (
    <Card
      emoji="🏡"
      title={greeting.title}
      subtitle={greeting.message}
    >
      {/* TODAY */}
      <Section title="⭐ Today">
        {!hasTodayItems ? (
          <p>
            Nothing scheduled today. 🎉
          </p>
        ) : (
          <>
            {todayEvents.map((event) => {
              const info = getEventInfo(
                event.title
              );

              return (
                <div
                  key={`event-${event.id}`}
                  style={{
                    marginBottom: 14,
                  }}
                >
                  <strong>
                    {info.categoryEmoji}{" "}
                    {info.cleanTitle}
                  </strong>

                  <div>
                    {info.personEmoji}{" "}
                    {info.person}

                    {event.start_time &&
                      ` · ⏰ ${formatTime(
                        event.start_time
                      )}`}
                  </div>
                </div>
              );
            })}

            {todayTasks.map((task) => {
              const taskDays = task.due_date
                ? daysUntil(task.due_date)
                : 0;

              const isOverdue =
                taskDays < 0;

              return (
                <div
                  key={`task-${task.id}`}
                  style={{
                    marginBottom: 14,
                  }}
                >
                  <strong>
                    {isOverdue
                      ? "🔴"
                      : "☐"}{" "}
                    {task.text}
                  </strong>

                  <div>
                    {isOverdue
                      ? `⚠️ Overdue by ${Math.abs(
                          taskDays
                        )} ${
                          Math.abs(taskDays) ===
                          1
                            ? "day"
                            : "days"
                        }`
                      : "📝 Due today"}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </Section>

      {/* NEXT UP */}
      <Section title="📆 Next Up">
        {upcomingEvents.length === 0 ? (
          <p>
            Nothing coming up yet. 🎉
          </p>
        ) : (
          upcomingEvents
            .slice(0, 5)
            .map((event) => {
              const info = getEventInfo(
                event.title
              );

              return (
                <div
                  key={event.id}
                  style={{
                    marginBottom: 12,
                  }}
                >
                  <strong>
                    {info.categoryEmoji}{" "}
                    {info.cleanTitle}
                  </strong>

                  <div>
                    {info.personEmoji}{" "}
                    {info.person}
                    {" · "}
                    {friendlyDays(event.date)}

                    {event.start_time &&
                      ` · ⏰ ${formatTime(
                        event.start_time
                      )}`}
                  </div>
                </div>
              );
            })
        )}
      </Section>

      {/* CELEBRATIONS */}
      <Section title="🎂 Celebrations">
        {birthdays.length === 0 ? (
          <p>
            No birthdays coming up.
          </p>
        ) : (
          birthdays.map((member) => (
            <div
              key={member.id}
              style={{
                marginBottom: 8,
              }}
            >
              {member.emoji}{" "}
              {member.name}
              {" · "}
              {member.nextBirthday.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
            </div>
          ))
        )}
      </Section>
    </Card>
  );
}