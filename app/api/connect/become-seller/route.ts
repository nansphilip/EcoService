import { NextResponse } from "next/server";
import { GetSession } from "@lib/auth";
import prisma from "@lib/prisma";

export async function POST() {
    try {
        const session = await GetSession();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Update user to be a seller
        await prisma.user.update({
            where: { id: session.user.id },
            data: { isSeller: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: (error as Error).message || "Error becoming a seller" },
            { status: 500 }
        );
    }
}
