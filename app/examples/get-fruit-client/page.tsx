"use client";

import FruitPageClient from "./client";

// Server component
export default function FruitPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Fruit List</h1>
                <p>
                    Here is a list of fruits fetched and rendered on the <span className="font-bold">client side</span>. Click the following button to fetch some fruits.
                </p>
            </div>

            {/* Render a client component */}
            <FruitPageClient />
        </div>
    );
}
