import axios from "axios";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

export const daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ColumnTimeMapper = {
  B: "9:00 AM - 9:55 AM",
  C: "10:00 AM - 10:55 AM",
  D: "11:00 AM - 11:55 AM",
  E: "12:00 PM - 12:55 PM",
  F: "1:00 PM - 1:55 PM",
  G: "2:00 PM - 2:55 PM",
  H: "3:00 PM - 3:55 PM",
  I: "4:00 PM - 4:55 PM",
  J: "5:00 PM - 5:55 PM",
};

type TimetableEntry = {
  day: string;
  time: string;
  data: string[]; // Assuming the cell values are strings; adjust if they are different types
};

export async function ParseTimeTable(sheetNumber: number) {
  const parsedData: TimetableEntry[] = [];

  try {
    const { data } = await axios.get(
      "https://www.juit.ac.in/TTC/ODDSEM2024.xls",
      {
        responseType: "arraybuffer",
      }
    );

    const binaryString = Buffer.from(data).toString("binary");
    const xlsWorkbook = XLSX.read(binaryString, { type: "binary" });
    const xlsxData = XLSX.write(xlsWorkbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    const exceljsWorkbook = new ExcelJS.Workbook();
    await exceljsWorkbook.xlsx.load(xlsxData);

    exceljsWorkbook.eachSheet((sheet) => {
      console.log(sheet.name);
    });

    const worksheet = exceljsWorkbook.worksheets[sheetNumber];
    if (!worksheet) {
      throw new Error(`Worksheet number ${sheetNumber} does not exist.`);
    }

    for (
      let col = "B";
      col <= "J";
      col = String.fromCharCode(col.charCodeAt(0) + 1)
    ) {
      for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
        // console.log(col)
        // console.log(ColumnTimeMapper[col as keyof typeof ColumnTimeMapper]);
        const entry: TimetableEntry = {
          day: daysArray[dayIndex],
          time: ColumnTimeMapper[col as keyof typeof ColumnTimeMapper],
          data: [],
        };

        for (
          let row = 3 + 15 * dayIndex + dayIndex;
          row <= 3 + 15 * (dayIndex + 1) + dayIndex;
          row++
        ) {
          const cellValue = worksheet.getCell(`${col}${row}`).text; // Assuming text value; adjust if necessary
          if (cellValue) {
            entry.data.push(cellValue);
          }
          // console.log(row);
        }
        parsedData.push(entry);
      }
    }
  } catch (error) {
    console.error("Error parsing timetable:", error);
  }
  console.log(parsedData);
  return parsedData;
}
