import Link from "next/link";

export default function CarAccidentInfoButton({ small }: { small?: boolean }) {
	return (<Link href="/learn/car-accident-info">
		<button className={"btn btn-wide btn-outline btn-primary" + (small ? 'w-[12rem]' : '')}>
			Car Accident
		</button>
	</Link>);
}