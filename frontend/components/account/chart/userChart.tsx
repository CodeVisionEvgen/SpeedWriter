import { GetLevelsLength } from '@/app/actions/Levels'
import { UserStatsType } from '@/types'
import { Chip } from '@nextui-org/chip'
import { Progress } from '@nextui-org/progress'
import { Tooltip } from '@nextui-org/tooltip'
import { useEffect, useState } from 'react'

export default function UserChart({ stats }: { stats: UserStatsType }) {
  const [levelLength, setLevelLength] = useState<number>(0);
  useEffect(() => {
    GetLevelsLength().then((data) => setLevelLength(data?.data.levelsCount))
  }, [])
  return (
    <div className='w-[50%] border-2 border-default-400  p-3 rounded-md grid'>
      <p className='w-full text-sm text-default-500 text-right'>{stats.completedLevels.length}/{levelLength}</p>
      <div className="flex">
        <div className='grid'>
          <Chip color='danger' className=' border-none' variant="dot" size='sm'>Hard</Chip>
          <Chip color='warning' className=' border-none' variant="dot" size='sm'>Medium</Chip>
          <Chip color='success' className=' border-none' variant="dot" size='sm'>Easy</Chip>
        </div>
        <div className='w-full grid gap-4 mt-2'>
          <Tooltip showArrow content={stats.HardLevels}>
            <Progress color='danger' size='sm' value={stats.HardLevels} />
          </Tooltip>
          <Tooltip showArrow content={stats.HardLevels}>
            <Progress color='warning' size='sm' value={stats.HardLevels} />
          </Tooltip>
          <Tooltip showArrow content={stats.HardLevels}>
            <Progress color='success' size='sm' value={stats.HardLevels} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
