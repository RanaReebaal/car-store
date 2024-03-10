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

        // Extract the ID from the request body
        const { name, type, year, price, miles } = requestBody;


        // Create a database connection
        const conn = postgres({
            ssl: require,
        });

        // Initialize the base query
        let query = `SELECT * FROM alldata`;

        // Construct the WHERE clause dynamically based on the parameters
        let conditions = [];
        if (name) {
            conditions.push(`make = '${name}'`);
        }
        if (type) {
            conditions.push(`type = '${type}'`);
        }
        if (year) {
            conditions.push(`year <= '${year}'`);
        }
        if (price) {
            conditions.push(`sellingprice <= '${price}'`);
        }
        if (miles) {
            conditions.push(`miles <= '${miles}'`);
        }

        // Add the WHERE clause to the query if there are conditions
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        // Execute the query
        console.log("Query:", query);
        const result = await conn.unsafe(query);

        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}