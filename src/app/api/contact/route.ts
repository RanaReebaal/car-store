import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
    try {
        // Check if the request body is null or undefined
        if (!request.body) {
            throw new Error("Request body is missing");
        }

        // Parse the request body based on the content type
        let requestBody;
        if (request.headers.get("content-type") === "application/json") {
            requestBody = await request.json();
        } else {
            throw new Error("Unsupported content type");
        }

        // Extract data from the request body
        const { customer_name, customer_phone, customer_email } = requestBody;

        // Create a database connection
        const conn = postgres({
            ssl: require,
        });
        if (customer_name){console.log(customer_name)}
        console.log(customer_name, customer_phone, customer_email)
        // Build the query to insert data into the contact table
        const query = `
            INSERT INTO contact (customer_name, customer_phone, customer_email)
            VALUES ('${customer_name}', '${customer_phone}', '${customer_email}')
            RETURNING *;
        `;

        // Execute the query to insert data
        const result = await conn.unsafe(query);

        console.log("Inserted data:", result);

        // Return the inserted data
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("Error inserting data:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}