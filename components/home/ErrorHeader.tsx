"use client";
import * as Toast from "@radix-ui/react-toast";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function ErrorToast() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isError = getCookie("error");
        if (isError) setOpen(true);
        deleteCookie("error");
    }, []);

    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root
                className="bg-neutral-800 rounded-md border-l-4 border-l-red-500 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Description asChild className="">
                    <div className="">
                        <h3 className="text-xl font-semibold  text-red-400">Error: </h3>
                        <p>No data was found</p>
                    </div>
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
    );
}
