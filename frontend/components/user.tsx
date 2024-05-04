import { Avatar } from '@nextui-org/avatar'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { ExitIcon, PersonIcon, KeyboardIcon, NotificationIcon, MoreIcon } from './icons';
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
      <Dropdown backdrop='blur'>
        <Badge content={c} isInvisible={!c} shape="rectangle" color='danger'>
          <DropdownTrigger>
            <Button color={c ? "primary" : "default"}>
              <NotificationIcon fill='currentColor' width={20} />
              Notifications
            </Button>
          </DropdownTrigger>
        </Badge>
        <DropdownMenu aria-label="Notifications">
          <DropdownSection title={"Messages"} showDivider className=' max-h-40 overflow-y-auto'>
            {...renderMessages(messages)}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem key="more" color="primary" endContent={<MoreIcon fill='currentColor' />} variant="bordered">See more</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Avatar className=' cursor-pointer' size="md" src={src} alt={"Account"} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownSection title={"Actions"}>
            <DropdownItem description="Your profile" key="account" startContent={<PersonIcon fill='currentColor' />} color="secondary" variant="bordered">My Account</DropdownItem>
            <DropdownItem description="List of levels" key="levels" startContent={<KeyboardIcon fill='currentColor' />} color="secondary" variant="bordered">Play</DropdownItem>
          </DropdownSection>
          <DropdownSection title={"Danger zone"}>
            <DropdownItem description="Exit from application" key="exit" startContent={<ExitIcon fill='currentColor' />} color="danger" variant="bordered">Exit</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
