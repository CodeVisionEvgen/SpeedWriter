"use client"
import { Button, ButtonGroup } from '@nextui-org/button'
import React, { useState } from 'react'
import { AddIcon, CancelIcon, DeleteIcon, UpdateIcon } from '@/components/icons'
import { Spacer } from "@nextui-org/spacer";
import { motion as Motion } from "framer-motion"
import AdminTableLevels from '@/components/admin/table';
import Section from '@/components/Section';
import { SwitchSelectMode } from '@/types';
import SearchInput from '@/components/search';
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



export default function Page() {
  const [isActiveUpdate, setIsActiveUpdate] = useState<boolean>(false);
  const [isActiveDelete, setIsActiveDelete] = useState<boolean>(false);
  // const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [diff, setDiff] = useState<number>(0);
  const [switchSelect, setSwitchSelect] = useState<SwitchSelectMode | null>(null);


  function HandleUpdateAction() {
    setIsActiveDelete(false);
    if (isActiveUpdate) {
      setSwitchSelect(null);
    }
    else {
      setSwitchSelect(SwitchSelectMode.single);
    }
    setIsActiveUpdate(!isActiveUpdate);
  }

  function HandleDeleteAction() {
    setIsActiveUpdate(false)
    if (isActiveDelete) {
      setSwitchSelect(null);
    } else {
      setSwitchSelect(SwitchSelectMode.multiple);
    }
    setIsActiveDelete(!isActiveDelete);
  }
  function HandleAddAction() {
    setIsActiveDelete(false)
    setIsActiveUpdate(false)
    setSwitchSelect(SwitchSelectMode.none);
  }
  return (
    <>
      <Section>
        <span className='flex justify-between w-full'>
          <h3 className=' text-xl text-gray-500'>All levels</h3>
          <div className="flex gap-4">
            <SearchInput diff={diff} setDiff={setDiff} />
            <ButtonGroup>
              <Button onClick={HandleAddAction} size='sm' variant="faded" color="success" className='svgBtn'>
                <Motion.div className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  <AddIcon fill='currentColor' />
                  <p>Add</p>
                </Motion.div>
              </Button>
              <Button onClick={HandleUpdateAction} size='sm' variant="faded" color="secondary" className='svgBtn'>
                <Motion.div key={+isActiveUpdate} className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  {isActiveUpdate ? <CancelIcon fill='currentColor' /> : <UpdateIcon fill='currentColor' />}
                  {isActiveUpdate ? "Cancel" : "Update"}
                </Motion.div>
              </Button>
              <Button onClick={HandleDeleteAction} size='sm' variant="faded" color="danger" className='svgBtn'>
                <Motion.div key={+isActiveDelete} className='flex items-center gap-2' variants={MonitionVariants} animate={'show'} initial="hide">
                  {isActiveDelete ? <CancelIcon fill='currentColor' /> : <DeleteIcon fill='currentColor' />}
                  {isActiveDelete ? "Cancel" : "Delete"}
                </Motion.div>
              </Button>
            </ButtonGroup>
          </div>
        </span>
        <Spacer y={10} />
        <AdminTableLevels switchSelect={switchSelect} setSwitchSelect={setSwitchSelect} diff={diff} />
      </Section>
    </>
  )
}
