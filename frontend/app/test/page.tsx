import { IAchievement } from '@/types'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody } from '@nextui-org/card'
import React from 'react'

const context: IAchievement = {
  title: "HARD?",
  descriptions: "Complete hard level on 1 minute",
  image: "https://ik.imagekit.io/sujkmwsrb/achievements/HardOnOneMinute.svg",
}

export default function page() {
  return (
    <Card className='w-max'>
      <CardBody className='p-5 w-full flex items-center'>
        <Avatar className='w-32 h-32' src={context.image} alt={context.title} />
      </CardBody>
      <div className='w-full h-full p-3 mt-3 bg-default-100/75'>
        <p className=' text-[20px]'>{context.title}</p>
        <p className=' text-md'>{context.descriptions}</p>
      </div>
    </Card >
  )
}
