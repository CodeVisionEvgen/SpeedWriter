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
import Image from 'next/image';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { useRouter } from 'next/navigation';
export default function AppNavbar() {
	const router = useRouter();

	function RouterToMainPage() {
		router.push('/')
	}

	return (
		<Navbar>
			<NavbarBrand onClick={RouterToMainPage} className=' cursor-pointer'>
				<Image className='remove-image-drag' draggable="false" unoptimized src={logo} width={40} alt='logo' height={40} />
				<Spacer />
				<h3 className=' text-2xl flex items-end select-none'>SpeedWriter</h3>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Top profiles
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Levels
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						About
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}
