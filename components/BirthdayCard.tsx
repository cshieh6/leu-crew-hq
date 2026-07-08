"use client";

import {
  daysUntilBirthday,
  formatBirthday,
} from "@/lib/dateUtils";

function upcomingAge(
  birthday: string | null
) {
  if (!birthday) return null;

  const birthDate = new Date(birthday);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  if (
    today <
    new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    )
  ) {
    age--;
  }

  return age + 1;
}

type FamilyMember = {
  id: number;
  name: string;
  birthday: string | null;
  emoji: string | null;
};


type BirthdayCardProps = {
  members: FamilyMember[];
};


export default function BirthdayCard({
  members,
}: BirthdayCardProps) {

  const upcomingBirthdays =
    members
      .filter(
        (member) =>
          member.birthday
      )
      .map((member) => ({
        ...member,
        days:
          daysUntilBirthday(
            member.birthday
          ),
      }))
      .sort(
        (a, b) =>
          (a.days ?? 999) -
          (b.days ?? 999)
      )
      .slice(0, 3);


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
        🎂 Upcoming Birthdays
      </h2>


      {upcomingBirthdays.length === 0 && (
        <p>
          No birthdays found.
        </p>
      )}


      {upcomingBirthdays.map(
        (member) => (
          <div
            key={member.id}
            style={{
              padding: 12,
              marginTop: 12,
              borderRadius: 12,
              background: "#f8f8f8",
            }}
          >

            <div
              style={{
                fontSize: 28,
              }}
            >
              {member.emoji}
            </div>


            <strong>
              {member.name}
            </strong>


            <p
              style={{
                margin: "6px 0",
              }}
            >
              🎂{" "}
              {formatBirthday(
                member.birthday
              )}
            </p>


           <p
  style={{
    margin: 0,
    opacity: 0.7,
  }}
>
  {member.days === 0
    ? "🎉 Today!"
    : `🎈 ${
        member.days
      } days away`}
</p>

<p
  style={{
    margin: "6px 0 0",
  }}
>
  🎉 Turning{" "}
  {upcomingAge(member.birthday)}
</p>

          </div>
        )
      )}

    </section>
  );
}