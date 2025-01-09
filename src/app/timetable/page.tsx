"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useState } from "react";
import { DesktopLoading, MobileLoading } from "./loading-comp";
import MobilePage from "../components/mobile-page";
import { days, daysFullName, } from "@/lib/db/maps";
import { Button } from "@nextui-org/button";
import DesktopPage from "../components/desktop-page";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ batch: string, course: string }>
}) {
  const { course, batch } = use(searchParams)
  console.log(course, batch)

  const isMobile = useIsMobile();
  const [day, setDay] = useState(() => {
    const d = new Date();
    if (d.getHours() >= 18) {
      d.setDate(d.getDate() + 1);
    }
    let dayIndex = d.getDay();
    if (dayIndex === 0) {
      dayIndex = 1;
    }
    return Object.values(daysFullName)[dayIndex]
  });
  const { data: timetable, isLoading, } = useQuery({
    queryKey: ["get-mobile-timetable", day, isMobile],
    queryFn: async () => {
      const response = await axios.post("/api/get-timetable", {
        isMobile,
        batch,
        course,
        day: days[day as keyof typeof days],
      });
      return response.data
    },
  });

  if (isLoading && isMobile) return <MobileLoading />
  else if (isLoading && !isMobile) return <DesktopLoading />

  if (timetable && !isMobile)
    return <DesktopPage timetable={timetable} />

  if (timetable && isMobile)
    return <MobilePage setDay={setDay} day={day} timetable={timetable} />


  return (
    <div className="flex flex-col gap-4 w-full h-dvh items-center justify-center ">
      <h4 className="text-5xl">
        Some Error Occured
      </h4>
      <Button color="warning">
        Return To Home Page
      </Button>
    </div>
  )
}

