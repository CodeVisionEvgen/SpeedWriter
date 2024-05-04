"use client"
import { FetchLevels } from '@/app/actions/Levels';
import { ILevel } from '@/types';
import { Chip } from '@nextui-org/chip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Spinner } from "@nextui-org/spinner"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button';
import { TrashIcon } from '../icons';

export const LevelsDifficulty = [
  { key: 1, value: "easy", element: <Chip color='success' variant="dot" key={Math.random()}>Easy</Chip> },
  { key: 2, value: "medium", element: <Chip color='warning' variant="dot" key={Math.random()}>Medium</Chip> },
  { key: 3, value: "hard", element: <Chip color='danger' variant="dot" key={Math.random()}>Hard</Chip> }
]

function RenderList(item: ILevel) {
  return (
    <TableRow key={item._id}>
      <TableCell>{item.LevelPosition}</TableCell>
      <TableCell>{item.LevelName}</TableCell>
      <TableCell>{LevelsDifficulty.filter(lvl => item.LevelDifficulty == lvl.value)[0].element}</TableCell>
    </TableRow>
  )
}

export default function AdminTableLevels({ switchSelect }: any) {
  const [levels, setLevels] = useState<ILevel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    FetchLevels().then(lvl => {
      if (lvl) {
        setLevels(lvl);
        setIsLoading(false);
      }
    })
  }, [])
  return (
    <>
      <Table aria-label="collection table" selectionMode={switchSelect}>
        <TableHeader>
          <TableColumn>Level Position</TableColumn>
          <TableColumn>Level Name</TableColumn>
          <TableColumn>Level Difficulty</TableColumn>
        </TableHeader>
        <TableBody items={levels} isLoading={isLoading} loadingContent={<Spinner color="primary" />} emptyContent="There are no levels">
          {RenderList}
        </TableBody>
      </Table>
      <Button size='sm' className='mt-4' startContent={<TrashIcon fill='currentColor' />} color='danger'>
        Delete
      </Button>
    </>
  )
}
