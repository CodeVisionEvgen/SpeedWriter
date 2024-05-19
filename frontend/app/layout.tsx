import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/navbar";
import clsx from "clsx";
import Gradient from "@/components/gradient";
import NotificationCard from "@/components/notification/NotificationCard";


export const metadata: Metadata = {
	title: {
		default: "SpeedWriter",
		template: `SpeedWriter`,
	},
	description: "SpeedWriter - a game.",
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className="dark" lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					"font-sans"
				)}
			>
				<Providers>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							<Gradient />
							{children}
						</main>
						<div className=" absolute bottom-8 right-6">
							<NotificationCard />
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
