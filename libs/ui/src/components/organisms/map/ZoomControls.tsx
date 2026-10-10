import { MouseEventHandler, ReactNode } from 'react'
import { IconMinus, IconParking, IconPlus } from '@tabler/icons-react'
import { useMap } from 'react-map-gl'

const MapControls = ({ children }: { children: ReactNode }) => (
  <div className="glass flex flex-col divide-y divide-line-strong shadow-panel">
    {children}
  </div>
)

const ZoomControlButton = ({
  children,
  onClick,
  label,
}: {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  label: string
}) => (
  <button
    className="flex h-10 w-10 items-center justify-center text-fg-muted transition-colors hover:bg-primary hover:text-black"
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
  >
    {children}
  </button>
)

const ZoomIn = () => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton label="Zoom in" onClick={() => map?.zoomIn()}>
      <IconPlus className="h-5 w-5" />
    </ZoomControlButton>
  )
}

const ZoomOut = () => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton label="Zoom out" onClick={() => map?.zoomOut()}>
      <IconMinus className="h-5 w-5" />
    </ZoomControlButton>
  )
}

export const CenterOfMap = ({
  onClick,
  Icon = IconParking,
}: {
  onClick: (latLng: { lng: number; lat: number }) => void
  Icon?: typeof IconParking
}) => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton
      label="Use the center of the map"
      onClick={() => {
        const { lat, lng } = map?.getCenter() as { lng: number; lat: number }
        onClick({ lat, lng })
      }}
    >
      <Icon className="h-5 w-5" />
    </ZoomControlButton>
  )
}

MapControls.ZoomIn = ZoomIn
MapControls.ZoomOut = ZoomOut
MapControls.CenterOfMap = CenterOfMap

export default MapControls

export const DefaultZoomControls = ({ children }: { children?: ReactNode }) => (
  <MapControls>
    <ZoomIn />
    <ZoomOut />
    {children}
  </MapControls>
)
