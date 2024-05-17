"use client"
import { ignoreGradient } from "@/consts/ignore";
import gradient from "@/public/layout/gradient.png"
import Image from "next/image";
import { usePathname } from "next/navigation";

import React from 'react'
export default function Gradient() {
  const pathname = usePathname();
  return (<>
    {ignoreGradient.includes(pathname) ? "" : <Image src={gradient} width={2200} height={800} className="z-[0] absolute rotate-90 top-0 left-0" alt="gradient" />}
  </>
  )
}
