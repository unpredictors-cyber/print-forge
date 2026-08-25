'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const gallery = images.length ? images : ['/placeholder.svg']
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length)
  }

  return (
    <div className="animate-fade-in space-y-3">
      <div
        className="group relative aspect-square overflow-hidden rounded-md border border-border bg-muted"
        onTouchEnd={(event) => {
          const start = Number(event.currentTarget.dataset.touchStart || 0)
          const distance = event.changedTouches[0]?.clientX - start
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1)
          delete event.currentTarget.dataset.touchStart
        }}
        onTouchStart={(event) => {
          event.currentTarget.dataset.touchStart = String(event.touches[0]?.clientX || 0)
        }}
      >
        <Image src={gallery[activeIndex]} alt={`${name} image ${activeIndex + 1}`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        {gallery.length > 1 && <>
          <button type="button" aria-label="Previous product image" onClick={() => move(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-card-foreground opacity-100 shadow transition-opacity sm:opacity-0 sm:group-hover:opacity-100"><ChevronLeft className="size-5" /></button>
          <button type="button" aria-label="Next product image" onClick={() => move(1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-card-foreground opacity-100 shadow transition-opacity sm:opacity-0 sm:group-hover:opacity-100"><ChevronRight className="size-5" /></button>
        </>}
      </div>
      {gallery.length > 1 && <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label={`${name} image thumbnails`}>
        {gallery.map((image, index) => <button key={`${image}-${index}`} type="button" aria-label={`Show image ${index + 1}`} aria-current={activeIndex === index} onClick={() => setActiveIndex(index)} className={`relative size-16 shrink-0 overflow-hidden rounded border-2 bg-muted transition ${activeIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}><Image src={image} alt="" fill className="object-cover" sizes="64px" /></button>)}
      </div>}
    </div>
  )
}
