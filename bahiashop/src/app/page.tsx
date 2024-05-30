import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductCard } from "@/components/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, DollarSign } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
    "Obten tu codigo de compra inmediatamente en tu email."
  },
  {
    name: "Calidad Garantizada",
    Icon: CheckCircle,
    description:
    "Todos nuestros productos fueron verificados por nuestro equipo para asegurar la mejor calidad. No esta satisfecho? Ofrecemos una garantia de 30 dias."
  },
  {
    name: "Medios de pago",
    Icon: DollarSign,
    description:
    "Aceptamos todos los medios de pago registrados"
  }
]

export default function Home() {
  return (
    <>
    <MaxWidthWrapper >
    
      <ProductCard/>

    </MaxWidthWrapper>

    </>
  )
}