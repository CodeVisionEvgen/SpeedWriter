import { FilterIcon, SearchIcon } from './icons'
import { Input } from '@nextui-org/input'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import React, { useState } from 'react';
import { LevelsDifficulty } from './admin/table';
import { Chip } from '@nextui-org/chip';
import { RequestArgsType } from '@/types';

export default function SearchInput({ setReload, setRequestArgs, requestArgs }: {
  setReload: React.Dispatch<React.SetStateAction<number>>;
  setRequestArgs: React.Dispatch<React.SetStateAction<RequestArgsType>>;
  requestArgs: RequestArgsType
}) {

  const [diff, setDiff] = useState<number>(0)
  const FiltersLevelsDifficulty = [{ key: 0, value: "every", element: <Chip color="default" variant="dot" key={Math.random()}>Every</Chip> }, ...LevelsDifficulty]
  return (
    <Input onValueChange={(letter) => {
      setRequestArgs({ ...requestArgs, query: letter }); setReload(Math.random())
    }
    } endContent={
      < Dropdown >
        <DropdownTrigger>
          {FiltersLevelsDifficulty[diff].element}
        </DropdownTrigger>
        <DropdownMenu>
          {...FiltersLevelsDifficulty.map((item, i) => <DropdownItem onClick={() => {
            setRequestArgs({ ...requestArgs, diff: item.value as any }); setReload(Math.random())
            setDiff(item.key); setReload(Math.random())
          }} className=' cursor-pointer select-none' key={i}>{item.element}</DropdownItem>)}
        </DropdownMenu>
      </Dropdown >

    } type='search' color="default" variant="flat" placeholder='Search...' className='w-max' startContent={< SearchIcon fill="#555555" />} />
  )
}
