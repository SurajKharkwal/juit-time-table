"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { ErrorType } from "./InputForm";
import { BatchesArray } from "@/utils/model/mapper";

interface AutoCompleteProps {
  setCourse: (value: string) => void;
  error: ErrorType;
}

export default function SelectBatch({ setCourse, error }: AutoCompleteProps) {
  const Batches = ["BTECH 1 SEM", "BTECH 3 SEM", "BTECH 5 SEM", "BTECH 7 SEM"];
  return (
    <Select
      className="w-[350px]"
      radius="sm"
      onChange={(e) => setCourse(e.target.value)}
      description={
        error === "Course Required" ? (
          <span className="text-red-400">{error}</span>
        ) : (
          ""
        )
      }
      label="Select Course"
    >
      {Batches.map((element) => (
        <SelectItem key={element} value={element}>
          {element}
        </SelectItem>
      ))}
    </Select>
  );
}
