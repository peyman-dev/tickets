import connection from "@/utils/api/connection";

export async function GET() {
  try {
    await connection();
    return Response.json({
      message: "Next.js api is working successfully !",
    });
  } catch (error) {
    return Response.json({
      message: error,
    });
  }
}
