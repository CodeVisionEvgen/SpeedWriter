"use client"

import Section from "@/components/Section"
import { Spinner } from "@nextui-org/spinner"

export default function loading() {
  return (
    <div className="w-full h-[40vh] flex justify-center">
      <Spinner label="Loading" labelColor="primary"
        color="primary" />
    </div>
  )
}
