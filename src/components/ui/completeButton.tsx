import { GuidedSightseeingLog } from "@/features/interface/dataClass";
import { LogFilterProps } from "@/features/shared/logSorter";
import React, { useRef } from 'react';

interface completeProps {
    glog: GuidedSightseeingLog,
    filters: LogFilterProps,
    updateFilters: (filters: LogFilterProps) => void,
}

const CompleteButton = ({glog, filters, updateFilters}: completeProps) => {
    const itemNo = glog.Data.ItemNo;
    const completes = filters.completed?.slice();
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const makeItComplete = () => {
        buttonRef.current?.classList.add('completed-animation');

        setTimeout(() => {
            completes?.push(itemNo);
            updateFilters({ completed: completes });
        }, 500);
    };
    const backItUncompleted = () => {
        const newCompletes = completes?.filter(f => f != itemNo);
        updateFilters({ completed: newCompletes });
    };
    const onClick = glog.IsCompleted ? backItUncompleted : makeItComplete;

    return (
        <div onClick={onClick} className='relative mr-2 w-6 h-6 cursor-pointer active:opacity-80'>
            <div className='metalic-border z-10 w-6 h-6 rounded-full'></div>
            <div className={`absolute right-0 z-10 w-5 h-5 top-0.5 left-0.5 rounded-full ${glog.IsCompleted ? 'bg-green-500' : 'bg-cardBase'}`}  ref={buttonRef}>
                <div className={`absolute top-0.5 left-1.5 border-r-2 border-b-2 border-white w-2 h-3 rotate-45 ${glog.IsCompleted ? '' : 'hidden'}`} ></div>
            </div>
        </div>
    );
};

export default CompleteButton;