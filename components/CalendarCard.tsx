"use client";

import Card from "@/components/Card";


type Event = {
  id: number;
  title: string;
  date: string;
  category?: string | null;
  emoji?: string | null;
  notes?: string | null;
};


type CalendarCardProps = {
  events: Event[];
};


function formatDate(date: string) {

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

}



export default function CalendarCard({
  events,
}: CalendarCardProps) {


  return (

    <Card
      emoji="📅"
      title="Calendar"
      subtitle="Upcoming family events"
    >


      {events.length === 0 ? (

        <p>
          No upcoming events.
        </p>

      ) : (

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:12,
          }}
        >

          {events.map((event) => (

            <div
              key={event.id}
              style={{
                padding:12,
                borderRadius:12,
                background:"#f8f8f8",
              }}
            >

              <strong>
                {event.emoji} {event.title}
              </strong>


              <p
                style={{
                  margin:"6px 0 0",
                }}
              >
                📅 {formatDate(event.date)}
              </p>


              {event.notes && (

                <p>
                  {event.notes}
                </p>

              )}

            </div>

          ))}

        </div>

      )}

    </Card>

  );

}