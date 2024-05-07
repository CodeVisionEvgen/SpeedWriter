import { DeleteIcon, NewIcon, StarIcon, UpgradeIcon } from '@/components/icons'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Spacer } from '@nextui-org/spacer'
import React, { FormEvent } from 'react'
import { LevelsDifficulty } from '../table'
import { formToJSON } from "axios";
import { CreateLevel, DeleteLevels, GetLevelById, UpdateLevel } from '@/app/actions/Levels'
import { ILevel, ModalContent } from '@/types'

async function HandleAddSubmit(e: FormEvent) {
  e.preventDefault();
  CreateLevel(
    formToJSON(e.target as any) as ILevel
  )
}

export const AdminModalAddContext = (onClose: () => void): ModalContent => {
  return {

    header: <span className='flex gap-2'><NewIcon fill='#44ff44' width="29px" height="29px" /><h1>Create level</h1></span>,
    body:
      <form action="/api/levels/create" method='POST' onSubmit={async (e) => {
        await HandleAddSubmit(e);
        onClose();
      }} className='grid gap-2'>
        <Input variant="bordered" label="Level name" name="LevelName" isRequired />
        <Autocomplete
          isRequired
          label="Level difficulty"
          placeholder="Search an difficulty"
          variant="bordered"
          name='LevelDifficulty'
          defaultItems={LevelsDifficulty}
          startContent={<StarIcon className="text-2xl w-6 h-6 m-[-1px]" fill='gold' />}
          className="max-w"
        >
          {(item) => {
            return <AutocompleteItem textValue={item.value} key={item.key}>{item.element}</AutocompleteItem>
          }}
        </Autocomplete>
        <Textarea label="Level text"
          placeholder="Enter your level text"
          name="LevelText"
          className="max-w" isRequired></Textarea>
        <Spacer y={2} />
        <div className='flex justify-end'>
          <Button variant="solid" type='submit' color="primary">Submit</Button>
        </div>
      </form>
  }
}
export const AdminModalDeleteContext = async (ids: string[], onClose: () => void): Promise<ModalContent> => {
  async function HandleDeleteSubmit(e: FormEvent) {
    e.preventDefault();
    await DeleteLevels(ids);
  }
  return {
    header: <span className='flex gap-2 '><DeleteIcon fill='#dc2626' width="28px" height="28px" /><h1>Delete levels</h1></span>,
    body: <form className='flex justify-center' action="/api/levels/create" method='delete' onSubmit={async (e) => {
      await HandleDeleteSubmit(e)
      onClose()
    }}>
      <Button color='danger' variant='solid' type="submit">Confirm</Button>
    </form>
  }
}
export const AdminModalUpdateContext = async (id: string, onClose: () => void): Promise<ModalContent> => {
  const level = await GetLevelById(id);
  async function HandleUpdateSubmit(e: FormEvent) {
    e.preventDefault();
    UpdateLevel(id,
      formToJSON(e.target as any) as ILevel
    )
  }
  return {
    header: <span className='flex gap-2 '><UpgradeIcon fill='#aa44bb' width="28px" height="28px" /><h1>Update level</h1></span>,
    body:
      <form action="/api/levels/create" method='POST' onSubmit={async (e) => {
        HandleUpdateSubmit(e);
        onClose()
      }} className='grid gap-2'>
        <Input defaultValue={level?.LevelName} variant="bordered" label="Level name" name="LevelName" />
        <Autocomplete
          label="Level difficulty"
          placeholder="Search an difficulty"
          variant="bordered"
          name='LevelDifficulty'
          defaultInputValue={level?.LevelDifficulty}
          defaultItems={LevelsDifficulty}
          startContent={<StarIcon className="text-2xl w-6 h-6 m-[-1px]" fill='gold' />}
          className="max-w"
        >
          {(item) => {
            return <AutocompleteItem textValue={item.value} key={item.key}>{item.element}</AutocompleteItem>
          }}
        </Autocomplete>
        <Textarea defaultValue={level?.LevelText} label="Level text"
          placeholder="Enter your level text"
          name="LevelText"
          className="max-w"></Textarea>
        <Spacer y={2} />
        <div className='flex justify-end'>
          <Button variant="solid" type='submit' color="primary">Submit</Button>
        </div>
      </form>
  }
}
