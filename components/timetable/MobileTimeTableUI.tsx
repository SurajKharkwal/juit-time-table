import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const divStyle = "grid grid-cols-[_0.7fr_0.1fr_2fr]";

function DataCard({ label, timing }: { timing: string; label: string }) {
  const [subCode, batches, teacher, venue] = timing.split(" ");
  const [type, code] = subCode.split("-");
  const ClassType = {
    L: "Lecture",
    P: "Practical",
    T: "Tutorial",
  };
  return (
    <Card isHoverable className=" max-w-sm w-full mx-auto">
      <CardHeader className=" text-xl font-semibold">{label}</CardHeader>
      <CardBody className="translate-x-6 text-default-500">
        <div className={divStyle}>
          <h3 className=" text-green-500">Type</h3> :
          <h5>{ClassType[type as "L" | "P" | "T"]}</h5>
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Subject</h3> : <h5>{code}</h5>
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Teacher</h3> : <h5>{teacher}</h5>
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Batches</h3> : <h5>{batches}</h5>
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Venue</h3> : <h5>{venue}</h5>
        </div>
      </CardBody>
    </Card>
  );
}

const SkeletonStyle = (w: number) => ` w-${w} h-3 rounded-2xl`;

function LoadingCard({ label }: { label: string }) {
  return (
    <Card isHoverable className="max-w-sm w-full mx-auto">
      <CardHeader className=" text-xl font-semibold">{label}</CardHeader>
      <CardBody className="translate-x-6">
        <div className={divStyle}>
          <h3 className=" text-green-500">Type</h3> :
          <Skeleton className={SkeletonStyle(8)} />
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Subject</h3> :
          <Skeleton className={SkeletonStyle(14)} />
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Teacher</h3> :
          <Skeleton className={SkeletonStyle(8)} />
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Batches</h3> :
          <Skeleton className={SkeletonStyle(16)} />
        </div>
        <div className={divStyle}>
          <h3 className=" text-green-500">Venue</h3> :
          <Skeleton className={SkeletonStyle(6)} />
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
  if (loading) {
    const Label = [
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
    return (
      <div className=" space-y-2 p-6 w-full">
        {Label.map((element) => (
          <LoadingCard key={element} label={element} />
        ))}
      </div>
    );
  }

  return (
    <div className=" space-y-2 p-6 w-full">
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
