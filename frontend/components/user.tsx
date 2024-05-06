import { Avatar } from '@nextui-org/avatar'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { ExitIcon, PersonIcon, KeyboardIcon, NotificationIcon, MoreIcon, MailIcon } from './icons';
import { Button } from '@nextui-org/button';
import { Badge } from "@nextui-org/badge"
const messages = [
  "HELLO I FROM ULARS",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "ELS BZCJ VE:NRJ",
]
const c = messages.length;

function renderMessages(messages: string[]): JSX.Element[] {
  return messages.slice(0, 10).map(message => <DropdownItem description={message} key="message" color="default" variant="flat"></DropdownItem>)
}

export const UserTumb = ({ src }: { src: string }) => {
  return (
    <div className='flex gap-4 rounded-sm'>
      <Badge size='sm' content={c} isInvisible={!c} shape="rectangle" color='danger'>
        <Dropdown>
          <DropdownTrigger>
            <Avatar className=' cursor-pointer' size="md" src={src} alt={"Account"} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection title={"Actions"}>
              <DropdownItem description="Your profile" key="account" startContent={<PersonIcon width={28} fill='currentColor' />} color="secondary" variant="bordered">My Account</DropdownItem>
              <DropdownItem description="Messages" key="messages" startContent={<MailIcon width={28} fill='currentColor' />} endContent={<div className=' w-7 rounded-full'>{c}</div>} color="secondary" variant="bordered">Mail</DropdownItem>
              <DropdownItem description="List of levels" key="levels" startContent={<KeyboardIcon fill='currentColor' />} color="secondary" variant="bordered">Play</DropdownItem>
            </DropdownSection>
            <DropdownSection title={"Danger zone"}>
              <DropdownItem description="Exit from application" key="exit" startContent={<ExitIcon fill='currentColor' />} color="danger" variant="bordered">Exit</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </Badge >
    </div >
  )
}
