import React from 'react'

export default function Section({ children, className }: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={` bg-gray-700/50 rounded-lg p-5 ${className}`}>
      {children}
    </div>
  )
}
