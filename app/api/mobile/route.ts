import connectMongo from "@/utils/connectDb";
import { modelMap, ModelMapKeysType } from "@/utils/model/mapper";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type PropsType = {
  batch: string;
  course: ModelMapKeysType;
  day: string;
};

type DataType = {
  _id: ObjectId;
  day: string;
  time: string;
  data: string[];
  __v: number;
};

export async function POST(req: NextRequest) {
  const timetable: { timing: string; label: string }[] = [];
  await connectMongo();
  const { batch, course, day }: PropsType = await req.json();
  console.log(batch, course, day);

  const Model = modelMap[course];

  const data: DataType[] = await Model.find({ day });

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

  return NextResponse.json(timetable, {
    status: 200,
  });
}
