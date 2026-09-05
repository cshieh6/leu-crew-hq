"use client";

import CalendarCard from "@/components/CalendarCard";
import BottomNav from "./BottomNav";

export default function CalendarScreen({
  events,
  activeTab,
  setActiveTab,
}: any) {
  return (
    <main
      style={{
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      <h1>📅 Calendar</h1>

      <CalendarCard events={events} />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </main>
  );
}