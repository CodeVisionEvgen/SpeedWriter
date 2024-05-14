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
	function RouterToMainPage() {
		router.push('/')
	}

	useEffect(() => {
		if (getCookie("AccessToken")) {
			GetUser().then((data: any) => {
				setUser(data);
			})
		}
	}, [])

	return (
		<>
			{
				ignoreStackUrlComponents.includes(pathname) ? "" :

					<Navbar>
						<NavbarBrand onClick={RouterToMainPage} className=' cursor-pointer'>
							<Image className='remove-image-drag' draggable="false" unoptimized src={logo} width={40} alt='logo' height={40} />
							<Spacer />
							<h3 className=' text-2xl flex items-end select-none'>SpeedWriter</h3>
						</NavbarBrand>
						<NavbarContent className="hidden sm:flex gap-4" justify="center">
							<NavbarItem>
								<Link color="foreground" href="top">
									Main
								</Link>
							</NavbarItem>
							<NavbarItem>
								<Link href="levels" color="primary">
									Help
								</Link>
							</NavbarItem>
							<NavbarItem>
								<Link color="foreground" href="about">
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
												Login
											</Button>
										</NavbarItem>
									</>
							}
						</NavbarContent>
					</Navbar>
			}</>
	)
}
