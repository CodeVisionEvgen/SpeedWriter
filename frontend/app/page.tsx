"use client"
import Image from "next/image";
import { motion as Motion } from "framer-motion"
import slide1 from "@/public/slider/slide1.png"
import slide2 from "@/public/slider/slide2.png"
import slide3 from "@/public/slider/slide3.png"
import { useEffect, useState } from "react";
const MonitionVariantsImages = {
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: 'easeOut',
			duration: 1
		}
	},
	hide: {
		y: -30,
		opacity: 0
	}
}

export default function Home() {
	const [slide, setSlide] = useState<number>(1);
	useEffect(() => {
		setTimeout(() => {
			setSlide((sli) => sli == 3 ? (sli = 1) : (sli + 1));
		}, 7000)
	}, [slide])
	return (
		<div className="!w-screen !bg-black !z-10">
			<div className="flex">
				<h3 className=" text-[35px] z-1 break-words max-w-[500px]">
					The game about your <p className=" from-purple-500 inline text-transparent bg-clip-text to-pink-700 bg-gradient-to-t">typing</p> speed.
				</h3>
				{slide == 1 && <Motion.div animate={'show'} initial="hide" variants={MonitionVariantsImages}>
					<Image className="rounded-lg z-10" src={slide1} unoptimized alt="slide1" width={1000} height={900} />
				</Motion.div>}
				{slide == 2 && <Motion.div animate={'show'} initial="hide" variants={MonitionVariantsImages}>
					<Image className="rounded-lg z-10" src={slide2} unoptimized alt="slide2" width={1000} height={900} />
				</Motion.div>}
				{slide == 3 && <Motion.div animate={'show'} initial="hide" variants={MonitionVariantsImages}>
					<Image className="rounded-lg z-10" src={slide3} unoptimized alt="slide2" width={1000} height={900} />
				</Motion.div>}
			</div>
		</div>
	);
}
