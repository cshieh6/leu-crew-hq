
"use client";

import Card from "@/components/Card";
import { getEventInfo } from "@/lib/eventUtils";
import { getLocalDateString } from "@/lib/dateUtils";

type Event = {
  id: number;
  title: string;
  date: string;
  start_time?: string | null;
  emoji?: string | null;
  notes?: string | null;
};

function daysUntil(date: string) {
  const today = getLocalDateString();

  const todayDate = new Date(`${today}T00:00:00`);
  const targetDate = new Date(`${date}T00:00:00`);

  return Math.round(
    (targetDate.getTime() - todayDate.getTime()) / 86400000
  );
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );
}

function formatTime(time: string | null | undefined) {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  const date = new Date();

  date.setHours(Number(hour), Number(minute));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function EventRow({
  event,
}: {
  event: Event;
}) {
  const info = getEventInfo(event.title);
  const isToday = daysUntil(event.date) === 0;

  return (
    <div
      style={{
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      {/* Event title */}
      <strong>
        {event.emoji || info.categoryEmoji}
        {" "}
        {info.cleanTitle}
      </strong>

      {/* Person */}
      <div
        style={{
          marginTop: 3,
        }}
      >
        {info.personEmoji}
        {" "}
        {info.person}
      </div>

      {/* Date + Time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 5,
          color: "#666",
          fontSize: 14,
          flexWrap: "wrap",
        }}
      >
        <span>
          📅 {isToday ? "Today" : formatDate(event.date)}
        </span>

        {event.start_time && (
          <>
            <span style={{ color: "#bbb" }}>•</span>

            <span>
              ⏰ {formatTime(event.start_time)}
            </span>
          </>
        )}
      </div>

      {/* Notes */}
      {event.notes && (
        <div
          style={{
            fontSize: 14,
            marginTop: 5,
            color: "#666",
          }}
        >
          📝 {event.notes}
        </div>
      )}
    </div>
  );
}

export default function CalendarCard({
  events,
}: {
  events: Event[];
}) {
  const todayEvents = events.filter(
    (event) => daysUntil(event.date) === 0
  );

  const weekEvents = events.filter(
    (event) =>
      daysUntil(event.date) > 0 &&
      daysUntil(event.date) <= 7
  );

  const laterEvents = events.filter(
    (event) => daysUntil(event.date) > 7
  );

  function sortEvents(items: Event[]) {
    return [...items].sort(
      (a, b) =>
        new Date(`${a.date}T00:00:00`).getTime() -
        new Date(`${b.date}T00:00:00`).getTime()
    );
  }

  return (
    <Card
      emoji="📅"
      title="Calendar"
      subtitle="Family schedule"
    >
      {/* Today */}
      {todayEvents.length > 0 && (
        <div>
          <h3>⭐ Today</h3>

          {sortEvents(todayEvents).map((event) => (
            <EventRow
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}

      {/* This Week */}
      {weekEvents.length > 0 && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <h3>📆 This Week</h3>

          {sortEvents(weekEvents)
            .slice(0, 5)
            .map((event) => (
              <EventRow
                key={event.id}
                event={event}
              />
            ))}
        </div>
      )}

      {/* Coming Up */}
      {laterEvents.length > 0 && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <h3>🔜 Coming Up</h3>

          {sortEvents(laterEvents)
            .slice(0, 3)
            .map((event) => (
              <EventRow
                key={event.id}
                event={event}
              />
            ))}
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <p>
          No upcoming events 🎉
        </p>
      )}
    </Card>
  );
}

