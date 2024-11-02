import { LogFilterProps } from "../../features/guide/logSorter"

const FilterLocalStrageKey = "XIVSightseeker_FilterPropsKey";

export const WriteFilterToLocalStrage = (filter: LogFilterProps) => {
    const str = JSON.stringify(filter);
    localStorage.setItem(FilterLocalStrageKey, str);
}

export const ReadFilterFromLocalStrage = (): LogFilterProps => {
    const str = localStorage.getItem(FilterLocalStrageKey);
    const filter = str !== null ? JSON.parse(str) : null;
    
    return filter;
}

