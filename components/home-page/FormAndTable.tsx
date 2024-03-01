'use client'
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { LuMinusCircle } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TimeTableUI } from "../time-table/TimeTableUI";
import gsap from "gsap"
import DialogBox from "../time-table/DialogBox";
import { MdEdit } from 'react-icons/md'
import Toast from "../toast/Toast";

const FormAndTable = () => {
    const [input, setInput] = useState<{ batch: string, course: string }>({ batch: "", course: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [showDialogBox, setShowDialogBox] = useState(false);
    const LoadingPageRef = useRef(null)
    const [timeTableData, setTimeTableData] = useState();
    const [openToast, setOpenToast] = useState(false);

    const { mutate: getTimeTableData, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("/api/get-time-table", input);
            setTimeTableData(data.data);
            return data.data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    setOpenToast(true);
                    setNotFound(true);
                }
            }
        }
    })

    const fetchDataOnEdit = (course: string, batch: string) => {
        setInput({
            course,
            batch
        })
        getTimeTableData();
    }

    useEffect(() => {
        gsap.set(LoadingPageRef.current, {
            scale: 0.5,
            opacity: 0,
        })
        const tl = gsap.timeline();
        tl.to(LoadingPageRef.current, {
            delay: 0.5,
            scale: 1,
            ease: "power2.inOut",
            opacity: 1
        })
        tl.to(LoadingPageRef.current, {
            delay: 0.5,
            ease: "power2.inOut",
            scale: 40,
        })
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [])
    function PopOver() {
        const [zoomVal, setZoomVal] = useState(1);
        return (
            <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                    <Button className=" p-2 bg-neutral-800  w-full h-full" isIconOnly><AiOutlineMenuUnfold className="text-4xl" /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 flex flex-col gap-2 py-2">
                        <Button className="" onClick={() => setZoomVal(zoomVal + 0.1)} endContent={<GoPlusCircle />}>Zoom-in</Button>
                        <Button className="" onClick={() => setZoomVal((zoomVal - 0.1))} endContent={<LuMinusCircle />}>Zoom-out</Button>
                        <Button onClick={() => setZoomVal(1)} className="text-xl font-light" endContent={< IoArrowUndoCircleSharp />}>Revert</Button>
                            <Button
                                onClick={() => setShowDialogBox(!showDialogBox)}
                                className="bg-gray-300 hover:bg-gray-400 w-full text-zinc-800 text-lg flex gap-x-2 px-5 place-self-end mt-1 mb-3"
                            >
                                <MdEdit />
                                Edit
                            </Button>
                        <style jsx global>{
                            `#Zoom-Content {
                                zoom : ${zoomVal}
            }`
                        }</style>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }


    if (isLoading) {
        return (
            <div className="w-full h-screen">
                <section ref={LoadingPageRef} className="w-full gap-4 font-bold h-full text-5xl flex flex-col items-center justify-center">
                    <h1>Made By</h1>
                    <i className="text-blue-500">SHORYA & SURAJ</i>
                </section>
            </div>
        )
    }

    if (timeTableData === undefined) {
        return (
            <div>
                <Toast open={openToast} setOpen={setOpenToast} />
                <InputForm getDataFunction={getTimeTableData} setInput={setInput} isLoading={isPending} />
            </div>
        );
    }

    if (timeTableData !== undefined) {
        return (
            <div className="flex flex-col relative items-center justify-center min-w-screen min-h-[100dvh] p-4 max-md:p-1 bg-black">
                <Toast open={openToast} setOpen={setOpenToast} />
                    <div className=" fixed z-20 bottom-4 right-4">
                        <PopOver />

                    </div>
                {
                    showDialogBox && <DialogBox
                        setShowDialogBox={setShowDialogBox}
                        fetchDataFunction={fetchDataOnEdit}
                    />
                }
                <TimeTableUI rows={timeTableData} />
            </div>
        );
    }

    return (
        <div>Some error occured</div>
    )
}

export default FormAndTable;
