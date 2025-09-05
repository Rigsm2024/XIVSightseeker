import Image from "next/image"
import githubIcon from '../../public/icon/github-mark.svg'
import { useState } from "react";
import { LogFilterProps } from "@/features/shared/logSorter";

interface menuProps {
    filters: LogFilterProps,
    updateFilters: (filters: LogFilterProps) => void,
}

const MenuDialog = ({ filters, updateFilters }: menuProps) => {
    // Prepare react events
    const [sorterIndex, setSelected] = useState<number>(filters.sortOrder ?? 0);
    const handleSorter = (index: number) => {
        setSelected(index);
        updateFilters({ sortOrder: index });
    };

    const [showsComp, setComp] = useState<boolean>(filters.showsComp ?? false);
    const toggleShowsComp = () => {
        const toggled = !showsComp;
        setComp(toggled);
        updateFilters({ showsComp: toggled });
    };

    const [isLongTerm, setLongTerm] = useState<boolean>(filters.isLongTerm ?? false);
    const toggleLongTerm = () => {
        const toggled = !isLongTerm;
        setLongTerm(toggled);
        updateFilters({ isLongTerm: toggled });
    };

    // Preapre styles
    const menuBase = "relative bg-gray-800 hover:bg-gray-700 pl-9 py-2 text-white text-left";

    return (
        <div className="absolute flex flex-col top-14 right-0 z-20 w-52 rounded-lg overflow-hidden bg-gray-900">
            <div onClick={() => handleSorter(0)} className={`${menuBase} ${sorterIndex == 0 ? "menu-selected" : ""}`}>
                達成可能順
            </div>
            <div className='border-b border-gray-700'></div>
            <div onClick={() => handleSorter(1)} className={`${menuBase} ${sorterIndex == 1 ? "menu-selected" : ""}`}>
                番号順
            </div>
            
            <div className='mt-3'></div>

            <div onClick={toggleShowsComp} className={`${menuBase} ${showsComp ? "menu-selected" : ""}`}>
                達成済みを表示
            </div>
            <div className='border-b border-gray-700'></div>
            <div onClick={toggleLongTerm} className={`${menuBase} ${isLongTerm ? "menu-selected" : ""}`}>
                長期間予報
            </div>

            <div className='mt-3'></div>

            <div onClick={() => { 
                const allItemNos = Array.from({ length: 80 }, (_, i) => i + 1);
                updateFilters({ completed: allItemNos }); 
            }} className={menuBase}>
                全て達成済みにする
            </div>
            <div className='border-b border-gray-700'></div>
            <div onClick={() => { 
                updateFilters({ completed: [] }); 
            }} className={menuBase}>
                全て未達成にする
            </div>

            <div className="flex justify-center py-2 mt-1">
                <a href='https://github.com/Rigsm2024/XIVSightseeker' title='source code' className='relative' target='_blank' rel='noopener noreferrer'>
                    <Image
                        src={githubIcon}
                        width={24}
                        height={24}
                        alt='githubIcon'
                        className='prefer-icon-invert m-auto'
                    />
                </a>
            </div>
            
        </div>
    )
}

export default MenuDialog;