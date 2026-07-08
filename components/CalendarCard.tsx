"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Event = {
  id: number;
  title: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  category: string | null;
  emoji: string | null;
  person: string | null;
  notes: string | null;
  source: string | null;
  owner: string | null;
};

type CalendarCardProps = {
  events: Event[];
  refreshEvents: () => void;
};


const categories = [
  {
    label: "School",
    emoji: "🎒",
  },
  {
    label: "Medical",
    emoji: "🏥",
  },
  {
    label: "Travel",
    emoji: "✈️",
  },
  {
    label: "Fun",
    emoji: "🎉",
  },
  {
    label: "Pet",
    emoji: "🐶",
  },
  {
    label: "Family",
    emoji: "🏠",
  },
  {
    label: "Work",
    emoji: "💼",
  },
];


const people = [
  {
    name: "Christine",
    emoji: "🐉",
  },
  {
    name: "Phil",
    emoji: "🐐",
  },
  {
    name: "Arthur",
    emoji: "🐯",
  },
  {
    name: "Andrew",
    emoji: "🐰",
  },
  {
    name: "Kobe",
    emoji: "🐶",
  },
  {
    name: "Family",
    emoji: "👨‍👩‍👦",
  },
];


function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}


function daysUntilEvent(date: string) {
  const today = new Date();
  const eventDate = new Date(date);

  return Math.ceil(
    (eventDate.getTime() -
      today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}



export default function CalendarCard({
  events,
  refreshEvents,
}: CalendarCardProps) {


  const [showForm, setShowForm] =
    useState(false);


  const [editingId, setEditingId] =
    useState<number | null>(null);


  const [title, setTitle] =
    useState("");

  const [date, setDate] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [emoji, setEmoji] =
    useState("📅");

  const [person, setPerson] =
    useState("");

  const [notes, setNotes] =
    useState("");



  function resetForm() {

    setTitle("");
    setDate("");
    setCategory("");
    setEmoji("📅");
    setPerson("");
    setNotes("");

    setEditingId(null);
    setShowForm(false);

  }



  async function saveEvent() {

    if (!title || !date) return;


    if (editingId) {

      const { error } =
        await supabase
          .from("events")
          .update({
            title,
            date,
            category,
            emoji,
            person,
            notes,
          })
          .eq(
            "id",
            editingId
          );


      console.log(
        "UPDATE EVENT ERROR:",
        error
      );


    } else {


      const { error } =
        await supabase
          .from("events")
          .insert({
            title,
            date,
            category,
            emoji,
            person,
            notes,
            source: "manual",
            owner: "family",
          });


      console.log(
        "ADD EVENT ERROR:",
        error
      );

    }


    resetForm();

    refreshEvents();

  }





  async function deleteEvent(
    id: number
  ) {

    const { error } =
      await supabase
        .from("events")
        .delete()
        .eq(
          "id",
          id
        );


    console.log(
      "DELETE EVENT ERROR:",
      error
    );


    refreshEvents();

  }





  function editEvent(
    event: Event
  ) {

    setEditingId(
      event.id
    );

    setTitle(
      event.title
    );

    setDate(
      event.date
    );

    setCategory(
      event.category || ""
    );

    setEmoji(
      event.emoji || "📅"
    );

    setPerson(
      event.person || ""
    );

    setNotes(
      event.notes || ""
    );

    setShowForm(true);

  }




  const upcomingEvents =
    events
      .filter(
        (event) =>
          new Date(event.date) >=
          new Date()
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .slice(0, 5);




  return (

    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 20,
        padding: 24,
        background: "#fff",
      }}
    >


      <h2>
        📅 Upcoming Events
      </h2>



      {upcomingEvents.map(
        (event) => (

          <div
            key={event.id}
            style={{
              background: "#f8f8f8",
              padding: 14,
              borderRadius: 16,
              marginTop: 12,
            }}
          >

            <div
              style={{
                fontSize: 32,
              }}
            >
              {event.emoji || "📅"}
            </div>


            <strong>
              {event.title}
            </strong>


            <p>
              📅 {formatEventDate(event.date)}
            </p>



            {event.person && (
              <p>
                👤 {event.person}
              </p>
            )}



            {event.category && (
              <p>
                {event.emoji || "📅"}{" "}
                {event.category}
              </p>
            )}



            {event.notes && (
              <p>
                {event.notes}
              </p>
            )}



            <p>
              {
                daysUntilEvent(
                  event.date
                ) === 0
                ? "🎉 Today!"
                :
                `🎈 ${
                  daysUntilEvent(
                    event.date
                  )
                } days away`
              }
            </p>



            <button
              onClick={() =>
                editEvent(event)
              }
            >
              ✏️ Edit
            </button>


            <button
              onClick={() =>
                deleteEvent(event.id)
              }
              style={{
                marginLeft: 8,
              }}
            >
              🗑 Delete
            </button>


          </div>

        )
      )}




      <button
        style={{
          marginTop: 16,
        }}
        onClick={() =>
          setShowForm(
            !showForm
          )
        }
      >
        ➕ Add Event
      </button>





      {showForm && (

        <div
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 16,
            background: "#f5f5f5",
          }}
        >


          <h3>
            {editingId
              ? "✏️ Edit Event"
              : "➕ Add Event"}
          </h3>



          <input
            placeholder="Event name"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />



          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
          />



          <p>
            Event Type
          </p>


          {categories.map(
            (item) => (

              <button
                key={item.label}
                onClick={() => {
                  setCategory(
                    item.label
                  );

                  setEmoji(
                    item.emoji
                  );
                }}
                style={{
                  margin: 4,
                }}
              >
                {item.emoji}{" "}
                {item.label}
              </button>

            )
          )}



          <p>
            Who is this for?
          </p>


          {people.map(
            (item) => (

              <button
                key={item.name}
                onClick={() =>
                  setPerson(
                    item.name
                  )
                }
                style={{
                  margin: 4,
                }}
              >
                {item.emoji}{" "}
                {item.name}
              </button>

            )
          )}




          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />



          <button
            onClick={saveEvent}
          >
            Save Event
          </button>


          <button
            onClick={resetForm}
            style={{
              marginLeft: 8,
            }}
          >
            Cancel
          </button>


        </div>

      )}


    </section>

  );

}