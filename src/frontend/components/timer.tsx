import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number; // remaining seconds
  phase: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, phase }) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        setTimeLeft(initialTime);

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime && prevTime > 0) {
                    return prevTime - 1;
                } 
                else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [initialTime]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return <div className='w-14'>{(timeLeft != null) ? formatTime(timeLeft) : 'Loading...'}</div>
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
                <div className='flex flex-row items-center'>
                    <div>あと</div>
                    <CountdownTimer initialTime={initialTime} phase={phase} />
                    <div className='flex-1 ' suppressHydrationWarning>(LT{achievableTimeText}から)</div>
                </div>
            )

        case 3:
        default:
            return <div>...</div>
    }
}
