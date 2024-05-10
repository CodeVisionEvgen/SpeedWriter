import { Card, CardBody } from '@nextui-org/card'
import React from 'react'

export default function Section({ children, className }: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Card classNames={{
      base: `bg-gray-700/50 p-5 ${className}`
    }}>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
}
