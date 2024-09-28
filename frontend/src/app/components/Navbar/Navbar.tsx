import Image from "next/image";

export default function Navbar() {
	return <>
		<div className="static w-full h-20 bg-[--background]">
			<Image src="/logo.svg" alt="Logo" width={100} height={100} />
		</div>
	</>
}