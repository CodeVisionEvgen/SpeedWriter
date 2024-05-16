import { UserStatsType, UserType } from '@/types'
import { Card } from '@nextui-org/card'
import { Tabs, Tab } from '@nextui-org/tabs'
import React, { useState } from 'react'
import { MailIcon, TrophyIcon, UserCardIcon, UserSettingsIcon } from '../icons'
import UserChart from './chart/userChart'
import UserStat from './stats/userStat'

export default function AccountTabs({ user, selected, setSelected }: { selected: string, setSelected: React.Dispatch<React.SetStateAction<string>>, user: UserType & { stats: UserStatsType } }) {

  return (
    <Card className="p-3 w-full">
      <Tabs
        color='primary'
        variant="solid"
        aria-label="Actions"
        selectedKey={selected}
        // @ts-expect-error
        onSelectionChange={setSelected}
      >
        <Tab key="statistics" title={<div className='flex items-center gap-1'><UserCardIcon fill='currentColor' /> Statistics</div>}>
          <div className="m-1 mt-5">
            <h2 className='text-[25px] text-default-600 tracking-wider'>Statistics</h2>
            <div className='flex gap-4 items-start'>
              <UserChart stats={user.stats} />
              <UserStat stats={user.stats} />
            </div>
          </div>
        </Tab>
        <Tab key="mail" title={<div className='flex items-center gap-1'><MailIcon fill='currentColor' /> Notifications</div>}>
          <div className='m-1'>
            Statistics
          </div>
        </Tab>
        <Tab key="achievements" title={<div className='flex items-center gap-1'><TrophyIcon fill='currentColor' /> Achievements</div>}>
          <div className='m-1'>
            Statistics
          </div>
        </Tab>
        <Tab key="settings" title={<div className='flex items-center gap-1'><UserSettingsIcon fill='currentColor' /> Settings</div>}>
          <div className='m-1'>
            Statistics
          </div>
        </Tab>
      </Tabs>
    </Card>
  )
}
