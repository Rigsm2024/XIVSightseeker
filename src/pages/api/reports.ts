// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherReport } from "../../features/interface/dataClass"
import { WeatherForecaster } from "../../features/weather/forecaster"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherReport[]>,
) {
  // the count of forecast periods. This means 3 days in EorzeanTime.
  const defaultForecastPeriodsNumber = 9;

  const { periods } = req.query;
  const periodsNo = periods != undefined ? parseInt(periods as string, 10) : defaultForecastPeriodsNumber;

  // Check input
  if (periodsNo > 100) {
      console.warn('Bad request.')
      res.status(400).json([]);
      return;
  }

  const forecaster = new WeatherForecaster();
  const report = forecaster.GetWeatherReports(periodsNo);

  res.status(200).json(report);
}
