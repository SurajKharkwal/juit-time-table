import { modelMap, ModelMapKeysType } from "@/utils/model/mapper";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { dayType } from "../desktop/route";

export async function POST(req: NextRequest) {
  try {
    const { batch, course, day } = await req.json();

    if (!batch || !course || !day) {
      return NextResponse.json(
        { error: "Batch, course, or day not provided" },
        { status: 400 }
      );
    }
    
    const Model = modelMap[course as ModelMapKeysType];
    
    if (!Model) {
      return NextResponse.json(
        { error: "Invalid course model" },
        { status: 500 }
      );
    }
    
    console.log(batch, course, day);
    const timetable: { timing: string; label: string }[] = [];
    const data: {
      _id: ObjectId;
      day: dayType;
      time: string;
      data: string[];
      __v: number;
    }[] = await Model.find({ day });

    data.forEach((element) => {
      let batchTimetable = "";

      element.data.forEach((timing) => {
        timing = timing.replace(/\s+/g, " ").trim();
        const db_batchList = timing.split(" ")[1];

        if (db_batchList.split(",").includes(batch)) {
          batchTimetable = timing;
        }
      });

      timetable.push({ timing: batchTimetable, label: element.time });
    });

    return NextResponse.json({
      message: "Here is the data",
      timetable,
    });
  } catch (error) {
    console.error("Error processing timetable data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
