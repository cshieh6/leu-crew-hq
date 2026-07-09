"use client";

import Card from "@/components/Card";


type FamilyMember = {
  id: number;
  name: string;
  role: string;
  birthday: string | null;
  emoji: string | null;
  notes: string | null;
};


type FamilyCardProps = {
  members: FamilyMember[];
};



function calculateAge(
  birthday: string | null
) {

  if (!birthday) return null;


  const birthDate = new Date(birthday);
  const today = new Date();


  let age =
    today.getFullYear() -
    birthDate.getFullYear();


  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();


  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--;
  }


  return age;

}



export default function FamilyCard({
  members,
}: FamilyCardProps) {


  return (

    <Card
      emoji="👨‍👩‍👦"
      title="Family Today"
      subtitle="Everyone in the Leu Crew"
    >

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap:16,
        }}
      >

        {members.map((member)=>(


          <div
            key={member.id}
            style={{
              padding:16,
              borderRadius:16,
              background:"#f8f8f8",
            }}
          >

            <div
              style={{
                fontSize:36,
              }}
            >
              {member.emoji}
            </div>


            <h3
              style={{
                marginBottom:4,
              }}
            >
              {member.name}
            </h3>


            <p>
              {member.role}

              {calculateAge(member.birthday) !== null &&
                ` • Age ${calculateAge(member.birthday)}`
              }

            </p>


            {member.notes && (
              <p>
                {member.notes}
              </p>
            )}

          </div>


        ))}


      </div>


    </Card>

  );

}