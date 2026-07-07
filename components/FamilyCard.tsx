"use client";

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
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}


function formatBirthday(
  birthday: string | null
) {
  if (!birthday) return "";

  return new Date(
    birthday
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
}


export default function FamilyCard({
  members,
}: FamilyCardProps) {

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
        👨‍👩‍👦 Family Today
      </h2>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >

        {members.map((member) => {

          const age = calculateAge(
            member.birthday
          );


          return (
            <div
              key={member.id}
              style={{
                padding: 16,
                borderRadius: 16,
                background: "#f8f8f8",
              }}
            >

              <div
                style={{
                  fontSize: 36,
                }}
              >
                {member.emoji}
              </div>


              <h3>
                {member.name}
              </h3>


              <p>
                {member.role}
                {age !== null &&
                  ` • Age ${age}`}
              </p>


              {member.notes && (
                <p>
                  {member.notes}
                </p>
              )}


              {member.birthday && (
                <p>
                  🎂{" "}
                  {formatBirthday(
                    member.birthday
                  )}
                </p>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}