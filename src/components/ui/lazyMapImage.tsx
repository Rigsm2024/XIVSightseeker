import React, { useState } from 'react'
import Image from 'next/image'

interface LazyMapImageProps {
    mapUrl: string
    alt?: string
    priority?: boolean
    quality?: number
    onClick?: () => void
}

const LazyMapImage: React.FC<LazyMapImageProps> = ({ mapUrl, alt = 'map', quality = 60, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <>
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}
            <Image 
                src={mapUrl} 
                fill 
                sizes="524px"
                alt={alt} 
                loading="lazy"
                quality={quality}
                onLoad={() => setImageLoaded(true)}
                onClick={onClick}
                className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${onClick ? 'cursor-pointer' : ''}`} 
            />
        </>
    )
}

export default React.memo(LazyMapImage)