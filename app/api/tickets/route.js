import connection from "@/utils/api/connection";
import TicketsModel from "@/utils/api/models/TicketsModel";

export async function GET() {
  try {
    await connection();
    const data = await TicketsModel.find({});
    return Response.json({
      data: data,
    });
  } catch (error) {
    return Response.json({
      message: error,
    });
  }
}
