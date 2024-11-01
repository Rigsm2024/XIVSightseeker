// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SightseeingLog } from "../../features/interface/dataClass"
import jsonRepository from "../../features/repository/jsonRepository"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SightseeingLog[]>,
) {
  const slogs = jsonRepository.LoadSightseeingLogs();

  if (slogs.length == 0) {
    console.log("Slog count is 0 at /api/slogs. So return 503 to client.");
    res.status(503).json([]);
  }
  else {
    res.status(200).json(slogs);
  }
}
