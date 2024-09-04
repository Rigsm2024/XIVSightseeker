import Image from "next/image"
import sightseeingIcon from '../public/icon/SightseeingLogIcon.svg'
import githubIcon from '../public/icon/github-mark.svg'

export default function SightHeader() {
    return (
        <div className='container flex flex-row items-center place-content-between border-solid border-b'>
            <div className='flex flex-row items-center'>
                <Image 
                    src={sightseeingIcon} 
                    width={30} 
                    height={30} 
                    alt='sightseeingIcon' 
                    className='invert m-2' 
                />
                <h1 className='m-1'>XIVSightseeker</h1>
            </div>
            <a href='https://github.com/Rigsm2024/XIVSightseeker' title='source code' className='relative w-8 h-8 p-2 mr-1'>
                <Image 
                    src={githubIcon} 
                    fill
                    alt='githubIcon' 
                    className='invert !h-auto' 
                />
            </a>
        </div>
    )
}