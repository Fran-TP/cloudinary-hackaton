'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'two-up': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

interface TwoUpWrapperProps {
  imageUrl: string
  publicId: string
  promptCustom?: string
}

export default function TwoUpWrapper({
  imageUrl,
  publicId,
  promptCustom
}: TwoUpWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const loadTwoUp = async () => {
      await import('two-up-element')
      setIsMounted(true)
    }
    loadTwoUp()
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <two-up>
      <Image
        className="h-auto"
        src={imageUrl}
        alt="Imagen subida"
        width={500}
        height={500}
      />
      <CldImage
        className="h-auto"
        alt="Imagen transformada"
        src={publicId}
        width="500"
        height="500"
        replaceBackground={promptCustom ? promptCustom : undefined}
      />
    </two-up>
  )
}
