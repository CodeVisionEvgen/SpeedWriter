"use client"
import { GetLevelByPage } from '@/app/actions/Levels';
import { GetLevelsByPageType, ILevel, LevelDifficultyEmuns } from '@/types';
import { Chip } from '@nextui-org/chip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Spinner } from "@nextui-org/spinner"
import React, { MouseEvent, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { TrashIcon } from '../icons';
import { ModalContent as ModalContentType, SwitchSelectMode } from '@/types/index';
import { AdminModalAddContext, AdminModalDeleteContext, AdminModalUpdateContext } from './modals/AdminModalContext';
import { Pagination } from "@nextui-org/pagination"

export const LevelsDifficulty: { key: number; value: string; element: JSX.Element }[] = [
  { key: 1, value: "easy", element: <Chip color='success' variant="dot" key={Math.random()}>Easy</Chip> },
  { key: 2, value: "medium", element: <Chip color='warning' variant="dot" key={Math.random()}>Medium</Chip> },
  { key: 3, value: "hard", element: <Chip color='danger' variant="dot" key={Math.random()}>Hard</Chip> }
]


export default function AdminTableLevels({ switchSelect, setSwitchSelect, reload, setReload, requestArgs = {
  diff: "every",
  query: "",
} }:
  {
    requestArgs: {
      diff: LevelDifficultyEmuns | "every",
      query: string,
    }
    reload: number, setReload: React.Dispatch<React.SetStateAction<number>>, switchSelect: SwitchSelectMode | null,
    setSwitchSelect: React.Dispatch<React.SetStateAction<SwitchSelectMode | null>>
  }) {
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [modalContent, setModalContent] = useState<ModalContentType | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]))
  const [countLevels, setCountLevels] = useState<number>(0)
  const { onOpenChange, isOpen, onClose } = useDisclosure();

  async function HandleUpdateAction(e: any) {
    if (switchSelect === SwitchSelectMode.single) {
      setModalContent(await AdminModalUpdateContext(e, onClose))
    }
  }
  async function HandleDeleteAction(e: MouseEvent, selectedKeys: Set<string>) {
    setModalContent(await AdminModalDeleteContext(Array.from(selectedKeys), onClose))
  }
  async function HandleAddAction() {
    setModalContent(AdminModalAddContext(onClose))
  }

  function RenderList(item: ILevel) {
    return (
      <TableRow key={item._id}>
        <TableCell>{item.LevelPosition}</TableCell>
        <TableCell>{item.LevelName}</TableCell>
        <TableCell>{LevelsDifficulty.filter(lvl => item.LevelDifficulty == lvl.value)[0].element}</TableCell>
      </TableRow>
    )
  }

  useEffect(() => {
    setIsLoading(true);
    GetLevelByPage(page, requestArgs.diff, requestArgs.query).then(({ data }: any) => {
      let lvl = data as GetLevelsByPageType;
      if (lvl) {
        setLevels(lvl.docs);
        setMaxPages(lvl.maxPages);
        setCountLevels(lvl.countDocs);
        setIsLoading(false);
      }
    })
  }, [page, reload])
  useEffect(() => {
    if (modalContent) {
      onOpenChange();
    }
  }, [modalContent])
  useEffect(() => {
    if (!isOpen) {
      setReload(Math.random())
    }
  }, [isOpen])
  useEffect(() => {
    if (switchSelect === SwitchSelectMode.none) {
      HandleAddAction()
      setSwitchSelect(null)
    }
  }, [switchSelect])
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
      <Table
        topContent={
          <p className=' text-right text-sm text-[rgba(255,255,255,0.5)]'>Total levels: {countLevels}</p>
        }
        bottomContent={
          levels.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="default"
                page={page}
                total={maxPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        } selectionBehavior="replace" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} onRowAction={HandleUpdateAction} aria-label="collection table" selectionMode={switchSelect as SwitchSelectMode}>
        <TableHeader>
          <TableColumn>Level Position</TableColumn>
          <TableColumn>Level Name</TableColumn>
          <TableColumn>Level Difficulty</TableColumn>
        </TableHeader>
        <TableBody items={levels} isLoading={isLoading} loadingContent={<Spinner color="primary" />} emptyContent="There are no levels">
          {RenderList}
        </TableBody>
      </Table >
      {switchSelect === SwitchSelectMode.multiple && <Button isDisabled={Array.from(selectedKeys).length == 0} variant="solid" onClick={(e) => { HandleDeleteAction(e, selectedKeys) }} size='sm' className='mt-4' startContent={<TrashIcon fill='currentColor' />} color='danger'>
        Delete
      </Button>
      }
    </>
  )
}