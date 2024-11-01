// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherReport } from "../../features/interface/dataClass"
import { WeatherForecaster } from "../../features/weather/forecaster"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherReport[]>,
) {
  const forecaster = new WeatherForecaster();
  const report = forecaster.GetWeatherReports();

  res.status(200).json(report);
}
