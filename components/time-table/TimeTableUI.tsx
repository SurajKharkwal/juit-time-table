import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { columns } from "./SmallTimeTableUI";

export default function TimeTableUI({ rows }: { rows: any }) {

    return (
        <div className="min-h-screen h-full flex items-center justify-center max-w-[1920px] w-full">
            <Table className="w-full" aria-label="Example table with dynamic content">
                <TableHeader className=" w-full h-full">
                    {columns.map((column) => (
                        <TableColumn
                            className="text-xl text-blue-400 p-6  font-extrabold gap-2"
                            key={column.key}
                        >
                            {column.label}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody className="w-full h-full">
                    {rows.map((row: any) => (
                        <TableRow key={row.key}>
                            {(columnKey) => (
                                <TableCell
                                    className="text-xl rounded-md border-1 w-[232.42] border-blue-400/20 p-4 pb-4 cursor-pointer items-center justify-center"
                                >
                                    {getKeyValue(row, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}