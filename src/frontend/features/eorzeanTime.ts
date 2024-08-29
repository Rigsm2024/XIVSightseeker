
export interface EorzeanTime {
    hour: number
    hours: number
	days: number
	chunk: number
    source: number
}

export function ConvertToEorzeanTime(unixSeconds: number): EorzeanTime {
    // 1 Eorzean hour = 175 seconds
    const eorzeanHours = Math.floor(unixSeconds / 175);
    const eorzeanDays = Math.floor(eorzeanHours / 24);

    // chunk: 16:00 -> 00, 00:00 -> 08, 08:00 -> 16
    let timeChunk = eorzeanHours % 24 - (eorzeanHours % 8);
    timeChunk = (timeChunk + 8) % 24;

    return {
        hour: eorzeanHours % 24,
        hours: eorzeanHours,
        days: eorzeanDays,
        chunk: timeChunk,
        source: unixSeconds
    };
}