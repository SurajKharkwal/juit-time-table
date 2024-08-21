"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import MobileScreenUI from "@/components/timetable/MobileTimeTableUI";
import { Select, SelectItem } from "@nextui-org/select";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useState } from "react";

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Page({
  searchParams,
}: {
  searchParams: { batch: string; course: string };
}) {
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    const dayNumber = new Date().getDay();
    return daysList[dayNumber === 7 ? 0 : dayNumber - 1];
  });
  const router = useRouter();

  const { data: timeTableData, isLoading } = useQuery({
    queryKey: [
      "mobile-timetable",
      searchParams.batch,
      searchParams.course,
      selectedDay,
    ],
    queryFn: async () => {
      console.log({
        batch: searchParams.batch,
        course: searchParams.course,
        day: selectedDay.slice(0, 3),
      });

      const { data } = await axios.post("/api/mobile", {
        batch: searchParams.batch,
        course: searchParams.course,
        day: selectedDay.slice(0, 3),
      });
      console.log(data);

      if (!data) {
        setCookie("error", "Unable to fetch data, try again later");
        router.push("/");
      }

      return data as { timing: string; label: string }[];
    },
  });

  const handleSelectionChange = (e: any) => {
    if (!e.target.value) return;
    setSelectedDay(e.target.value as string);
  };

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col">
      <Breadcrumbs className=" text-xl p-4 mr-auto">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem color="warning">{selectedDay}</BreadcrumbItem>
      </Breadcrumbs>
      <Select
        radius="sm"
        label="Select the Day"
        size="sm"
        onChange={handleSelectionChange}
        className="max-w-xs mx-auto w-full"
      >
        {daysList.map((day) => (
          <SelectItem key={day}>{day}</SelectItem>
        ))}
      </Select>
      <MobileScreenUI data={timeTableData || []} loading={isLoading} />;
    </div>
  );
}
