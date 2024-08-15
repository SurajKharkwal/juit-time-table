import { dayType } from "@/app/api/get-timetable/route";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const ColumnTimeMapper = [
  "Days",
  "9:00 AM - 9:55 AM",
  "10:00 AM - 10:55 AM",
  "11:00 AM - 11:55 AM",
  "12:00 PM - 12:55 PM",
  "1:00 PM - 1:55 PM",
  "2:00 PM - 2:55 PM",
  "3:00 PM - 3:55 PM",
  "4:00 PM - 4:55 PM",
  "5:00 PM - 5:55 PM",
];

export default function TimeTableUI({
  data,
}: {
  data: Record<dayType, string[]>;
}) {
  const keysOfData = Object.keys(data) as dayType[]; // Cast the keys as dayType[]
  // console.log(data)

  return (
    <Table
      aria-label="Juit-timetable"
      className="max-w-[120rem] w-full mx-auto"
    >
      <TableHeader>
        {ColumnTimeMapper.map((element) => (
          <TableColumn
            width={200}
            key={element}
            className="text-xl text-blue-400 p-6  font-extrabold gap-2"
          >
            {element}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {keysOfData.map((day) => {
          // console.log(data[day]);
          const appendDay = [day, ...data[day]];
          // console.log(appendDay);
          return (
            <TableRow key={day}>
              {appendDay.map((timing, i) => (
                <TableCell
                  width={200}
                  height={100}
                  className="text-xl rounded-md border-1 w-[232.42] border-blue-400/20 p-4 pb-4 items-center justify-center"
                  key={i}
                >
                  {timing}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
