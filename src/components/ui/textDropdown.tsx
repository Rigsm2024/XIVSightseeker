import Image from "next/image"
import React, { useRef } from 'react';
import arrowIcon from '../../public/icon/arrow-down.svg'
import { GuidedSightseeingLog } from "../../features/guide/sightseeingGuide"

interface buttonProps {
    text: string
    myClass: string
    callback: () => void
}

const ToggleButton = ({ text, myClass, callback }: buttonProps) => {
    const iconRef = useRef<HTMLDivElement | null>(null);
    const onClick = () => {
        iconRef.current?.classList.toggle('rotate-180')
        callback()
    }

    return (
        <button className={`${myClass} p-2 pb-6 flex flex-row items-center`} onClick={onClick}>
            <div className='text-xs text-gray-200'>{text}</div>
            <div className='' ref={iconRef}>
                <Image
                    src={arrowIcon}
                    width={20}
                    height={20}
                    alt='arrowIcon'
                    className='invert'
                />
            </div>
        </button>
    )
}

const TextDropdown = (log: GuidedSightseeingLog) => {
    const textDivId = 'dropdown-text-' + log.ItemNo
    const hintDivId = 'dropdown-hint-' + log.ItemNo

    const toggleText = () => document.getElementById(textDivId)?.classList.toggle('hidden')
    const toggleHint = () => document.getElementById(hintDivId)?.classList.toggle('hidden')

    return (
        <div className='relative'>
            <ToggleButton text={'Text'} myClass={'absolute -top-8 right-0'} callback={toggleText} />
            <div className='hidden relative w-full' id={textDivId}>
                <div className='card-divider-h my-1'></div>
                <div className='text-sm text-gray-200 whitespace-pre-wrap p-1 pb-2'>{log.Description}</div>

                {/* TODO: implement hint features */}
                {/* <ToggleButton text={'Hint'} myClass={'absolute -bottom-7 right-0'} callback={toggleHint} />
                <div className='hidden w-full' id={`dropdown-hint-${log.ItemNo}`}>
                    <div className='card-divider-h my-1'></div>
                    <div className='text-xs text-gray-400 whitespace-pre-wrap p-1'>hint sample</div>
                </div> */}
            </div>
        </div>
    );
};

export default TextDropdown;
