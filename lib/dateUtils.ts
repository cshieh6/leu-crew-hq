export function calculateAge(
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


export function formatBirthday(
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


export function daysUntilBirthday(
  birthday: string | null
) {
  if (!birthday) return null;

  const today = new Date();

  const birthDate = new Date(birthday);

  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );


  // If birthday already passed this year,
  // calculate next year's birthday
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }


  const difference =
    nextBirthday.getTime() -
    today.getTime();


  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}