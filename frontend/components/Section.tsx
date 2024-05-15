import { Card, CardBody } from '@nextui-org/card'
import React from 'react'

export default function Section({ children, className, color }: {
  children?: React.ReactNode
  className?: string,
  color?: string
}) {
  return (
    <Card classNames={{
      base: `p-5 ${color}`
    }}>
      <CardBody className={className}>
        {children}
      </CardBody>
    </Card>
  )
}
