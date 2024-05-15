import { UserType } from '@/types'
import { Card, CardBody } from '@nextui-org/card'
import { Tabs, Tab } from '@nextui-org/tabs'
import React, { useState } from 'react'
import { MailIcon, UserCardIcon, UserSettingsIcon } from '../icons'

export default function AccountTabs({ user }: { user: UserType }) {
  const [selected, setSelected] = useState<string>('dashboard')

  return (
    <Card className="p-3 w-full">
      <Tabs
        color='primary'
        variant="solid"
        // classNames={{
        //   cursor: " bg-[#292929]"
        // }}
        aria-label="Actions"
        selectedKey={selected}
        // @ts-expect-error
        onSelectionChange={setSelected}
      >
        <Tab key="statistics" title={<div className='flex items-center gap-1'><UserCardIcon fill='currentColor' /> Statistics</div>}>
          <div className='m-1'>
            Statistics
          </div>
        </Tab>
        <Tab key="mail" title={<div className='flex items-center gap-1'><MailIcon fill='currentColor' /> Mail</div>}>
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
