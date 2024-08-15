"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SmallTimeTableUI from "@/components/time-table/SmallTimeTableUI";
import { Spinner } from "@nextui-org/spinner";
import { setCookie } from 'cookies-next'
import TimeTableUI from "@/components/time-table/TimeTableUI";

const Page = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const router = useRouter();

    const { data: timeTableData, isLoading } = useQuery({
        queryKey: ["getTimeTableData", searchParams.batch, searchParams.course],
        queryFn: async () => {
            const { data } = await axios.post("/api/get-time-table", {
                batch: searchParams.batch,
                course: searchParams.course,
            });
            return data.data;
        },
    });

    if (!isLoading && !timeTableData) {
        setCookie('error', "Unable to fetch data , try again later");
        router.push("/");
    }

    if (isLoading) {
        return (
            <div className=" w-full h-dvh flex items-center justify-center ">
                <Spinner />
            </div>
        );
    }
    if (window != undefined && !isLoading) {
        return window.innerWidth > 1024 ? (
            <div>
                {
                    timeTableData &&
                    <TimeTableUI rows={timeTableData} />
                }
            </div>
        ) : (
            <div className="p-1 flex items-center justify-center">
                {
                    timeTableData &&
                    <SmallTimeTableUI rows={timeTableData} batch={searchParams.batch || ""} />
                }
            </div>
        );
    }
    return <>some error</>;
};

export default Page;
