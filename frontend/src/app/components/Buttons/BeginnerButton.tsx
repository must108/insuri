import Link from "next/link";

export default function BeginnerButton({ small }: { small?: boolean }) {
	return (<Link href="/learn/beginner-guide">
		<button className={"btn btn-wide btn-outline btn-primary" + (small ? 'w-[12rem]' : '')}>
			Insurance 101
		</button>
	</Link>);
}