import { useEffect, useState } from 'react'
import MapGl, { useMap } from 'react-map-gl'

type MapProps = React.ComponentProps<typeof MapGl> & { height?: string }

const LIGHT_STYLE = 'mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3'
const DARK_STYLE = 'mapbox://styles/mapbox/dark-v11'

/** Follows the app theme: dark streets on the customer site, light elsewhere. */
const useIsDarkTheme = () => {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('theme-dark'))
  }, [])
  return dark
}

export const Map = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
  const dark = useIsDarkTheme()
  return (
    <MapGl
      {...props}
      projection={{ name: 'globe' }}
      mapStyle={dark ? DARK_STYLE : LIGHT_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ height }}
      scrollZoom={false}
    >
      <StyleMap dark={dark} />
      {props.children}
    </MapGl>
  )
}

export const StyleMap = ({ dark = false }: { dark?: boolean }) => {
  const { current } = useMap()

  useEffect(() => {
    if (!current) return
    const applyFog = () =>
      current.getMap().setFog(
        dark
          ? {
              color: 'rgb(14, 14, 13)',
              range: [1, 10],
              // @ts-ignore
              'high-color': 'rgb(28, 28, 26)',
              'horizon-blend': 0.05,
              'space-color': 'rgb(6, 6, 6)',
              'star-intensity': 0.25,
            }
          : {
              color: 'rgb(255, 255, 255)', // Lower atmosphere
              range: [1, 10],
              // @ts-ignore
              'high-color': 'rgb(200, 200, 200)', // Upper atmosphere
              'horizon-blend': 0.05, // Atmosphere thickness
              'space-color': 'rgb(150, 150, 150)', // Background color
              'star-intensity': 0.5, // Background star brightness
            },
      )
    current.on('style.load', applyFog)
    if (current.isStyleLoaded()) applyFog()
    return () => {
      current.off('style.load', applyFog)
    }
  }, [current, dark])
  return null
}
