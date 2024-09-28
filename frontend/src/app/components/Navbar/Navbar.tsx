import Image from "next/image";
import Link from "next/link";

function LinkButton({ link, label }: { link: string, label: string }) {
	return <Link href={link}>
		<p className="hover:opacity-60">{label}</p>
	</Link>
}

export default function Navbar() {
	return <>
		<div className="fixed w-full h-20 bg-[--background] flex">
			<div className="flex flex-row flex-1 max-w-5xl mx-auto p-4 justify-evenly">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={80} height={80} />
				</Link>

				<div className="flex flex-row gap-4 items-center">
					<LinkButton link="/about" label="About" />
					<LinkButton link="/terms" label="Terms" />
					<LinkButton link="/myclaims" label="My Claims" />
				</div>

				<button className="btn">Login</button>
			</div>
		</div>
	</>
}