import Link from "next/link";

export default function CarAccidentInfoButton({ small }: { small?: boolean }) {
	return (<Link href="/learn/car-accident-info">
		<div className="relative flex w-80 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md" style={{ backgroundColor: 'var(--background)' }}>
			<div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r " style={{ backgroundColor: 'var(--red-light)' }}>
			</div>
			<div className="p-6">
				<h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
				Car Accident Guide
				</h5>
				<p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
				Had a car accident? We’ll guide you through. 
				</p>
			</div>
			<div className="p-6 pt-0">
				<button data-ripple-light="true" type="button" className="select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" style={{ backgroundColor: 'var(--red-light)' }}>
				Read More
				</button>
			</div>
		</div>
	</Link>);
}