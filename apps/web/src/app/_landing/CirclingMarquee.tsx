import { frustratedComments } from '@ufopark/3d/src/util/comments'

const lines = frustratedComments.map((line) => line.replace(/\s*\n\s*/g, ' '))
const half = Math.ceil(lines.length / 2)
const rows = [lines.slice(0, half), lines.slice(half)]

const Row = ({ items, reverse }: { items: string[]; reverse?: boolean }) => (
  // Two copies side by side so the -50% loop is seamless.
  <div
    className={`flex w-max gap-10 motion-reduce:animate-none ${
      reverse ? 'animate-marquee-reverse' : 'animate-marquee'
    } group-hover:[animation-play-state:paused]`}
  >
    {[...items, ...items].map((line, i) => (
      <span
        key={i}
        aria-hidden={i >= items.length || undefined}
        className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-xl font-bold text-fg-subtle sm:text-2xl"
      >
        <span className="line-through decoration-primary decoration-[3px]">
          {line}
        </span>
        <span className="h-2 w-2 shrink-0 bg-primary" />
      </span>
    ))}
  </div>
)

/** The same lines the drivers mutter in the 3D city, crossed out. */
export const CirclingMarquee = () => (
  <section
    aria-label="Things you’ll stop saying"
    className="group relative overflow-hidden border-y border-line bg-surface-sunken py-10"
  >
    <h2 className="sr-only">Things you’ll stop saying</h2>
    <div className="flex flex-col gap-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <Row items={rows[0]} />
      <Row items={rows[1]} reverse />
    </div>
    <p className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-max -translate-y-1/2 bg-primary px-4 py-2 font-display text-lg font-black text-black shadow-glow sm:text-2xl">
      Things you’ll stop saying.
    </p>
  </section>
)
