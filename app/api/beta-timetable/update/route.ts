import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectDb";
import { modelMap } from "@/utils/model/mapper";
import { ParseTimeTable } from "./parseTimeTable";

const keyToSheetIndex: { [key: string]: number } = {
  "BTECH 1 SEM": 1, // Replace 0 with the actual sheet number for BTECH 1 SEM
  "BTECH 3 SEM": 2, // Replace 1 with the actual sheet number for BTECH 3 SEM
  "BTECH 5 SEM": 3, // Replace 2 with the actual sheet number for BTECH 5 SEM
  "BTECH 7 SEM": 4, // Replace 3 with the actual sheet number for BTECH 7 SEM
};

export async function GET() {
  await connectMongo();

  try {
    // Using for...of to handle async operations
    // await ParseTimeTable(6);
    //TODO: can be done using ordinary for loop
    for (const [key, Model] of Object.entries(modelMap)) {
      await Model.deleteMany();
      const data = await ParseTimeTable(keyToSheetIndex[key]);
      await Model.insertMany(data);
    }

    // Return the response with the updated data
    return NextResponse.json({
      message: "Data updated successfully",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Failed to update data" },
      { status: 500 }
    );
  }
}
