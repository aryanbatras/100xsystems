import * as React from "react"

import { cn } from "@/application/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 border border-black bg-white px-3 py-2 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus-visible:border-purple focus-visible:ring-1 focus-visible:ring-purple disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
