import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number; // remaining seconds
  phase: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, phase }) => {
    const [currentTime, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const currentUnixSeconds = Math.floor(Date.now() / 1000);
        const intervalTag = setInterval(() => {
            setTimeLeft(currentUnixSeconds);
        }, 1000);

        return () => clearInterval(intervalTag);
    }, [currentTime]);

    const formatTime = (currentTimeArg: number) => {
        const remainingSeconds = initialTime - currentTimeArg
        if (remainingSeconds <= 0) {
            return '00:00'
        }

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return <div className='w-14'>{(currentTime != null) ? formatTime(currentTime) : '--:--'}</div>
};

export default function TimerText({initialTime, phase}: CountdownTimerProps) {
    switch (phase) {
        // currently achievable
        case 1:
            return (
                <div className='text-red-400 flex flex-row items-center'>
                    <div>残り</div>
                    <CountdownTimer initialTime={initialTime} phase={phase} />
                </div>
            )
        
        // soon achievable
        case 2:
            const achievableTime = new Date(new Date().getTime() + initialTime * 1000);
            const achievableTimeText = new Intl.DateTimeFormat(undefined, {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // use the browser's timezone
            }).format(achievableTime);

            return (
                <div className='text-gray-200 flex flex-row items-center'>
                    <div>あと</div>
                    <CountdownTimer initialTime={initialTime} phase={phase} />
                    <div className='flex-1' suppressHydrationWarning>(LT{achievableTimeText}から)</div>
                </div>
            )

        case 3:
        default:
            return <div className='ext-gray-200'>しばらく達成不可</div>
    }
}
