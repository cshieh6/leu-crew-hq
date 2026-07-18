"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Card from "@/components/Card";


type PetCare = {
  id: number;
  pet_name: string;
  task: string;
  last_completed: string;
  frequency_days: number;
  notes?: string | null;
};


type PetCardProps = {
  pets: PetCare[];
  refreshPets?: () => void;
};



function getNextDate(
  lastCompleted: string,
  frequency: number
) {

  const date = new Date(lastCompleted);

  date.setDate(
    date.getDate() + frequency
  );

  return date;

}



function daysUntil(
  date: Date
) {

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const target = new Date(date);

  target.setHours(
    0,
    0,
    0,
    0
  );


  return Math.ceil(
    (
      target.getTime()
      -
      today.getTime()
    )
    /
    (1000 * 60 * 60 * 24)
  );

}



function formatDate(
  date: Date
) {

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

}




export default function PetCard({
  pets,
  refreshPets,
}: PetCardProps) {


  const [loading, setLoading] =
    useState<number | null>(null);



  async function completeCare(
    id: number
  ) {

    setLoading(id);


    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    const {
      error
    } =
      await supabase
        .from("pet_care")
        .update({
          last_completed: today,
        })
        .eq(
          "id",
          id
        );


    console.log(
      "UPDATE PET ERROR:",
      error
    );


    setLoading(null);


    if (refreshPets) {
      refreshPets();
    }

  }




  return (

    <Card
      emoji="🐶"
      title="Kobe"
      subtitle="Care tracker"
    >


      {
        pets.length === 0 ?

        <p>
          No pet reminders yet.
        </p>


        :

        pets.map(
          (pet) => {


            const nextDate =
              getNextDate(
                pet.last_completed,
                pet.frequency_days
              );


            const days =
              daysUntil(nextDate);



            return (

              <div
                key={pet.id}
                style={{
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom:
                    "1px solid #eee",
                }}
              >


                <h3>
                  ❤️ {pet.task}
                </h3>


                <p>
                  Last completed:
                  {" "}
                  {formatDate(
                    new Date(
                      pet.last_completed
                    )
                  )}
                </p>



                <p>
                  Next due:
                  {" "}
                  <strong>
                    {formatDate(nextDate)}
                  </strong>
                </p>



                <p>

                  {
                    days < 0

                    ?

                    `🔴 Overdue by ${Math.abs(days)} days`

                    :

                    days <= 7

                    ?

                    `🟡 Due in ${days} days`

                    :

                    `🟢 Due in ${days} days`

                  }

                </p>



                <button
                  onClick={() =>
                    completeCare(
                      pet.id
                    )
                  }
                  disabled={
                    loading === pet.id
                  }
                  style={{
                    padding:
                      "8px 14px",
                    borderRadius:
                      12,
                    border:
                      "none",
                    cursor:
                      "pointer",
                  }}
                >

                  {
                    loading === pet.id

                    ?

                    "Updating..."

                    :

                    "✓ Mark Completed"

                  }

                </button>



                {
                  pet.notes && (

                    <p
                      style={{
                        fontSize: 14,
                        marginTop: 10,
                      }}
                    >
                      {pet.notes}
                    </p>

                  )
                }


              </div>

            );

          })

      }


    </Card>

  );

}