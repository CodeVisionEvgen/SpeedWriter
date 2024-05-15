import { Achiements } from '@/app/actions/Achievements'
import { IAchievement, ModalContent as ModalContentType, UserStatsType, UserType } from "@/types";
import { Avatar, AvatarGroup } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/modal'
import { user } from '@nextui-org/theme'
import { Tooltip } from '@nextui-org/tooltip'
import React, { useEffect, useState } from 'react'

export default function UserAccount({ user }: { user: UserType & { stats: UserStatsType } }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContentType | null>(null)
  function HandleModalContext(ach: IAchievement) {
    setModalContent({
      body: <Card className='w-max'>
        <CardBody className='p-5 w-full flex items-center'>
          <Avatar className='w-32 h-32' src={ach.image} alt={ach.title} />
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
      <Card className=" w-[280px] p-2">
        <CardHeader className="flex justify-center">
          <Avatar className="w-25 h-25 text-large" src={user?.UserPicture} imgProps={{
            referrerPolicy: "no-referrer",
          }} />
        </CardHeader>
        <CardBody className=" grid gap-2">
          <h2 className=" text-lg text-default-600 w-full text-center">{user?.UserName}</h2>
          <h2 className=" text-[13px] text-default-300 text-left">{user?.UserEmail}</h2>
        </CardBody>
        <Divider />
        <CardFooter className="grid justify-start gap-4">
          <h2 className="m-0 p-0 text-left text-[15pt]">Achievements</h2>
          <AvatarGroup isGrid max={2} renderCount={(count) => {
            return <Avatar showFallback src='https://images.unsplash.com/broken' fallback={`+${count}`} />
          }} size="lg" className=" flex justify-start">
            {Achiements.map((ach) => {
              return (
                <Tooltip showArrow placement="top" className="overflow-visible" key={ach.title} content={ach.title}>
                  <Avatar classNames={{
                    img: "hover: shadow-lg;"
                  }} onClick={() => { HandleModalContext(ach) }} imgProps={{
                    referrerPolicy: "no-referrer",
                  }} className={` w-12 h-12 text-large`} src={ach.image} alt={ach.title} />
                </Tooltip>
              )
            })}
          </AvatarGroup>
        </CardFooter>
      </Card>
    </>
  );
}
