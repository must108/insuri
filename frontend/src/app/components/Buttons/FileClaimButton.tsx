'use client';

import { claimStageAtom } from "@/app/lib/state";
import { useAtom } from "jotai";
import Link from "next/link";

export default function FileClaimButton({ small }: { small?: boolean }) {
	const [stage, setStage] = useAtom(claimStageAtom);
 
	return (<Link href="/claim" onClick={() => setStage(1)}>
		<button className={"btn btn-wide " + (small ? 'w-[12rem]' : '')}>
			File a claim
		</button>
	</Link>);
}