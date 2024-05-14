import { Avatar } from '@nextui-org/avatar'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { ExitIcon, PersonIcon, KeyboardIcon, NotificationIcon, MoreIcon, MailIcon } from './icons';
import { Badge } from "@nextui-org/badge"
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const UserTumb = ({ src }: { src: string }) => {
  const router = useRouter();
  return (
    <div className='flex gap-4 rounded-sm'>
      <Badge size='sm' content={10} isInvisible={false} shape="rectangle" color='danger'>
        <Dropdown>
          <DropdownTrigger>
            <Avatar className=' cursor-pointer' size="md" src={src} alt={"Account"} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection title={"Actions"}>
              <DropdownItem onClick={() => { router.push("account") }} description="Your profile" key="account" startContent={<PersonIcon width={28} fill='currentColor' />} color="secondary" variant="bordered">My Account</DropdownItem>
              <DropdownItem onClick={() => { router.push("account?state=mail") }} description="Messages" key="messages" startContent={<MailIcon width={28} fill='currentColor' />} endContent={<div className=' w-7 rounded-full'>{10}</div>} color="secondary" variant="bordered">Mail</DropdownItem>
              <DropdownItem onClick={() => { router.push("levels") }} description="List of levels" key="levels" startContent={<KeyboardIcon fill='currentColor' />} color="secondary" variant="bordered">Play</DropdownItem>
            </DropdownSection>
            <DropdownSection title={"Danger zone"}>
              <DropdownItem onClick={() => {
                axios.get('/api/auth/logout').then(() => {
                  window.location.replace('/')
                })
              }} description="Exit from application" key="exit" startContent={<ExitIcon fill='currentColor' />} color="danger" variant="bordered">Exit</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </Badge >
    </div >
  )
}
// Un2YYawpdbyELukZ
