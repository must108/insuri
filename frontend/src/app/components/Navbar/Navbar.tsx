'use client';
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

function LinkButton({ link, label, icon, onClick }: { link: string, label: string, icon: string, onClick: () => void }) {
    return (
        <Link href={link} onClick={onClick}>
            <div className="flex items-center gap-2 hover:opacity-60 text-md">
                <Icon icon={icon} className="block md:hidden" />
                <p>{label}</p>
            </div>
        </Link>
    );
}

export default function Navbar() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
            <div className="drawer-content">
                <div className="fixed w-full h-16 bg-[--background] flex">
                    <div className="flex flex-row flex-1 max-w-5xl mx-auto p-2\4 justify-between px-4 sm:px-8 md:px-16 items-center">
                        <Link href="/">
                            <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                        </Link>

                        <div className="hidden md:flex flex-row gap-4 items-center">
                            <LinkButton link="/learn" label="Learn" icon="mdi:book-open-variant-outline" onClick={closeDrawer} />
                            <LinkButton link="/terms" label="Terms" icon="mdi:file-document-outline" onClick={closeDrawer} />
                            <LinkButton link="/my-claims" label="My Claims" icon="mdi:car" onClick={closeDrawer} />
                            <LinkButton link="/about" label="About" icon="mdi:info" onClick={closeDrawer} />
                        </div>

                        <div className="md:hidden flex items-center">
                            <label htmlFor="my-drawer" className="drawer-button" onClick={toggleDrawer}>
                                <Icon icon="mdi:menu" className="h-8 w-8 hover:cursor-pointer" />
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
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={closeDrawer}></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="p-2" onClick={closeDrawer}>
                            <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                        </Link>
                        <SignedOut>
                            <li><SignInButton /></li>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex flex-row gap-2 items-center p-2">
                                {user?.fullName || user?.username}
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                    {isOpen && (
                        <>
                            <motion.li
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <LinkButton link="/learn" label="Learn" icon="mdi:book-open-variant-outline" onClick={closeDrawer} />
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <LinkButton link="/terms" label="Terms" icon="mdi:file-document-outline" onClick={closeDrawer} />
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <LinkButton link="/my-claims" label="My Claims" icon="mdi:car" onClick={closeDrawer} />
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <LinkButton link="/about" label="About" icon="mdi:info" onClick={closeDrawer} />
                            </motion.li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}