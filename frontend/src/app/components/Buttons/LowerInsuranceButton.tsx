import Link from "next/link";

export default function LowerInsuranceButton({ small }: { small?: boolean }) {
	return (<Link href="/learn/lower-insurance-info">
		<button className={"btn btn-wide btn-outline btn-primary" + (small ? 'w-[12rem]' : '')}>
			Lower Insurance
		</button>
	</Link>);
}