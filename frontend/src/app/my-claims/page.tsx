import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import FileClaimButton from "../components/Buttons/FileClaimButton";

export default function MyClaimsPage() {

	return (<div className="w-full px-4 py-10 rounded-md flex-1 flex flex-col items-center max-w-5xl mx-auto">
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
				<div className="flex flex-row justify-between">
					<div>
						<p className="text-2xl">My Claims</p>
						<p>
							Your car incident claim status and history will be displayed here.
						</p>
					</div>
					<FileClaimButton small />
				</div>

			</div>
		</SignedIn>
	</div>)
}