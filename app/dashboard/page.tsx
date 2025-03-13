import { GetSession } from "@lib/auth";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await GetSession();

    const role = session?.user.role;

    if (role !== "ADMIN" && role !== "VENDOR" && role !== "EMPLOYEE") {
        unauthorized();
    }

    return (
        <div className="flex w-full flex-1 flex-row">
                <div className="flex w-1/6 flex-col border-r-[1.5px] border-black">
                    <div className="flex-1 p-5">Left</div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-5">
                        <h1>Dashboard</h1>
                    </div>
                </div>
        </div>
    );
}
