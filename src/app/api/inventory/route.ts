
// // pages/api/getData.ts
// import { NextRequest, NextResponse } from "next/server";
// import postgres from "postgres";

// export async function GET(request: NextRequest) {
//     try {
//         const conn = postgres({
//             ssl: require,
//         });
        
//         // Query one entry from the database
//         const result = await conn.unsafe("SELECT * FROM carinventory LIMIT 1");

//         console.log("Fetched data:", result);

//         return new NextResponse(JSON.stringify(result), { status: 200 });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
//     }
// }






// // pages/api/getData.ts
// import { NextRequest, NextResponse } from "next/server";
// import postgres from "postgres";

// export async function POST(request: NextRequest) {
//     try {
//         // Check if the request body is null or undefined
//         if (!request.body) {
//             throw new Error("Request body is missing");
//         }

//         // Parse the request body based on the content type
//         let requestBody;
//         if (request.headers.get("content-type") === "application/json") {
//             requestBody = await request.json();
//         } else {
//             throw new Error("Unsupported content type");
//         }

//         // Extract the table name and columns from the request body
//         const { tableName, columns } = requestBody;

//         // Create a database connection
//         const conn = postgres({
//             ssl: require,
//         });

//         // Build the query dynamically based on the provided table name and columns
//         const query = `SELECT ${columns.join(", ")} FROM ${tableName} LIMIT 1`;

//         // Execute the query
//         const result = await conn.unsafe(query);

//         console.log("Fetched data:", result);

//         return new NextResponse(JSON.stringify(result), { status: 200 });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
//     }
// }






// pages/api/getAllData.ts
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
    try {
        // Create a database connection
        const conn = postgres({
            ssl: require,
        });

        // Build the query to select all data from the table
        const query = `SELECT * FROM alldata`; // Replace 'alldata' with your table name

        // Execute the query to fetch all data
        const result = await conn.unsafe(query);

        console.log("Fetched all data:", result);

        // Return the fetched data in the response
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("Error fetching all data:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}








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
        const { id } = requestBody;
        // Log the type of the id
        console.log("Type of id:", typeof id);

        // Create a database connection
        const conn = postgres({
            ssl: require,
        });

        // Build the query to fetch the record based on ID
        const query = `
            SELECT *
            FROM alldata
            WHERE uuid = '${id}'
        `;

        // Execute the query with the ID parameter
        const result = await conn.unsafe(query);

        console.log("Fetched data:", result);

        // Check if any record is found
        if (result.length === 0) {
            throw new Error("Record not found");
        }

        // Return the first (and only) record found
        return new NextResponse(JSON.stringify(result[0]), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}