"use client"
import { Button, ButtonGroup } from '@nextui-org/button'
import React, { ReactNode, useState } from 'react'
import { AddIcon, CancelIcon, DeleteIcon, SearchIcon, UpdateIcon } from '@/components/icons'
import { Spacer } from "@nextui-org/spacer";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Input } from "@nextui-org/input"
import { motion as Motion } from "framer-motion"
import AdminTableLevels from '@/components/admin/table';
import { AdminModalAddContext } from '@/components/admin/modals/AdminModalContext';
import Section from '@/components/Section';
const MonitionVariants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.1
    }
  },
  hide: {
    y: -20,
    opacity: 0
  }
};

export type ModalContent = {
  header: ReactNode | JSX.Element | null,
  body: ReactNode | JSX.Element | null
}

enum SwitchSelectMode {
  none = "none",
  single = "single",
  multiple = "multiple"
}



export default function Page() {
  const [modalContent, setModalContent] = useState<ModalContent>();
  const [isActiveUpdate, setIsActiveUpdate] = useState<boolean>(false);
  const [isActiveDelete, setIsActiveDelete] = useState<boolean>(false);
  const [switchSelect, setSwitchSelect] = useState<SwitchSelectMode>(SwitchSelectMode.none);
  const { onOpenChange, isOpen } = useDisclosure();


  function HandleUpdateAction() {
    setIsActiveDelete(false);
    if (isActiveUpdate) {
      setSwitchSelect(SwitchSelectMode.none);
    }
    else {
      setSwitchSelect(SwitchSelectMode.single);
    }
    setIsActiveUpdate(!isActiveUpdate);
  }

  function HandleDeleteAction() {
    setIsActiveUpdate(false)
    if (isActiveDelete) {
      setSwitchSelect(SwitchSelectMode.none);
    } else {
      setSwitchSelect(SwitchSelectMode.multiple);
    }
    setIsActiveDelete(!isActiveDelete);
  }

  function HandleAddAction() {
    setIsActiveDelete(false)
    setIsActiveUpdate(false)
    setSwitchSelect(SwitchSelectMode.none);

    setModalContent(AdminModalAddContext)
    onOpenChange();
  }
  return (
    <>
      <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>
            {modalContent?.header}
          </ModalHeader>
          <ModalBody>
            {modalContent?.body}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Section>
        <span className='flex justify-between w-full'>
          <h3 className=' text-xl text-gray-500'>All levels</h3>
          <div className="flex gap-4">
            <Input type='search' color="default" variant="flat" placeholder='Search...' className='w-max' startContent={<SearchIcon fill="#555555" />} />
            <ButtonGroup>
              <Button onClick={HandleAddAction} size='sm' variant="ghost" color="success" className='svgBtn'>
                <Motion.div className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  <AddIcon fill='currentColor' />
                  <p>Add</p>
                </Motion.div>
              </Button>
              <Button onClick={HandleUpdateAction} size='sm' variant="ghost" color="secondary" className='svgBtn'>
                <Motion.div key={+isActiveUpdate} className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  {isActiveUpdate ? <CancelIcon fill='currentColor' /> : <UpdateIcon fill='currentColor' />}
                  {isActiveUpdate ? "Cancel" : "Update"}
                </Motion.div>
              </Button>
              <Button onClick={HandleDeleteAction} size='sm' variant="ghost" color="danger" className='svgBtn'>
                <Motion.div key={+isActiveDelete} className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  {isActiveDelete ? <CancelIcon fill='currentColor' /> : <DeleteIcon fill='currentColor' />}
                  {isActiveDelete ? "Cancel" : "Delete"}
                </Motion.div>
              </Button>
            </ButtonGroup>
          </div>
        </span>
        <Spacer y={10} />
        <AdminTableLevels switchSelect={switchSelect} />
      </Section>
    </>
  )
}
