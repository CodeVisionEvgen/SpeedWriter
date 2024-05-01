import { NewIcon, StarIcon } from '@/components/icons'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Spacer } from '@nextui-org/spacer'
import React from 'react'
import { LevelsDifficulty } from '../table'

const AdminModalContext = {
  header: <span className='flex gap-2'><NewIcon fill='#44ff44' width="29px" height="29px" /><h1>Create level</h1></span>,
  body:
    <form action="/api/levels/create" method='POST' className='grid gap-2'>
      <Input variant="bordered" label="Level name" name="levelName" isRequired />
      <Autocomplete
        isRequired
        label="Level difficulty"
        placeholder="Search an difficulty"
        variant="bordered"
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
        className="max-w" isRequired></Textarea>
      <Spacer y={2} />
      <div className='flex justify-end'>
        <Button variant="solid" type='submit' color="primary">Submit</Button>
      </div>
    </form>
}

export default AdminModalContext