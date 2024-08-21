"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { setCookie } from "cookies-next";
import TimeTableUI from "@/components/timetable/DesktopTimeTableUI";

export default function Page({
  searchParams,
}: {
  searchParams: { batch: string; course: string };
}) {
  const router = useRouter();

  const { data: timeTableData, isLoading } = useQuery({
    queryKey: ["getTimeTableData", searchParams.batch, searchParams.course],
    queryFn: async () => {
      const { data } = await axios.post("/api/desktop", {
        batch: searchParams.batch,
        course: searchParams.course,
      });
      console.log(data);
      return data;
    },
  });

  if (!isLoading && !timeTableData) {
    setCookie("error", "Unable to fetch data , try again later");
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className=" w-full h-dvh flex items-center justify-center ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-dvh h-full  flex items-center justify-center ">
      <TimeTableUI data={timeTableData} />
    </div>
  );
}
