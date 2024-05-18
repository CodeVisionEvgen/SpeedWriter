"use client"

import React, { useEffect, useState } from 'react'
import logo from "@/public/favicon.ico"
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem
} from "@nextui-org/navbar";
import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { useRouter } from 'next/navigation';
import { UserTumb } from './user';
import { ignoreStackUrlComponents } from "@/consts/ignore";
import { usePathname } from "next/navigation";
import { GetUser } from '@/app/actions/User';
import { UserType } from '@/types';
import { getCookie } from 'cookies-next';

export default function AppNavbar() {
	const pathname = usePathname();
	const router = useRouter();
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		if (getCookie("AccessToken")) {
			GetUser().then((data: any) => {
				setUser(data);
			})
		}
	}, [])

	function handleActive(url: string = "/") {
		return pathname === url || false;
	}

	return (
		<>
			{
				ignoreStackUrlComponents.includes(pathname) ? "" :

					<Navbar classNames={{
						item: [
							"flex",
							"relative",
							"h-full",
							"items-center",
							"data-[active=true]:after:content-['']",
							"data-[active=true]:after:absolute",
							"data-[active=true]:after:bottom-0",
							"data-[active=true]:after:left-0",
							"data-[active=true]:after:right-0",
							"data-[active=true]:after:h-[2px]",
							"data-[active=true]:after:rounded-[2px]",
							"data-[active=true]:after:bg-primary",
						],
					}}>
						<NavbarBrand onClick={() => router.push('/')} className=' cursor-pointer'>
							<Image className='remove-image-drag' draggable="false" unoptimized src={logo} width={40} alt='logo' height={40} />
							<Spacer />
							<h3 className=' text-2xl flex items-end select-none'>SpeedWriter</h3>
						</NavbarBrand>
						<NavbarContent className="hidden sm:flex gap-4" justify="center">
							<NavbarItem isActive={handleActive('/')}>
								<Link className=' cursor-pointer' onClick={() => router.push('/')} color="foreground">
									Main
								</Link>
							</NavbarItem>
							<NavbarItem className=' cursor-pointer' isActive={handleActive('/help')}>
								<Link onClick={() => router.push('/help')} color="foreground">
									Help
								</Link>
							</NavbarItem>
							<NavbarItem className=' cursor-pointer' isActive={handleActive('/about')}>
								<Link onClick={() => router.push('/about')} color="foreground">
									About
								</Link>
							</NavbarItem>
						</NavbarContent>
						<NavbarContent justify="end">
							{
								user ?
									<NavbarItem>
										<UserTumb src={user?.UserPicture || ""} />
									</NavbarItem>
									:
									<>
										<NavbarItem>
											<Button onClick={() => router.push('auth')} color="primary" href="auth" variant="flat">
												Signup
											</Button>
										</NavbarItem>
									</>
							}
						</NavbarContent>
					</Navbar>
			}</>
	)
}
