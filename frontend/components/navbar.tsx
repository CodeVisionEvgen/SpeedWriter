"use client"

import React from 'react'
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

export default function AppNavbar() {
	const pathname = usePathname();
	const router = useRouter();

	function RouterToMainPage() {
		router.push('/')
	}

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
							<NavbarItem>
								<UserTumb src="https://api.dicebear.com/8.x/bottts/svg?seed=Tigger" />
							</NavbarItem>
							{/* <NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem> */}
						</NavbarContent>
					</Navbar>
			}</>
	)
}
