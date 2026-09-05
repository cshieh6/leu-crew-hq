
"use client";

import FamilyCard from "@/components/FamilyCard";
import KidsCard from "@/components/KidsCard";
import PetCard from "@/components/PetCard";
import BottomNav from "../BottomNav";
import PageContainer from "../PageContainer";
import Card from "../Card";
import AppHeader from "../AppHeader";

export default function FamilyScreen({
  family,
  events,
  pets,
  activeTab,
  setActiveTab,
}: any) {
  return (
    <PageContainer>
      <AppHeader
        title="👨‍👩‍👦 Family"
        subtitle="Your crew"
      />

      <p
        style={{
          color: "#666",
          marginTop: -10,
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        Keep track of everyone’s schedules, activities, and care reminders.
      </p>

      {/* Our Crew */}
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
            👥 Our Crew
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            The people who make the Leu Crew what it is.
          </div>
        </div>

        <FamilyCard members={family} />
      </Card>

      {/* Kids */}
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
            🧒 Kids
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            School, activities, and what's coming up.
          </div>
        </div>

        <KidsCard events={events} />
      </Card>

      {/* Pets */}
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
            🐶 Pets
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            Keep Kobe and the rest of the crew cared for.
          </div>
        </div>

        <PetCard pets={pets} />
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

