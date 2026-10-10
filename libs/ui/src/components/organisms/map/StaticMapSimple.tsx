import Image from 'next/image'

export const StaticMapSimple = ({
  position,
  className = 'w-full shadow-xl aspect-square',
  variant = 'light',
}: {
  position: { lng: number; lat: number }
  padding?: [number, number, number]
  className?: string
  variant?: 'light' | 'dark'
}) => {
  if (!position) {
    return <div className="aspect-square w-full bg-surface-sunken" />
  }

  const style =
    variant === 'dark'
      ? 'mapbox/dark-v11'
      : 'iamkarthick/clk4em1h900i201pf3jvuei21'
  const pin = variant === 'dark' ? 'pin-s+ffdd00' : 'pin-s'
  const url = `https://api.mapbox.com/styles/v1/${style}/static/${pin}(${position.lng},${position.lat})/${position.lng},${position.lat},13,0/600x400@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  return (
    <Image src={url} alt="Map" className={className} width={600} height={400} />
  )
}
