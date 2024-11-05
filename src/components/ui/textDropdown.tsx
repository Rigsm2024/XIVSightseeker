import { useState } from 'react';
import arrowIcon from '../../public/icon/arrow-down.svg'
import { SightseeingLog } from "../../features/interface/dataClass"

interface buttonProps {
    text: string,
    myClass: string,
    isOpen: boolean,
    callback: () => void,
}

const ToggleButton = ({ text, myClass, isOpen, callback }: buttonProps) => {

    return (
        <button className={`${myClass} p-2 pb-6 flex flex-row items-center`} onClick={callback}>
            <div className='text-xs text-gray-200'>{text}</div>
            <div className={`allow-down ${isOpen ? 'rotate-180' : ''}`}></div>
        </button>
    )
}

const TextDropdown = (log: SightseeingLog) => {
    const [isTextOpen, setTextOpen] = useState<boolean>(false);
    const [isHintOpen, setHintOpen] = useState<boolean>(false);
    const toggleText = () => setTextOpen(!isTextOpen);
    const toggleHint = () => setHintOpen(!isHintOpen);

    return (
        <div className='relative'>
            <ToggleButton text={'Text'} myClass={'absolute -top-8 right-0'} isOpen={isTextOpen} callback={toggleText} />
            <div className={`'relative w-full ${isTextOpen ? '' : 'hidden'}`}>
                <div className='card-divider-h my-1'></div>
                <div className='text-sm text-gray-200 whitespace-pre-wrap p-1 pb-2'>{log.Description}</div>

                { log.Hint.length > 0 && (
                    <div className='relative mt-2'>
                        <ToggleButton text={'Hint'} myClass={'absolute -top-7 right-0'} isOpen={isHintOpen} callback={toggleHint} />
                        <div className={`w-full ${isHintOpen ? '' : 'hidden'}`}>
                            <div className='card-divider-h my-1'></div>
                            <div className='text-xs text-gray-300 whitespace-pre-wrap p-1'>{log.Hint}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextDropdown;
