import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface SectionLabelProps {
  index: string
  label: string
  className?: string
}

export default function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4 font-mono text-xs tracking-[0.2em]', className)}>
      <span className="text-[#E8500A] font-bold">// {index}</span>
      <span className="text-[#6A6A6A] font-medium uppercase">{label}</span>
    </div>
  )
}
