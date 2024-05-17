import { MistakeIcon, SpeedIcon, TaskIcon } from '@/components/icons'
import { UserStatsType } from '@/types'
import { Chip } from '@nextui-org/chip'
import React from 'react'

export default function UserStat({ stats }: { stats: UserStatsType }) {
  return (
    <span className='grid gap-4'>
      <Chip variant="flat" startContent={<TaskIcon fill='currentColor' />} color='success' className='text-[16px]' size="sm" radius='sm'>Completed: {stats.completedLevels.length}</Chip>
      <Chip variant="flat" startContent={<SpeedIcon fill='currentColor' />} color='warning' className='text-[16px]' size="sm" radius='sm'>Speed writing: {stats.SpeedWriting}</Chip>
      <Chip variant="flat" startContent={<MistakeIcon fill='currentColor' />} color='danger' className='text-[16px]' size="sm" radius='sm'>Mistakes: {stats.Mistakes}</Chip>
    </span>
  )
}
