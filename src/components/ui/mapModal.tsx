import React, { useEffect } from 'react'
import { GuidedSightseeingLog } from '../../features/interface/dataClass'
import { playfair } from '../../pages/fonts'

interface MapModalProps {
    isOpen: boolean
    onClose: () => void
    glog: GuidedSightseeingLog
    filters: any
    updateFilters: any
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, glog }) => {
    const log = glog.Data
    const mapUrl = `/map/${log.ItemNo.toString().padStart(3, '0')}.webp`
    const [imageLoaded, setImageLoaded] = React.useState(false)
    
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
            setImageLoaded(false) // Reset when opening
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}
        >
            <div 
                className="relative bg-gray-800 sm:rounded-lg shadow-xl w-full sm:w-[90vw] max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-700">
                    <h3 className={`text-white text-lg sm:text-xl font-medium ${playfair.className}`}>
                        {log.ItemNo.toString().padStart(3, '0')} - {log.AreaName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="p-2 sm:p-6 overflow-auto flex-1">
                    <div className="relative w-full">
                        {/* 16:9のアスペクト比を保持 */}
                        <div className="pb-[56.25%]"></div>
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
                            </div>
                        )}
                        {/* Imageコンポーネントを使うと初回が信じられないくらい遅くなるため、通常のimgにする */}
                        <img
                            src={mapUrl}
                            alt={log.AreaName}
                            className={`absolute inset-0 w-full h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapModal