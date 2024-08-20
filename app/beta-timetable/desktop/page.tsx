"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { setCookie } from "cookies-next";
import TimeTableUI from "@/components/beta-timetable/DesktopTimeTableUI";

const Page = ({
  searchParams,
}: {
  searchParams: { batch: string; course: string };
}) => {
  const router = useRouter();

  const { data: timeTableData, isLoading } = useQuery({
    queryKey: ["getTimeTableData", searchParams.batch, searchParams.course],
    queryFn: async () => {
      const { data } = await axios.post("/api/get-timetable", {
        batch: searchParams.batch,
        course: searchParams.course,
      });
      console.log(data.parsedData);
      return data.parsedData;
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

  return <TimeTableUI data={timeTableData} />;

  // if (window != undefined && !isLoading) {
  //   return window.innerWidth > 1024 ? (
  //     timeTableData && <TimeTableUI data={timeTableData} />
  //   ) : (
  //     <div className="p-1 flex items-center justify-center">
  //       {timeTableData && (
  //         <SmallTimeTableUI
  //           data={timeTableData}
  //           batch={searchParams.batch || ""}
  //         />
  //       )}
  //     </div>
  //   );
  // }
  return <>some error</>;
};

export default Page;
