"use client";
import React, { FormEvent, useState } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import SelectBatch from "./SelectBatch";

export type formDataType = {
  course: string;
  batch: string;
};

export type ErrorType = "Batch Required" | "Course Required" | "none";

export default function InputForm() {
  const router = useRouter();
  const [error, setError] = useState<ErrorType>("none");
  const [data, setData] = useState<formDataType>({
    course: "",
    batch: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { course, batch } = data;

    if (course === "") {
      setError("Course Required");
      return;
    }
    if (batch === "") {
      setError("Batch Required");
      return;
    }

    if (batch) {
      batch = batch.replace(" ", "");
      batch = batch.replace("-", "");
      batch = batch.toUpperCase();
    }

    const encodedBatch = encodeURI(batch);
    const encodedCourse = encodeURI(course);
    router.push(
      `/beta-timetable/mobile?batch=${encodedBatch}&course=${encodedCourse}`
    );
  };

  return (
    <div className="w-full gap-12 h-[100dvh] flex flex-col text-xl items-center justify-center ">
      <Navigation />
      <h1 className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
        JUIT TIME TABLE
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-xl items-center justify-center gap-y-8"
      >
        <div className="grid justify-center items-center gap-4">
          <h1>Select Course</h1>
          <SelectBatch
            error={error}
            setCourse={(value) => setData({ ...data, course: value })}
          />
        </div>
        <div className="grid items-center justify-center gap-2">
          <h1>Select Batch</h1>
          <Input
            className="w-[350px]"
            type="text"
            label="Select Batch A13, CS12 ..."
            radius="sm"
            autoComplete="off"
            description={error === "Batch Required" ? error : ""}
            classNames={{ description: "text-red-400" }}
            onValueChange={(value) => setData({ ...data, batch: value })}
          />
        </div>
        <Button radius="sm" type="submit" color="primary">
          Submit
        </Button>
      </form>
      <footer className="absolute bottom-4 font-extralight flex items-center justify-center flex-col">
        <h6>created by</h6>
        <p className="text-blue-500 font-bold ">SURAJ & SHORYA</p>
      </footer>
    </div>
  );
}
