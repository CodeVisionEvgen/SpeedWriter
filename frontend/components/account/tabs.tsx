import { IAchievement, UserStatsType, UserType, ModalContent as ModalContentType } from '@/types'
import { Card, CardBody } from '@nextui-org/card'
import { Tabs, Tab } from '@nextui-org/tabs'
import React, { useEffect, useState } from 'react'
import { MailIcon, TrophyIcon, UserCardIcon, UserSettingsIcon } from '../icons'
import UserChart from './chart/userChart'
import UserStat from './stats/userStat'
import { Achiements } from '@/app/actions/Achievements'
import { Avatar } from '@nextui-org/avatar'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal'
import Mail from './mail/Mail'


export default function AccountTabs({ user, selected, setSelected }: { selected: string, setSelected: React.Dispatch<React.SetStateAction<string>>, user: UserType & { stats: UserStatsType } }) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [modalContent, setModalContent] = useState<ModalContentType | null>(null)
  function HandleModalContext(ach: IAchievement) {
    setModalContent({
      body: <Card className='w-max'>
        <CardBody className='p-5 w-full flex items-center'>
          <Avatar className='w-32 h-32 overflow-visible' src={ach.image} alt={ach.title} />
        </CardBody>
        <div className='w-full h-full p-3 mt-3 bg-default-100/75'>
          <p className=' text-[20px]'>{ach.title}</p>
          <p className=' text-md'>{ach.descriptions}</p>
        </div>
      </Card >
    })
  }

  useEffect(() => {
    if (modalContent !== null) {
      onOpen();
    } else {
      onClose();
    }
  }, [modalContent])
  return (
    <>
      <Modal className=" flex items-center bg-unset shadow-none border-none" placement="center" isOpen={isOpen} backdrop="blur" onClose={onClose} hideCloseButton >
        <ModalContent>
          <ModalBody>
            {modalContent?.body}
          </ModalBody>
        </ModalContent>
      </Modal>
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
            <div className='m-1 mt-5'>
              <Mail />
            </div>
          </Tab>
          <Tab key="achievements" title={<div className='flex items-center gap-1'><TrophyIcon fill='currentColor' /> Achievements</div>}>
            <div className='m-1 mt-5'>
              {/* <h2 className='text-[25px] text-default-600 tracking-wider'>Achievements</h2> */}
              <div className=' flex gap-10'>
                {Achiements.map((ach) => {
                  return (
                    <Avatar onClick={() => { HandleModalContext(ach) }} src={ach.image} alt={ach.title} key={ach.title} className="w-20 h-20 text-large overflow-visible cursor-pointer" />
                  )
                })}
              </div>
            </div>
          </Tab>
          <Tab key="settings" isDisabled title={<div className='flex items-center gap-1'><UserSettingsIcon fill='currentColor' /> Settings</div>}>
            <div className='m-1 mt-5'>
              Settings
            </div>
          </Tab>
        </Tabs>
      </Card>
    </>
  )
}
