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

type SingleClaim = Claim & { statusTimeline: ClaimStatus[] };
type ClaimsData = SingleClaim[];

const ClaimCard = ({ claim }: { claim: Claim }) => {
	return (
		<div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full">
			<div className="flex flex-col md:flex-row justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Claim ID: {claim.id}</h2>
				<p className="text-sm text-gray-500">Filed at: {new Date(claim.filed_at).toLocaleDateString()}</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h3 className="text-lg font-semibold">Insurance Details</h3>
					<p><strong>Company:</strong> {claim.insurance_company || 'N/A'}</p>
					<p><strong>Premium Cost:</strong> ${claim.premium_cost}</p>
					<p><strong>Deductible:</strong> ${claim.deductible || 'N/A'}</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Car Details</h3>
					<p><strong>Make:</strong> {claim.car_make}</p>
					<p><strong>Model:</strong> {claim.car_model}</p>
					<p><strong>Year:</strong> {claim.car_year}</p>
					<p><strong>Mileage:</strong> {claim.car_mileage} miles</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold">AI Generated Data</h3>
					<p><strong>Claim Amount:</strong> ${claim.claim_amount}</p>
					<p><strong>Deductible Amount:</strong> ${claim.deductible_amount}</p>
					<p><strong>Monthly Premium Increase:</strong> ${claim.monthly_premium_increase}</p>
					<p><strong>Repair Cost:</strong> ${claim.repair_cost}</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Additional Information</h3>
					<p><strong>Other Party Involved:</strong> {claim.otherParty ? 'Yes' : 'No'}</p>
					{claim.otherParty && <p><strong>Description:</strong> {claim.otherPartyDescription || 'N/A'}</p>}
					<p><strong>Injured:</strong> {claim.injured ? 'Yes' : 'No'}</p>
					{claim.injured && <p><strong>Description:</strong> {claim.injuredDescription || 'N/A'}</p>}
					<p><strong>Police Report:</strong> {claim.policeReport ? 'Yes' : 'No'}</p>
					<p><strong>Other Comments:</strong> {claim.otherComments || 'N/A'}</p>
				</div>
			</div>
		</div>
	);
};

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

				{(!isLoading && !data?.data && !error) && <div className="flex-1 opacity-50 flex flex-col items-center justify-center gap-4 select-none">
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
						return <ClaimCard key={claim.id} claim={claim} />
					})}
				</div>}
			</div>


		</SignedIn>
	</div>)
}