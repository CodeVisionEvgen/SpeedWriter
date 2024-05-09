"use client"

import Section from "@/components/Section"
import { Spinner } from "@nextui-org/spinner"

export default function loading() {
  return (
    <div className="w-full h-[40vh] flex justify-center">
      <Section className="w-[50vw] flex justify-center z-10">
        <Spinner label="Loading" labelColor="primary"
          color="primary" />
      </Section>
    </div>
  )
}
