import ErrorHeader from "@/components/home-page/ErrorHeader";
import InputForm from "@/components/home-page/InputForm";

export default async function Home() {
    return (
        <div className="flex flex-col">
            <ErrorHeader />
            <InputForm />
        </div>
    )

}
