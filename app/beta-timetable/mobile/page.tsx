"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import MobileScreenUI from "@/components/beta-timetable/MobileTimeTableUI";

export default function Page({
  searchParams,
}: {
  searchParams: { batch: string; course: string };
}) {
  const router = useRouter();

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  const { data: timeTableData, isLoading } = useQuery({
    queryKey: ["getTimeTableData", searchParams.batch, searchParams.course],
    queryFn: async () => {
      const dayNumber = new Date().getDay();
      const day = daysList[dayNumber === 7 ? 0 : dayNumber - 1].slice(0, 3);

      try {
        const { data } = await axios.post("/api/beta-timetable/mobile", {
          batch: searchParams.batch,
          course: searchParams.course,
          day,
        });

        if (!data || !data.timetable) {
          throw new Error("No timetable data available");
        }

        return data.timetable as { timing: string; label: string }[];
      } catch (error) {
        console.error("Error fetching timetable data:", error);
        return [];
      }
    },
  });

  if (!isLoading && (!timeTableData || timeTableData.length === 0)) {
    setCookie("error", "Unable to fetch data, try again later");
    router.push("/");
    return null;
  }

  if (!timeTableData) {
    setCookie("error", "Unable to fetch data, try again later");
    router.push("/");
    return null;
  }

  return <MobileScreenUI data={timeTableData} loading={isLoading} />;
}
