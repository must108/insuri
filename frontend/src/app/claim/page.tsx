"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { claimDataAtom, claimStageAtom } from '../lib/state';
import { useAtom } from 'jotai';
import InfoHelper from '../components/Buttons/InfoHelper';
import { Icon } from '@iconify/react';
import { carMakes, insuranceCompanies } from '../lib/consts';
import Link from 'next/link';

import axios from 'axios';
import { CreateClaimResponse } from '../api/claim/route';

function Stage1() {
	const [stage, setStage] = useAtom(claimStageAtom);
	const [claimData, setClaimData] = useAtom(claimDataAtom);

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
	}, [otherParty, otherPartyDesc, injured, injuryDesc, insuranceCompany]);

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		// Save the data
		setClaimData({
			...claimData,
			otherParty: otherParty,
			otherPartyDescription: otherPartyDesc,
			injured: injured,
			injuredDescription: injuryDesc,
			policeReport: policeReport,
			insuranceCompany: insuranceCompany,
			otherComments: otherComments,
		});

		// Continue to the next stage
		setStage(2);
	}, [claimData, otherParty, otherPartyDesc, injured, injuryDesc, policeReport, insuranceCompany, otherComments, setClaimData, setStage]);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between'>
				<p className='text-2xl font-bold'>Incident Information</p>
				<p className='badge'><strong>Step 1/5</strong></p>
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
		</div>
	);
}

function Stage2() {
	const [stage, setStage] = useAtom(claimStageAtom);
	const [claimData, setClaimData] = useAtom(claimDataAtom);

	const [carMake, setCarMake] = useState('');
	const [carModel, setCarModel] = useState('');
	const [carYear, setCarYear] = useState(0);
	const [carMilage, setCarMilage] = useState(0); // Miles
	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
		if (carMake && carModel && carYear && carMilage) {
			setCanContinue(true);
		} else {
			setCanContinue(false);
		}
	}, [carMake, carModel, carYear, carMilage]);

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		// Save the data
		setClaimData({
			...claimData,
			carMake,
			carModel,
			carYear,
			carMileage: carMilage,
		});

		// Continue to the next stage
		setStage(3);
	}, [carMake, carModel, carYear, carMilage, claimData, setClaimData, setStage]);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Vehicle Information</p>
				<p className='badge'><strong>Step 2/5</strong></p>
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
						onChange={(e) => setCarYear(parseInt(e.target.value))}
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
						onChange={(e) => setCarMilage(parseInt(e.target.value))}
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
	const [claimData, setClaimData] = useAtom(claimDataAtom);

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

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		// Save the data
		setClaimData({
			...claimData,
			files: fileInputs.map((input) => input.file).filter((file) => file) as File[],
		});

		setStage(4);
	}, [fileInputs, claimData, setClaimData, setStage]);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Scene Analysis</p>
				<p className='badge'><strong>Step 3/5</strong></p>
			</div>

			<h2>Upload up to 5 images of your vehicle so we can better understand the incident.</h2>

			<div className='flex justify-between'>
				<p>Images ({fileInputs.length}/5)</p>
				<button onClick={addImage} disabled={fileInputs.length >= 5}>
					<Icon icon="mdi:add-circle-outline" opacity={fileInputs.length >= 5 ? 0.3 : 1} />
				</button>
			</div>
			<form className="form-control gap-2" onSubmit={handleSubmit}>
				{fileInputs.map((input) => (
					<div key={input.key} className='flex gap-2'>
						<input type="file" accept="image/*" onChange={(e) => fileInputChanged(e.target.files, input.key)} className="file-input w-full file-input-sm" />

						<button
							type="button"
							onClick={() => deleteInput(input.key)}
						>
							<Icon icon="mdi:trash-outline" />
						</button>
					</div>
				))}

				<button type="submit" className="btn btn-primary mt-6" disabled={validImages === 0}>Continue</button>
			</form>
		</div>
	);
}

function Stage4() {
	const [stage, setStage] = useAtom(claimStageAtom);
	const [claimData, setClaimData] = useAtom(claimDataAtom);

	const [age, setAge] = useState(0);
	const [gender, setGender] = useState('');
	const [address, setAddress] = useState('');
	const [deductible, setDeductible] = useState(0);
	const [premium, setPremium] = useState(0);

	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
		if (age > 0 && gender && address && deductible > 0 && premium > 0) {
			setCanContinue(true);
		} else {
			setCanContinue(false);
		}
	}, [age, gender, address, deductible, premium]);

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		// Save the data
		setClaimData({
			...claimData,
			age,
			gender,
			address,
			deductible,
			premium,
		});

		// Continue to the next stage
		setStage(5);
	}, [age, gender, address, deductible, premium, claimData, setClaimData, setStage]);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Additional Information</p>
				<p className='badge'><strong>Step 4/5</strong></p>
			</div>

			<h2>Please provide some additional information to complete your claim.</h2>

			<form className="form-control gap-2" onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is your age?</i>
						</span>
					</label>
					<input
						type="number"
						className="input input-bordered"
						placeholder="Age"
						onChange={(e) => setAge(parseInt(e.target.value))}
						required
					/>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is your gender?</i>
						</span>
					</label>
					<select
						className="select select-bordered w-full"
						onChange={(e) => setGender(e.target.value)}
						required
					>
						<option value=''>Select an option</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is your address?</i>
						</span>
					</label>
					<input
						type="text"
						className="input input-bordered"
						placeholder="Address"
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>


				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is your deductible?</i>
						</span>
					</label>
					<input
						type="number"
						className="input input-bordered"
						placeholder="Deductible"
						onChange={(e) => setDeductible(parseInt(e.target.value))}
						required
					/>
				</div>

				<div className='flex flex-col'>
					<label className="label">
						<span className="label-text">
							<i>What is your premium?</i>
						</span>
					</label>
					<input
						type="number"
						className="input input-bordered"
						placeholder="Premium"
						onChange={(e) => setPremium(parseInt(e.target.value))}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary mt-6" disabled={!canContinue}>Continue</button>
			</form>
		</div>
	);
}

function Stage5() {
	const [stage, setStage] = useAtom(claimStageAtom);
	const [claimData, setClaimData] = useAtom(claimDataAtom);
	// 0 = Not started, 1 = Processing, 2 = Done, 3 = Error
	const [processingState, setProcessingState] = useState(0);
	const hasStartedProcessing = useRef(false);

	type AIResponse = {
		claim_amount: number;
		deductible_amount: number;
		monthly_premium_increase: number;
		repair_cost: number;
	} | null;


	const [airesponse, setAiResponse] = useState<AIResponse>(null);
	const [dbresponse, setDbResponse] = useState<CreateClaimResponse | null>(null);

	// On mount, start processing
	useEffect(() => {
		if (hasStartedProcessing.current) return;
		if (stage !== 5) return;
		if (processingState !== 0) return;
		hasStartedProcessing.current = true;
		setProcessingState(1);

		(async () => {
			const formData = new FormData();
			formData.append('age', claimData.age.toString());
			formData.append('gender', claimData.gender);
			formData.append('address', claimData.address);
			formData.append('make', claimData.carMake);
			formData.append('model', claimData.carModel);
			formData.append('year', claimData.carYear.toString());
			formData.append('mileage', claimData.carMileage.toString());
			formData.append('insurance_company', claimData.insuranceCompany);
			formData.append('deductible', claimData.deductible.toString());
			formData.append('premium', claimData.premium.toString());
			formData.append('claims', '0');
			formData.append("police", claimData.policeReport.toString());
			formData.append("injured", claimData.injured.toString());


			// Upload images
			claimData.files.forEach((file, _) => {
				formData.append("files", file);
			});

			axios.post("https://insurify-backend-production.up.railway.app/detect_damage", formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then((response) => {
				setAiResponse(response.data);

				// Append AI response to formData
				if (response.data) {
					formData.append('claim_amount', response.data.claim_amount.toString());
					formData.append('deductible_amount', response.data.deductible_amount.toString());
					formData.append('monthly_premium_increase', response.data.monthly_premium_increase.toString());
					formData.append('repair_cost', response.data.repair_cost.toString());
				} else {
					setProcessingState(3);
					console.error("AI response not found");
					return;
				}

				axios.post("/api/claim", formData).then((response) => {
					setDbResponse(response.data);
					setProcessingState(2);
				}).catch((error) => {
					console.error(error);
					setProcessingState(3);
				});
			}).catch((error) => {
				console.error(error);
				setProcessingState(3);
			});
		})();
	}, [stage, processingState, claimData]);

	return (
		<div className='flex max-w-[30rem] w-full flex-col gap-8 p-4 mb-[10%] border rounded-lg'>
			<div className='flex justify-between w-full'>
				<p className='text-2xl font-bold'>Processing Claim Data</p>
				<p className='badge'><strong>Step 5/5</strong></p>
			</div>

			<h2>
				Thank you for submitting your claim. We are now processing your information and generating a report. Your claim will be filed with your insurance provider shortly.
			</h2>

			{processingState <= 1 && <span className="loading loading-dots loading-md"></span>}

			{processingState === 2 && (
				<>
					<div>
						<h2>AI Generated Data</h2>
						{airesponse && (
							<div className="grid grid-cols-2">
								<div className="stat">
									<div className="stat-title">Claim Amount</div>
									<div className="stat-value">${airesponse.claim_amount}</div>
								</div>
								<div className="stat">
									<div className="stat-title">Deductible Amount</div>
									<div className="stat-value">${airesponse.deductible_amount}</div>
								</div>
								<div className="stat">
									<div className="stat-title">Monthly Premium Increase</div>
									<div className="stat-value">${airesponse.monthly_premium_increase}</div>
								</div>
								<div className="stat">
									<div className="stat-title">Repair Cost</div>
									<div className="stat-value">${airesponse.repair_cost}</div>
								</div>
							</div>
						)}
					</div>

					<div className='flex justify-end'>
						<Link href='/my-claims'><button className='btn btn-link'>View All Claims</button></Link>
					</div>
				</>
			)
			}

			{
				processingState === 3 && (
					<>
						<p>There was an error processing your claim. Please try again.</p>
						<div>
						<button onClick={() => {
							setProcessingState(0);
							hasStartedProcessing.current = false;
						}}>Try again</button>

						<button onClick={() => {
							setStage(1);
							setProcessingState(0);
							hasStartedProcessing.current = false;
						}}>Restart Claim</button>
						</div>
						
					</>
				)
			}
		</div >
	);
}

export default function ClaimPage() {
	const [stage, setStage] = useAtom(claimStageAtom);

	return <>
		<div className='w-full px-4 py-10 rounded-md flex-1 flex justify-center items-center'>
			{stage === 1 && <Stage1 />}
			{stage === 2 && <Stage2 />}
			{stage === 3 && <Stage3 />}
			{stage === 4 && <Stage4 />}
			{stage === 5 && <Stage5 />}
		</div>
	</>
}