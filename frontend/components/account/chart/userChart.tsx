import { GetLevelsLength } from '@/app/actions/Levels'
import { LevelsLengthType, UserStatsType } from '@/types'
import { CardProps } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Progress } from '@nextui-org/progress'
import { Tooltip } from '@nextui-org/tooltip'
import { useEffect, useState } from 'react'

export default function UserChart(props: CardProps & { stats: UserStatsType }) {
  const { stats } = props;
  const [levelLength, setLevelLength] = useState<LevelsLengthType | null>(null);
  useEffect(() => {
    GetLevelsLength().then((data) => setLevelLength(data?.data as LevelsLengthType))
  }, [])
  return (
    <div className={`w-[50%] border-2 border-default-400  p-3 rounded-md grid ${props.className}`}>
      <p className='w-full text-sm text-default-500 text-right'>{stats.completedLevels.length}/{levelLength?.total}</p>
      {levelLength &&
        <div className="flex">
          <div className='grid'>
            <Chip color='danger' className=' border-none' variant="dot" size='sm'>Hard</Chip>
            <Chip color='warning' className=' border-none' variant="dot" size='sm'>Medium</Chip>
            <Chip color='success' className=' border-none' variant="dot" size='sm'>Easy</Chip>
          </div>
          <div className='w-full grid gap-4 mt-2'>
            <Tooltip showArrow content={stats.hard}>
              <Progress color='danger' size='sm' value={stats.hard * 100 / levelLength.hard} />
            </Tooltip>
            <Tooltip showArrow content={stats.medium}>
              <Progress color='warning' size='sm' value={stats.medium * 100 / levelLength.medium} />
            </Tooltip>
            <Tooltip showArrow content={stats.easy}>
              <Progress color='success' size='sm' value={stats.easy * 100 / levelLength.easy} />
            </Tooltip>
          </div>
        </div>
      }
    </div>
  )
}
