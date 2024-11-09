// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuidedSightseeingLog } from "../../features/interface/dataClass"
import jsonRepository from "../../features/repository/jsonRepository"
import { WeatherForecaster } from "../../features/weather/forecaster"
import SightseeingGuide from "../../features/shared/sightseeingGuide"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GuidedSightseeingLog[]>,
) {
  // the count of forecast periods. This means 3 days in EorzeanTime.
  const defaultForecastPeriodsNumber = 9;

  const { periods } = req.query;
  const periodsNo = periods != undefined ? parseInt(periods as string, 10) : defaultForecastPeriodsNumber;

  // Check input
  if (periodsNo > 100) {
    console.warn('Bad request.');
    res.status(400).json([]);
    return;
  }

  const slogs = jsonRepository.LoadSightseeingLogs();
  if (slogs.length == 0) {
    console.log("Slog count is 0 at /api/slogs. So return 503 to client.");
    res.status(503).json([]);
    return;
  }

  const reports = new WeatherForecaster().GetWeatherReports(periodsNo);
  const guide = new SightseeingGuide().GetGuidedSightseeingLogs(slogs, reports);

  res.status(200).json(guide);
}
