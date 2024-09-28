"use client";

import { useEffect, useState } from 'react';
import { claimStageAtom } from '../lib/state';
import { useAtom } from 'jotai';
import InfoHelper from '../components/Buttons/InfoHelper';

const insuranceCompanies = [
	"State Farm",
	"Geico",
	"Progressive",
	"Allstate",
	"USAA",
	"Liberty Mutual",
	"Farmers",
	"Nationwide",
	"Travelers",
	"American Family",
	"Other"
];

function Stage1() {
	const [stage, setStage] = useAtom(claimStageAtom);

	const [otherParty, setOtherParty] = useState(false);
	const [otherPartyDesc, setOtherPartyDesc] = useState('');

	const [injured, setInjured] = useState(false);
	const [injuryDesc, setInjuryDesc] = useState('');

	const [policeReport, setPoliceReport] = useState(false);

	const [insuranceCompany, setInsuranceCompany] = useState('');

	const [otherComments, setOtherComments] = useState('');

	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
		if ((otherParty ? otherPartyDesc : true)
			&& (injured ? injuryDesc : true)
			&& insuranceCompany) {
			setCanContinue(true);
		} else {
			setCanContinue(false);
		}
	}, [otherParty, otherPartyDesc, injured, injuryDesc, policeReport, insuranceCompany]);

	return <div className='flex w-full flex-col gap-8 p-4 mb-[40%]'>
		<div className='flex justify-between'>
			<p className='text-2xl font-bold'>Incident Information</p>
			<p className='badge'><strong>Step 1/4</strong></p>
		</div>

		<h2>It looks like you were involved in an auto incident. Let’s guide you through the necessary steps to handle the situation.</h2>

		<div className="form-control gap-2">
			<div>
				<label className="label cursor-pointer">
					<span className="label-text">
						<i>
							Was there another party involved in the incident?
						</i>
					</span>
					<input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setOtherParty(e.target.checked)} />
				</label>

				{otherParty && <textarea className="textarea w-full" placeholder="Please input any insurance identification information" onChange={(e) => setOtherPartyDesc(e.target.value)}></textarea>}
			</div>

			<div>
				<label className="label cursor-pointer">
					<span className="label-text">
						<i>
							Have you sustained any injuries from the incident?
						</i>
					</span>
					<input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setInjured(e.target.checked)} />
				</label>

				{injured && <textarea className="textarea w-full" placeholder="Please describe your injury" onChange={(e) => setInjuryDesc(e.target.value)}></textarea>}
			</div>

			<div>
				<label className="label">
					<span className="label-text">
						<i>
							Was a police report filed?
						</i>
					</span>
					<input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setPoliceReport(e.target.checked)} />
				</label>
			</div>

			<div>
				<label className="label">
					<span className="label-text">
						<i>
							Which insurance company are you filing a claim with?
						</i>
					</span>
					
				</label>
				<select className="select select-bordered w-full" onChange={(e) => setInsuranceCompany(e.target.value)}>
						<option value=''>Select an option</option>
						{insuranceCompanies.map((company) => <option key={company} value={company}>{company}</option>)}
					</select>
			</div>

			<div>
				<label className="label">
					<span className="label-text">
						<i>
							Any other comments?
						</i>
					</span>
				</label>

				<textarea className="textarea w-full" placeholder="Please provide any additional information" onChange={(e) => setOtherComments(e.target.value)}></textarea>
			</div>

			<button className={`btn btn-primary ${canContinue ? '' : 'btn-disabled'}`} disabled={!canContinue} onClick={() => setStage(2)}>Continue</button>
		</div>
	</div>
}

function Stage2() {


	return (<div className='flex w-full flex-col gap-8 p-4 mb-[40%]'>
		<div className='flex justify-between'>
			<p className='text-2xl font-bold'>Vehicle Information</p>
			<p className='badge'><strong>Step 2/4</strong></p>
		</div>

		<h2>Now we need some information about your vehicle.</h2>



	</div>)
}

export default function ClaimPage() {
	const [stage, setStage] = useAtom(claimStageAtom);

	return <>
		<div className='w-full px-4 py-10 rounded-md flex-1 flex justify-center'>
			<div className='max-w-[30rem] flex flex-col justify-center'>
				{stage === 1 ? <Stage1 /> : null}
				{stage === 2 && <Stage2 />}
			</div>
		</div>
	</>
}