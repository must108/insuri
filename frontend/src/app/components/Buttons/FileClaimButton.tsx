import Link from "next/link";

export default function FileClaimButton({ small }: { small?: boolean }) {
	return (<Link href="/claim">
		<button className={"btn btn-wide " + (small ? 'w-[12rem]' : '')}>
			File a claim
		</button>
	</Link>);
}