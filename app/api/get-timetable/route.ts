import connectMongo from "@/utils/connectDb";
import { BtechSem1 } from "@/utils/model/model";
import { NextRequest, NextResponse } from "next/server";
import { daysArray } from "../update-time-table/parseTimeTable";
import { ObjectId } from "mongoose";

// Define the dayType first, independent of parsedData
type dayType = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export async function POST(req: NextRequest) {
  const { batch, course } = await req.json();
  console.log(batch, course);

  await connectMongo();

  // Now use the dayType to define the parsedData structure
  const parsedData: Record<dayType, string[]> = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };

  try {
    const data: {
      _id: ObjectId;
      day: dayType;
      time: string;
      data: string[];
      __v: number;
    }[] = await BtechSem1.find({ day: { $in: daysArray } });

    console.log(data);

    data.forEach((element) => {
      let isBatchInDb = false;

      element.data.forEach((timing) => {
        // remove unwanted spaces
        timing = timing.replace(/\s+/g, " ").trim();

        let db_batchList = timing.split(" ")[1];

        db_batchList.split(",").forEach((db_batch) => {
          // if (db_batch.startsWith("23") || db_batch.startsWith("24")) {
          //   db_batch = db_batch.slice(2);
          // }

          if (db_batch === batch) {
            isBatchInDb = true;
            parsedData[element.day].push(timing);
          }
        });
      });
      if (!isBatchInDb) {
        parsedData[element.day].push("");
      }
      // Only push an empty string if no matching timings were found
    });

    return NextResponse.json({
      message: "Here is the data",
      parsedData,
    });
  } catch (error) {
    console.error("Error finding data:", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}