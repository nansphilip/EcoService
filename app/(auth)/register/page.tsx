import Card from "@comps/server/Card";
import RegisterClient from "./client";

export default function RegisterPage() {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center bg-white p-6">
            <Card className="w-min space-y-4">
                <h1 className="text-center text-xl font-bold">Register</h1>
                <div className="text-wrap text-center text-xs text-gray-500">Enter your personal informations to register.</div>
                <RegisterClient />
            </Card>
        </div>
    );
}
