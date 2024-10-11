export enum InputType {
  password = "password",
  text = "text",
  email = "email",
  radio = "radio",
  date = "date",
  phone = "tel",
}

export const tab: string[] = [
  "Summary",
  "Transcript",
  "Votes Taken",
  "Public Comment",
  "Feedback",
];

export async function getArchievedMeetings(caseType: string, id?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/achievedmeeting?type=${caseType}`;
  if (caseType === "specialId" && id) {
    url += `&id=${id}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });
  console.log("restype", res);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${caseType}`);
  }

  return res.json();
}

export async function getUpcomingdMeetings(caseType: string, id?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/upcomingmeeting?type=${caseType}`;
  if (caseType === "specialId" && id) {
    url += `&id=${id}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${caseType}`);
  }

  return res.json();
}

export async function getNews(caseType: string, id?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/newsinfo?type=${caseType}`;
  if (caseType === "specialId" && id) {
    url += `&id=${id}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${caseType}`);
  }

  return res.json();
}

export async function getResourcesSidebarContent() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/resources`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch`);
  }

  return res.json();
}
