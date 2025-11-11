import Image from 'next/image'

export function Nvidia() {
  return (
    <div className="container mx-auto my-0 py-20 w-full px-4 border-l border-r border-dashed">
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Proud member of
        </span>
        <Image
          src="/nvidia-inception-program-badge.svg"
          alt="NVIDIA Inception Program badge"
          width={260}
          height={120}
          className="h-auto w-48 sm:w-56 md:w-64"
          priority
        />
      </div>
    </div>
  )
}