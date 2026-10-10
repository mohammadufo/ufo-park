export interface IParkingIconProps {
  /** Lowest hourly price to print beside the P, if known. */
  price?: number | null
  active?: boolean
}

/** Map marker shaped like a parking sign on a post. */
export const ParkingIcon = ({ price, active = false }: IParkingIconProps) => {
  return (
    <div className="group flex cursor-pointer flex-col items-center">
      <div
        className={`flex items-center gap-1 p-0.5 text-xs font-bold leading-none shadow-lg shadow-black/40 transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-glow-sm ${
          active
            ? 'bg-black text-primary ring-2 ring-primary'
            : 'bg-primary text-black'
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center font-display text-sm font-black ${
            active ? 'bg-primary text-black' : 'bg-black text-primary'
          }`}
        >
          P
        </span>
        {typeof price === 'number' ? (
          <span className="pr-1 font-display tabular-nums">
            ${price % 1 === 0 ? price : price.toFixed(2)}
          </span>
        ) : null}
      </div>
      <span className={`h-2 w-0.5 ${active ? 'bg-primary' : 'bg-black/70'}`} />
    </div>
  )
}
