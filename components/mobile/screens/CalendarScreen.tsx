
"use client";

import CalendarCard from "@/components/CalendarCard";
import BottomNav from "../BottomNav";
import PageContainer from "../PageContainer";
import Card from "../Card";
import AppHeader from "../AppHeader";
import { getLocalDateString } from "@/lib/dateUtils";

export default function CalendarScreen({
  events,
  activeTab,
  setActiveTab,
}: any) {
  const today = getLocalDateString();

  const todaysEvents = events.filter(
    (event: any) => event.date === today
  );

  return (
    <PageContainer>
      <AppHeader
        title="📅 Calendar"
        subtitle="What's coming up"
      />

      <p
        style={{
          color: "#666",
          marginTop: -10,
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        Your family's schedule, appointments, and important dates.
      </p>

      {/* Today */}
      <Card>
        <h3
          style={{
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          🌅 Today
        </h3>

        {todaysEvents.length === 0 ? (
          <div
            style={{
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                fontSize: 15,
                marginBottom: 3,
              }}
            >
              No events today 🎉
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#999",
              }}
            >
              Enjoy the extra breathing room!
            </div>
          </div>
        ) : (
          <div>
            {todaysEvents.map((event: any, index: number) => (
              <div
                key={event.id}
                style={{
                  padding: "12px 0",
                  borderBottom:
                    index === todaysEvents.length - 1
                      ? "none"
                      : "1px solid #eee",
                  lineHeight: 1.4,
                }}
              >
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  {event.emoji || "📅"} {event.title}
                </div>

                {event.start_time && (
                  <div
                    style={{
                      color: "#666",
                      fontSize: 14,
                      marginTop: 4,
                      marginLeft: 26,
                    }}
                  >
                    ⏰ {event.start_time}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Upcoming Calendar */}
      <Card>
        <div
          style={{
            marginBottom: 18,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 4,
            }}
          >
            🗓️ Upcoming
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            See what's ahead for the Leu Crew.
          </div>
        </div>

        {events.length === 0 ? (
          <div
            style={{
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            No upcoming events.
          </div>
        ) : (
          <CalendarCard events={events} />
        )}
      </Card>

      {/* Bottom navigation spacing */}
      <div style={{ height: 90 }} />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </PageContainer>
  );
}

