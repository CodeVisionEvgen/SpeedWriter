import { FilterIcon, SearchIcon } from './icons'
import { Input } from '@nextui-org/input'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import React, { useState } from 'react';
import { LevelsDifficulty } from './admin/table';
import { Chip } from '@nextui-org/chip';

export default function SearchInput({ diff, setDiff }: { diff: number, setDiff: React.Dispatch<React.SetStateAction<number>> }) {
  const FiltersLevelsDifficulty = [{ key: 0, value: "every", element: <Chip color="default" variant="dot" key={Math.random()}>Every</Chip> }, ...LevelsDifficulty]
  return (
    <Input endContent={
      <Dropdown>
        <DropdownTrigger>
          {FiltersLevelsDifficulty[diff].element}
        </DropdownTrigger>
        <DropdownMenu>
          {...FiltersLevelsDifficulty.map((item, i) => <DropdownItem onClick={() => setDiff(item.key)} className=' cursor-pointer select-none' key={i}>{item.element}</DropdownItem>)}
        </DropdownMenu>
      </Dropdown>

    } type='search' size='sm' color="default" variant="flat" placeholder='Search...' className='w-max' startContent={<SearchIcon fill="#555555" />} />
  )
}
