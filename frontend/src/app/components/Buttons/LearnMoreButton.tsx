import Link from "next/link";

export default function LearnMoreButton({ small }: { small?: boolean }) {
	return (<Link href="/learn">
		<button className={"btn btn-wide btn-outline btn-primary" + (small ? 'w-[12rem]' : '')}>
			Learn About Insurance
		</button>
	</Link>);
}