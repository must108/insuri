import Link from "next/link";

export default function FileClaimButton({ small }: { small?: boolean}) {
	return (<button className={"btn btn-wide " + (small ? 'w-[12rem]' : '')}>
		<Link href="/claim">File a claim</Link>
	</button>);
}