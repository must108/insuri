'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

function LinkButton({ link, label, icon }: { link: string, label: string, icon: string }) {
	return (
		<Link href={link}>
			<div className="flex items-center gap-2 hover:opacity-60 text-md">
				<Icon icon={icon} className="block md:hidden" />
				<p>{label}</p>
			</div>
		</Link>
	);
}

export default function Navbar() {
	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<div className="fixed w-full h-16 bg-[--background] flex">
					<div className="flex flex-row flex-1 max-w-5xl mx-auto p-2\4 justify-between px-4 sm:px-8 md:px-16 items-center">
						<Link href="/">
							<Image src="/logo.svg" alt="Logo" width={80} height={80} />
						</Link>

						<div className="hidden md:flex flex-row gap-4 items-center">
							<LinkButton link="/learn" label="Learn" icon="mdi:book-open-variant-outline" />
							<LinkButton link="/terms" label="Terms" icon="mdi:file-document-outline" />
							<LinkButton link="/my-claims" label="My Claims" icon="mdi:car" />
							<LinkButton link="/about" label="About" icon="mdi:info" />
						</div>

						<div className="md:hidden flex items-center ">
							<label htmlFor="my-drawer" className="drawer-button">
								<Icon icon="mdi:menu" className="h-8 w-8" />
							</label>
						</div>

						<div className="hidden md:block">
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<div className="block ml-8">
									<UserButton>
										<UserButton.UserProfilePage label="account" />
									</UserButton>
								</div>
							</SignedIn>
						</div>
					</div>
				</div>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					<li><LinkButton link="/learn" label="Learn" icon="mdi:book-open-variant-outline" /></li>
					<li><LinkButton link="/terms" label="Terms" icon="mdi:file-document-outline" /></li>
					<li><LinkButton link="/my-claims" label="My Claims" icon="mdi:car" /></li>
					<li><LinkButton link="/about" label="About" icon="mdi:info" /></li>
					<SignedOut>
						<li><SignInButton /></li>
					</SignedOut>
					<SignedIn>
						<li>
							<UserButton>
								<UserButton.UserProfilePage label="account" />
							</UserButton>
						</li>
					</SignedIn>
				</ul>
			</div>
		</div>
	);
}