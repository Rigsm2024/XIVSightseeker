import React, { useState } from 'react'
import Image from 'next/image'
import MapModal from './mapModal'
import { GuidedSightseeingLog } from '../../features/interface/dataClass'
import { LogFilterProps } from '@/features/shared/logSorter'

interface MapImageProps {
    mapUrl: string
    alt?: string
    priority?: boolean
    quality?: number
    glog?: GuidedSightseeingLog
    filters?: LogFilterProps
    updateFilters?: (filters: LogFilterProps) => void
    enableModal?: boolean
}

const MapImage: React.FC<MapImageProps> = ({ mapUrl, alt = 'map', quality = 60, glog, filters, updateFilters, enableModal = true }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
                </div>
            )}
            <Image 
                src={mapUrl} 
                fill 
                sizes="524px"
                alt={alt} 
                loading="eager"
                quality={quality}
                onLoad={() => setImageLoaded(true)}
                onClick={enableModal && glog ? () => setIsModalOpen(true) : undefined}
                className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${enableModal && glog ? 'cursor-pointer' : ''}`} 
            />
            {isModalOpen && enableModal && glog && filters && updateFilters && (
                <MapModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    glog={glog}
                    filters={filters}
                    updateFilters={updateFilters}
                />
            )}
        </>
    )
}

export default React.memo(MapImage)