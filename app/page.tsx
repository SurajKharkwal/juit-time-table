import ErrorToast from "@/components/home/ErrorHeader";
import InputForm from "@/components/home/InputForm";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <ErrorToast />
      <InputForm />
    </div>
  );
}
