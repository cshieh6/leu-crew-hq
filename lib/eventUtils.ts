export type EventInfo = {
  cleanTitle: string;
  person: string | null;
  personEmoji: string;
  category: string;
  categoryEmoji: string;
};


export function getEventInfo(title: string): EventInfo {

  let cleanTitle = title.trim();


  // Remove [Person] or [Person + Person] prefix
  const prefixMatch = cleanTitle.match(/^\[(.*?)\]\s*/);

  if (prefixMatch) {

    cleanTitle = cleanTitle.replace(
      prefixMatch[0],
      ""
    ).trim();

  }



  const text = title.toLowerCase();



  // Person detection
  let person: string | null = null;
  let personEmoji = "👨‍👩‍👦";


  if (text.includes("arthur")) {

    person = "Arthur";
    personEmoji = "🐯";

  } else if (text.includes("andrew")) {

    person = "Andrew";
    personEmoji = "🐰";

  } else if (text.includes("christine")) {

    person = "Christine";
    personEmoji = "🐉";

  } else if (text.includes("phil")) {

    person = "Phil";
    personEmoji = "🐐";

  } else if (text.includes("kobe")) {

    person = "Kobe";
    personEmoji = "🐶";

  }



  // Category detection
  let category = "General";
  let categoryEmoji = "📅";


  if (text.includes("swim")) {

    category = "Swim";
    categoryEmoji = "🏊";

  } else if (text.includes("golf")) {

    category = "Golf";
    categoryEmoji = "⛳";

  } else if (
    text.includes("doctor") ||
    text.includes("dr.") ||
    text.includes("physical") ||
    text.includes("ultrasound") ||
    text.includes("dentist")
  ) {

    category = "Medical";
    categoryEmoji = "🩺";

  } else if (
    text.includes("icia") ||
    text.includes("northwood") ||
    text.includes("school")
  ) {

    category = "School";
    categoryEmoji = "🎒";

  } else if (
    text.includes("birthday") ||
    text.includes("party")
  ) {

    category = "Celebration";
    categoryEmoji = "🎂";

  } else if (
    text.includes("flight") ||
    text.includes("hotel") ||
    text.includes("taiwan") ||
    text.includes("korea")
  ) {

    category = "Travel";
    categoryEmoji = "✈️";

  } else if (
    text.includes("home depot")
  ) {

    category = "Family";
    categoryEmoji = "🛠️";

  } else if (
    text.includes("medication") ||
    text.includes("heart worm") ||
    text.includes("fleas")
  ) {

    category = "Pet";
    categoryEmoji = "🐶";

  }


  return {
    cleanTitle,
    person,
    personEmoji,
    category,
    categoryEmoji,
  };

}