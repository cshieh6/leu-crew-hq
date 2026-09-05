
"use client";

import AppHeader from "../AppHeader";
import FamilyCard from "@/components/FamilyCard";
import KidsCard from "@/components/KidsCard";
import PetCard from "@/components/PetCard";
import BottomNav from "../BottomNav";
import SectionTitle from "../SectionTitle";
import Card from "../Card";
import PageContainer from "../PageContainer";
import { getLocalDateString } from "@/lib/dateUtils";

export default function HomeScreen({
  tasks,
  shopping,
  family,
  events,
  pets,
  discussions,

  newTask,
  setNewTask,
  newTaskDueDate,
  setNewTaskDueDate,
  addTask,
  deleteTask,
  toggleTask,

  newItem,
  setNewItem,
  newItemStore,
  setNewItemStore,
  addItem,
  deleteItem,
  toggleShoppingItem,

  newDiscussion,
  setNewDiscussion,
  newDiscussionCategory,
  setNewDiscussionCategory,
  newDiscussionPriority,
  setNewDiscussionPriority,
  addDiscussion,
  deleteDiscussion,
  toggleDiscussion,

  activeTab,
  setActiveTab,
}: any) {
  const today = getLocalDateString();

  const remainingTasks = tasks.filter(
    (t: any) => !t.completed
  ).length;

  const remainingShopping = shopping.filter(
    (i: any) => !i.completed
  ).length;

  const remainingDiscussions = discussions.filter(
    (d: any) => !d.completed
  ).length;

  const overdueTasks = tasks.filter(
    (t: any) =>
      !t.completed &&
      t.due_date &&
      t.due_date < today
  );

  const dueTodayTasks = tasks.filter(
    (t: any) =>
      !t.completed &&
      t.due_date === today
  );

  const todayTasks = tasks.filter(
    (t: any) =>
      !t.completed &&
      t.due_date &&
      t.due_date <= today
  );

  // Dynamic greeting
  const currentHour = new Date().getHours();

  let greeting = "🌅 Good Morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "☀️ Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "🌙 Good Evening";
  }

  // Today's calendar events
  const todaysEvents = events
    .filter((e: any) => e.date === today)
    .slice(0, 3);

  // Future calendar events
  const upcomingEvents = events
    .filter((e: any) => e.date > today)
    .slice(0, 5);

  // Upcoming birthdays
  const birthdays = family
    .filter((member: any) => member.birthday)
    .map((member: any) => {
      const birthday = new Date(member.birthday);
      const todayDate = new Date();

      birthday.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);

      birthday.setFullYear(todayDate.getFullYear());

      if (birthday < todayDate) {
        birthday.setFullYear(todayDate.getFullYear() + 1);
      }

      return {
        ...member,
        nextBirthday: birthday,
      };
    })
    .sort(
      (a: any, b: any) =>
        a.nextBirthday.getTime() -
        b.nextBirthday.getTime()
    )
    .slice(0, 3);

  const upcomingEventCount = events.filter(
    (e: any) => e.date >= today
  ).length;

  const quickActionStyle = {
    padding: 16,
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    textAlign: "left" as const,
    minHeight: 82,
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  return (
    <PageContainer>
      <AppHeader
        title={greeting}
        subtitle="Welcome back to Leu Crew HQ"
      />

      {/* TODAY'S FOCUS */}
      <Card>
        <SectionTitle>
          🌅 Today's Focus
        </SectionTitle>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 15,
          }}
        >
          <span>
            <strong>{remainingTasks}</strong> Tasks
          </span>

          <span style={{ color: "#aaa" }}>·</span>

          <span>
            <strong>{remainingShopping}</strong> Shopping
          </span>

          <span style={{ color: "#aaa" }}>·</span>

          <span>
            <strong>{remainingDiscussions}</strong>{" "}
            Discussions
          </span>
        </div>
      </Card>

      {/* TODAY'S SNAPSHOT */}
      <Card>
        <SectionTitle>
          🚨 Today's Snapshot
        </SectionTitle>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {overdueTasks.length > 0 && (
            <div>
              <div style={{ fontWeight: 600 }}>
                🔴 {overdueTasks.length} overdue
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Needs attention
              </div>
            </div>
          )}

          {dueTodayTasks.length > 0 && (
            <div>
              <div style={{ fontWeight: 600 }}>
                ⭐ {dueTodayTasks.length} due today
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                On today's list
              </div>
            </div>
          )}

          {remainingShopping > 0 && (
            <div>
              <div style={{ fontWeight: 600 }}>
                🛒 {remainingShopping} shopping{" "}
                {remainingShopping === 1
                  ? "item"
                  : "items"}
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Still to buy
              </div>
            </div>
          )}

          {remainingDiscussions > 0 && (
            <div>
              <div style={{ fontWeight: 600 }}>
                💬 {remainingDiscussions} discussion
                {remainingDiscussions === 1
                  ? ""
                  : "s"}
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                Waiting to be discussed
              </div>
            </div>
          )}

          {todayTasks.length === 0 &&
            remainingShopping === 0 &&
            remainingDiscussions === 0 && (
              <div
                style={{
                  color: "#666",
                  fontSize: 14,
                }}
              >
                🎉 Nothing needs your attention right now.
              </div>
            )}
        </div>
      </Card>

      {/* QUICK ACTIONS */}
      <Card>
        <SectionTitle>
          ⚡ Quick Actions
        </SectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 10,
          }}
        >
          <button
            onClick={() => setActiveTab("tasks")}
            style={quickActionStyle}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              📝 Tasks
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#666",
                fontSize: 13,
              }}
            >
              {remainingTasks} remaining
            </div>
          </button>

          <button
            onClick={() => setActiveTab("shopping")}
            style={quickActionStyle}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              🛒 Shopping
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#666",
                fontSize: 13,
              }}
            >
              {remainingShopping} items
            </div>
          </button>

          <button
            onClick={() => setActiveTab("discussions")}
            style={quickActionStyle}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              💬 Discuss
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#666",
                fontSize: 13,
              }}
            >
              {remainingDiscussions} waiting
            </div>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            style={quickActionStyle}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              📅 Calendar
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#666",
                fontSize: 13,
              }}
            >
              {upcomingEventCount} upcoming
            </div>
          </button>
        </div>
      </Card>

      {/* COMING UP */}
      <Card>
        <SectionTitle>
          📅 Coming Up
        </SectionTitle>

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: 16,
            }}
          >
            📆 Next Up
          </h3>

          {upcomingEvents.length === 0 ? (
            <div
              style={{
                color: "#666",
                fontSize: 14,
              }}
            >
              Nothing coming up yet. 🎉
            </div>
          ) : (
            upcomingEvents.map((event: any) => (
              <div
                key={`upcoming-${event.id}`}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {event.emoji || "📅"} {event.title}
                </div>

                <div
                  style={{
                    color: "#666",
                    fontSize: 14,
                    marginTop: 3,
                  }}
                >
                  {event.date}
                  {event.start_time
                    ? ` • ${event.start_time}`
                    : ""}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: 16,
            }}
          >
            🎂 Celebrations
          </h3>

          {birthdays.length === 0 ? (
            <div
              style={{
                color: "#666",
                fontSize: 14,
              }}
            >
              No birthdays coming up.
            </div>
          ) : (
            birthdays.map((member: any) => (
              <div
                key={`birthday-${member.id}`}
                style={{
                  padding: "8px 0",
                }}
              >
                {member.emoji || "🎂"}{" "}
                <strong>{member.name}</strong>
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
        </div>
      </Card>

      {/* TODAY'S SCHEDULE */}
      <Card>
        <SectionTitle>
          📅 Today's Schedule
        </SectionTitle>

        {todaysEvents.length === 0 ? (
          <div
            style={{
              color: "#666",
              fontSize: 14,
            }}
          >
            Nothing scheduled today. 🎉
          </div>
        ) : (
          todaysEvents.map((event: any) => (
            <div
              key={`schedule-${event.id}`}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {event.emoji || "📅"} {event.title}
              </div>

              {event.start_time && (
                <div
                  style={{
                    color: "#666",
                    fontSize: 14,
                    marginTop: 3,
                  }}
                >
                  ⏰ {event.start_time}
                </div>
              )}
            </div>
          ))
        )}
      </Card>

      {/* FAMILY */}
      <Card>
        <SectionTitle>
          👨‍👩‍👦 The Leu Crew
        </SectionTitle>

        <FamilyCard members={family} />

        <KidsCard events={events} />

        <PetCard
          pets={pets}
          refreshPets={() => {}}
        />
      </Card>

      {/* Extra space for fixed bottom navigation */}
      <div style={{ height: 90 }} />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </PageContainer>
  );
}

