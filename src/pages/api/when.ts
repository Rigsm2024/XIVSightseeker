// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherForecaster } from "../../features/weather/forecaster"
import jsonRepository from "../../features/repository/jsonRepository"
import sightseeingGuide from "../../features/guide/sightseeingGuide"
import { GetLatestRemainingSeconds } from "@/features/guide/logSorter";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<number>,
) {
    const { item, periods } = req.query;
    const itemNo = parseInt(item, 10);
    const periodsNo = parseInt(periods, 10);

    // Check input
    if (periodsNo > 1000) {
        res.status(400).json({ error: "Bad Request: too long term." });
        return;
    }

    const slogs = jsonRepository.LoadSightseeingLogs();
    if (!slogs.some(f => f.ItemNo == itemNo)) {
        res.status(400).json({ error: "Bad Request: there is no such a item number." });
        return;
    }

    console.log(`api/when. try to check achivables in term of ${periodsNo} chunks.`);

    // Make weather reports
    const targets = slogs.filter(f => f.ItemNo == itemNo);
    const targetArea = targets[0].AreaKey;
    const forecaster = new WeatherForecaster();
    const reports = forecaster.GetLongWeathersIn(targetArea, periodsNo);
    console.log(reports[0].Forecasts)

    // Check achivables
    const guide = sightseeingGuide.GetGuidedSightseeingLogs(targets, reports);
    const when = GetLatestRemainingSeconds(guide);
    console.log(`api/when. result: ${when}.`);

    res.status(200).json(when);
}
