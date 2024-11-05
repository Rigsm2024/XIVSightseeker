import { LogFilterProps } from "../../features/shared/logSorter"

const FilterLocalStrageKey = "XIVSightseeker_FilterPropsKey";

// Write filter info to Local Storage
export const WriteFilterToLocalStrage = (filter: LogFilterProps) => {
    const str = JSON.stringify(filter);
    localStorage.setItem(FilterLocalStrageKey, str);
}

// Read filter info from Local Storage
export const ReadFilterFromLocalStrage = (): LogFilterProps => {
    const str = localStorage.getItem(FilterLocalStrageKey);
    const filter = str !== null ? JSON.parse(str) : null;
    
    return filter;
}