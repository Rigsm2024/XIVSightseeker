
export interface EorzeanTime {
    hours: number
	days: number
	chunk: number
}

export function ConvertToEorzeanTime(unixSeconds: number): EorzeanTime {
    // 1 Eorzean hour = 175 seconds
    const eorzeanHours = Math.floor(unixSeconds / 175);
    const eorzeanDays = Math.floor(eorzeanHours / 24);

    // chunk: 16:00 -> 00, 00:00 -> 08, 08:00 -> 16
    let timeChunk = eorzeanHours % 24 - (eorzeanHours % 8);
    timeChunk = (timeChunk + 8) % 24;

    return {
        hours: eorzeanHours,
        days: eorzeanDays,
        chunk: timeChunk,
    };
}