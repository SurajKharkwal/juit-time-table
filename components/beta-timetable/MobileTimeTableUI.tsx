import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { ColumnTimeMapper as LabelObject } from "@/app/api/beta-timetable/update/parseTimeTable";
const LabelArray = Object.values(LabelObject);

function DataCard({ label, timing }: { timing: string; label: string }) {
  const [subCode, batches, teacher, venue] = timing.split(" ");
  const [type, code] = subCode.split("-");
  const ClassType = {
    L: "Lecture",
    P: "Practical",
    T: "Tutorial",
  };
  return (
    <Card>
      <CardHeader>{label}</CardHeader>
      <CardBody>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Type</h3> : <h5>{type}</h5>
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Subject</h3> : <h5>{code}</h5>
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Teacher</h3> : <h5>{teacher}</h5>
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Batches</h3> : <h5>{batches}</h5>
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Venue</h3> : <h5>{venue}</h5>
        </div>
      </CardBody>
    </Card>
  );
}
function LoadingCard({ label }: { label: string }) {
  return (
    <Card>
      <CardHeader>{label}</CardHeader>
      <CardBody>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Type</h3> :
          <Skeleton className="w-full h-4 rounded-3xl" />
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Subject</h3> :
          <Skeleton className="w-full h-4 rounded-3xl" />
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Teacher</h3> :
          <Skeleton className="w-full h-4 rounded-3xl" />
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Batches</h3> :
          <Skeleton className="w-full h-4 rounded-3xl" />
        </div>
        <div className="grid grid-cols-[_1fr_0.2fr_2fr]">
          <h3 className=" text-green-500">Venue</h3> :
          <Skeleton className="w-full h-4 rounded-3xl" />
        </div>
      </CardBody>
    </Card>
  );
}

export default function MobileScreenUI({
  loading,
  data,
}: {
  loading: boolean;
  data: { timing: string; label: string }[];
}) {
  if (loading)
    return (
      <div>
        {LabelArray.map((label) => (
          <LoadingCard key={label} label={label} />
        ))}
      </div>
    );
  return (
    <div>
      {data.map((element, i) => (
        <DataCard
          key={element.label}
          timing={element.timing}
          label={element.label}
        />
      ))}
    </div>
  );
}
