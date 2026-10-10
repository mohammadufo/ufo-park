import { useEffect, useState } from 'react'
import {
  IconPhotoCancel,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'

export interface IAutoImageChangerProps {
  images: string[]
  durationPerImage?: number
  aspectRatio?: 'aspect-square' | 'aspect-video' | 'aspect-auto'
  noAutoChange?: boolean
}

export const AutoImageChanger = ({
  images,
  durationPerImage = 5000,
  aspectRatio = 'aspect-square',
  noAutoChange = false,
}: IAutoImageChangerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (noAutoChange) return

    const interval = setInterval(() => {
      setCurrentImageIndex((oldIndex) => (oldIndex + 1) % images.length)
    }, durationPerImage)

    return () => clearInterval(interval)
  }, [durationPerImage, images])

  if (images.length === 0)
    return (
      <div
        className={`bg-blueprint flex w-full select-none items-center justify-center gap-2 bg-surface-sunken text-sm text-fg-subtle ${
          aspectRatio === 'aspect-auto' ? 'h-48' : aspectRatio
        }`}
      >
        <IconPhotoCancel className="h-5 w-5" /> No photos yet
      </div>
    )

  return (
    <div className={`relative w-full overflow-hidden ${aspectRatio}`}>
      <img
        src={images[currentImageIndex]}
        alt=""
        className="object-cover h-full w-full"
      />
      {images.length > 1 ? (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 p-2">
          {images.map((_, index) => (
            <div
              className={`h-1 transition-all duration-300 ${
                currentImageIndex === index
                  ? 'w-6 bg-primary'
                  : 'w-3 bg-white/60'
              }`}
              key={index}
            />
          ))}
        </div>
      ) : null}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1,
              )
            }
          >
            <IconChevronLeft className="h-8 w-8 bg-black/50 p-1.5 text-white transition-colors hover:bg-primary hover:text-black" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() =>
              setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length,
              )
            }
          >
            <IconChevronRight className="h-8 w-8 bg-black/50 p-1.5 text-white transition-colors hover:bg-primary hover:text-black" />
          </button>
        </>
      )}
    </div>
  )
}
