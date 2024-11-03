import Image from "next/image"
import sightseeingIcon from '../../public/icon/SightseeingLogIcon.svg'
import MenuDialog from "../ui/menuDialog"
import { LogFilterProps } from "@/features/guide/logSorter"
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
        <div className='container flex flex-row flex-row-reverse items-center place-content-between border-solid border-b prefer-border-color'>
            {opens && (
                <div onClick={cloeseDialog} className="absolute top-0 left-0 z-20 w-screen h-full"></div>
            )}
            <div className='fixed z-20 m-3'>
                <div className={`menu-button ${opens ? 'open' : ''}`} onClick={opens ? cloeseDialog : openDialog}>
                    <span className='menu-line'></span>
                    <span className='menu-line'></span>
                    <span className='menu-line'></span>
                </div>
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