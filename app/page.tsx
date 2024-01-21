import Input from "./components/Input";
import InputContainer from "./components/InputContainer";

export default function Home() {
    return (
        <div id="page">
            <header className="text-center p-10 text-5xl">
                <h1 className="text-3xl font-bold">Mortgage Calculator</h1>
            </header>
            <main className="sm:px-10 md:px-10 lg:px-40 flex">
                <div
                    id="outter-container"
                    className="grow grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 m-5 text-xs"
                >
                    <InputContainer />
                    <InputContainer />
                    <InputContainer />
                    <InputContainer />
                </div>
            </main>
        </div>
    );
}
