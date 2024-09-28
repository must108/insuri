"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { claimStageAtom } from '../lib/state';
import { useAtom } from 'jotai';
import InfoHelper from '../components/Buttons/InfoHelper';
import { Icon } from '@iconify/react';
import { carMakes, insuranceCompanies } from '../lib/consts';

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log({ otherParty, otherPartyDesc, injured, injuryDesc, policeReport, insuranceCompany, otherComments });

		// Continue to the next stage
		setStage(2);
	}

	return (<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
		<div className='flex justify-between'>
			<p className='text-2xl font-bold'>Incident Information</p>
			<p className='badge'><strong>Step 1/4</strong></p>
		</div>

		<h2>It looks like you were involved in an auto incident. Let’s guide you through the necessary steps to handle the situation.</h2>

		<form className="form-control gap-2" onSubmit={handleSubmit}>
			<div>
				<label className="label cursor-pointer">
					<span className="label-text">
						<i>
							Was there another party involved in the incident?
						</i>
					</span>
					<input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setOtherParty(e.target.checked)} />
				</label>

				{otherParty && <textarea className="textarea w-full" placeholder="Please input any insurance identification information about the other party" onChange={(e) => setOtherPartyDesc(e.target.value)}></textarea>}
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

			<button type='submit' className={"btn btn-primary"} disabled={!canContinue}>Continue</button>
		</form>
	</div>);
}

function Stage2() {
	const [stage, setStage] = useAtom(claimStageAtom);

	const [carMake, setCarMake] = useState('');
	const [carModel, setCarModel] = useState('');
	const [carYear, setCarYear] = useState('');
	const [carMilage, setCarMilage] = useState(''); // Miles
	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
		if (carMake && carModel && carYear && carMilage) {
			setCanContinue(true);
		} else {
			setCanContinue(false);
		}
	}, [carMake, carModel, carYear, carMilage]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log({ carMake, carModel, carYear, carMilage });

		setStage(3);
	};

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Vehicle Information</p>
				<p className='badge'><strong>Step 2/4</strong></p>
			</div>

			<h2>Now we need some information about your vehicle.</h2>

			<form className="form-control gap-2" onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is the make of your vehicle?</i>
						</span>

					</label>
					<select
						className="select select-bordered w-full"
						onChange={(e) => setCarMake(e.target.value)}
						required
					>
						<option value=''>Select an option</option>
						{carMakes.map((make) => (
							<option key={make} value={make}>{make}</option>
						))}
					</select>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is the model of your vehicle?</i>
						</span>

					</label>
					<input
						type="text"
						className="input input-bordered"
						placeholder="Model"
						onChange={(e) => setCarModel(e.target.value)}
						required
					/>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is the year of your vehicle?</i>
						</span>

					</label>
					<input
						type="number"
						className="input input-bordered"
						placeholder="Year"
						onChange={(e) => setCarYear(e.target.value)}
						required
					/>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is the mileage of your vehicle? (mi)</i>
						</span>

					</label>
					<input
						type="number"
						className="input input-bordered"
						placeholder="Mileage"
						onChange={(e) => setCarMilage(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary mt-6" disabled={!canContinue}>Continue</button>
			</form>
		</div>
	);
}

function Stage3() {
	const [stage, setStage] = useAtom(claimStageAtom);
	interface FileInput {
		file: File | null;
		key: string;
	}

	const [fileInputs, setFileInputs] = useState<FileInput[]>([
		{ file: null, key: '1' },
	]);

	const validImages = useMemo(() => fileInputs.filter((input) => input.file).length, [fileInputs]);

	const addImage = useCallback(() => {
		if (fileInputs.length >= 5) return;
		setFileInputs([...fileInputs, { file: null, key: `${Math.random()}` }]);
	}, [fileInputs]);

	const deleteInput = useCallback((key: string) => {
		setFileInputs(fileInputs.filter((input) => input.key !== key));
	}, [fileInputs]);

	const fileInputChanged = useCallback((files: FileList | null, key: string) => {
		if (!files || !files.length) return;
		const file = files[0];

		setFileInputs(fileInputs.map((input) => input.key === key ? { ...input, file } : input));
	}, [fileInputs]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log(fileInputs);

		setStage(4);
	}

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Scene Analysis</p>
				<p className='badge'><strong>Step 3/4</strong></p>
			</div>

			<h2>Upload up to 5 images of your vehicle so we can better understand the incident.</h2>

			<div className='flex justify-between'>
				<p>Images ({fileInputs.length}/5)</p>
				<button onClick={addImage} disabled={fileInputs.length >= 5}>
					<Icon icon="mdi:add-circle-outline" opacity={fileInputs.length >= 5 ? 0.3 : 1} />
				</button>
			</div>
			<form className="form-control gap-2" onSubmit={handleSubmit}>
				{fileInputs.map((input, index) => (
					<div key={input.key} className='flex gap-2'>
						<input type="file" accept="image/*" onChange={(e) => fileInputChanged(e.target.files, input.key)} className="file-input w-full file-input-sm" />

						<button
							onClick={() => deleteInput(input.key)}
						>
							<Icon icon="mdi:trash-outline" />
						</button>
					</div>
				))}

				<button type="submit" className="btn btn-primary mt-6" disabled={validImages == 0}>Continue</button>
			</form>
		</div>
	);
}

function Stage4() {
	// 0 = Not started, 1 = Processing, 2 = Done
	const [processingState, setProcessingState] = useState(0);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Processing Claim Data</p>
				<p className='badge'><strong>Step 4/4</strong></p>
			</div>

			<h2>Thank you for submitting your claim. We are now processing your information and generating a report.</h2>

			{processingState <= 1 && <span className="loading loading-dots loading-md"></span>}
			{processingState === 2 && <p>Claim submitted!</p>}
		</div>
	)
}

export default function ClaimPage() {
	const [stage, setStage] = useAtom(claimStageAtom);

	return <>
		<div className='w-full px-4 py-10 rounded-md flex-1 flex justify-center items-center'>
			{stage === 1 && <Stage1 />}
			{stage === 2 && <Stage2 />}
			{stage === 3 && <Stage3 />}
			{stage === 4 && <Stage4 />}
		</div>
	</>
}