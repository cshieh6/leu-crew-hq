
"use client";

import DiscussCard from "@/components/DiscussCard";
import BottomNav from "../BottomNav";
import PageContainer from "../PageContainer";
import Card from "../Card";
import AppHeader from "../AppHeader";

export default function DiscussionsScreen({
  discussions,
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
  const openDiscussions = discussions.filter(
    (discussion: any) => !discussion.completed
  ).length;

  const resolvedDiscussions = discussions.filter(
    (discussion: any) => discussion.completed
  ).length;

  return (
    <PageContainer>
      <AppHeader
        title="💬 Discussions"
        subtitle="Things to talk about"
      />

      {/* Discussion Summary */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                color: "#777",
                marginBottom: 5,
              }}
            >
              Open discussions
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {openDiscussions}
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              color: "#777",
              fontSize: 14,
            }}
          >
            <div>
              {resolvedDiscussions} resolved
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "#999",
              }}
            >
              {discussions.length} total
            </div>
          </div>
        </div>
      </Card>

      {/* Discussion List */}
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
            💭 Discussion List
          </h3>

          <div
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            Keep track of things the Leu Crew wants to talk through.
          </div>
        </div>

        <DiscussCard
          discussions={discussions}
          newDiscussion={newDiscussion}
          setNewDiscussion={setNewDiscussion}
          newDiscussionCategory={newDiscussionCategory}
          setNewDiscussionCategory={setNewDiscussionCategory}
          newDiscussionPriority={newDiscussionPriority}
          setNewDiscussionPriority={setNewDiscussionPriority}
          addDiscussion={addDiscussion}
          deleteDiscussion={deleteDiscussion}
          toggleDiscussion={toggleDiscussion}
        />
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

