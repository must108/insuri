'use client';

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import FileClaimButton from "../components/Buttons/FileClaimButton";
import useSWR from "swr";
import { Claim, ClaimStatus } from "@prisma/client";

async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}

type ClaimsData = (Claim & { statusTimeline: ClaimStatus[] })[];

export default function MyClaimsPage() {
	const { data, error, isLoading } = useSWR<{ data: ClaimsData }>("/api/claim", fetcher);

	return (<div className="w-full px-8 md:px-16 py-10 rounded-md flex-1 flex flex-col items-center max-w-5xl mx-auto">
		<SignedOut>
			<div className="flex-1 flex flex-col items-center justify-center gap-4 mb-[30%]">
				<div>
					<p className="text-2xl">Unauthorized</p>
					<p>Please sign in to view your claims</p>
				</div>

				<SignInButton>
					<button className="btn btn-sm">Sign in</button>
				</SignInButton>
			</div>
		</SignedOut>
		<SignedIn>
			<div className="flex-1 flex flex-col w-full py-16">
				<div className="flex flex-col gap-2 md:flex-row md:justify-between">
					<div>
						<p className="text-2xl">My Claims</p>
						<p>
							Your car incident claim status and history will be displayed here.
						</p>
					</div>

					<FileClaimButton small />
				</div>

				{(!isLoading && !data?.data) && <div className="flex-1 opacity-50 flex flex-col items-center justify-center gap-4 select-none">
					<p>You have no claims yet.</p>
				</div>}

				{isLoading && <div className="flex-1 opacity-50 flex flex-col items-center justify-center gap-4 select-none">
					<span className="loading loading-dots loading-md"></span>
				</div>}

				{error && <div className="flex-1 opacity-50 flex flex-col items-center justify-center gap-4 select-none">
					<p>Failed to load claims</p>
				</div>}

				{(!isLoading && !error && data) && <div className="flex-1 flex flex-col gap-4 mt-8">
					{data?.data.map((claim: any) => {
						return (<div key={claim.id} className="card bg-base-100 w-full">
							<div className="card-body">
								<div className="flex flex-row justify-between">
									<div>
										<p className="card-title">Claim ID: {claim.id}</p>
										<p className="text-xs">Status: {claim.status}</p>
									</div>
									<div>
										<p className="text-xs">Date: {new Date(claim.createdAt).toLocaleDateString()}</p>
									</div>
								</div>
							</div>
						</div>)
					})}
				</div>}
			</div>


		</SignedIn>
	</div>)
}