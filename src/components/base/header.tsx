import Image from "next/image"
import sightseeingIcon from '../../public/icon/SightseeingLogIcon.svg'
import MenuDialog from "../ui/menuDialog"
import { LogFilterProps } from "@/features/shared/logSorter"
import { useState } from "react"

interface headerProps {
    filters: LogFilterProps
    updateFilters: (filters: LogFilterProps) => void
}

export default function SightHeader({filters, updateFilters}: headerProps) {
    const [opens, setOpens] = useState<boolean>(false);
    const openDialog = () => setOpens(true);
    const cloeseDialog = () => setOpens(false);

    return (
        <div className='w-full flex flex-row flex-row-reverse items-center place-content-between border-solid border-b prefer-border-color'>
            {opens && (
                <div onClick={cloeseDialog} className="absolute top-0 left-0 z-20 w-screen h-full"></div>
            )}
            <div className='fixed z-20 m-3 flex flex-col items-center rounded-lg px-2 py-1' style={{ backgroundColor: 'rgb(var(--background-end-rgb))' }} onClick={opens ? cloeseDialog : openDialog}>
                <div className={`menu-button ${opens ? 'open' : ''}`}>
                    <span className='menu-line'></span>
                    <span className='menu-line'></span>
                    <span className='menu-line'></span>
                </div>
                <span className='text-xs w-[40px] text-center'>{opens ? 'CLOSE' : 'MENU'}</span>
                {opens && (
                    <MenuDialog filters={filters} updateFilters={updateFilters} />
                )}
            </div>

            <div> {/** dummy div for spacing */} </div>
            <div className='flex flex-row items-center'>
                <Image 
                    src={sightseeingIcon} 
                    width={30} 
                    height={30} 
                    alt='sightseeingIcon' 
                    className='prefer-icon-invert m-2' 
                />
                <h1 className='m-1'>XIVSightseeker</h1>
            </div>
        </div>
    )
}