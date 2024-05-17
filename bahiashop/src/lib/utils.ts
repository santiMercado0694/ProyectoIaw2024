import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "ARS" | "USD",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "ARS" , notation = 'compact' } = options

  const numericPrice =
    typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
