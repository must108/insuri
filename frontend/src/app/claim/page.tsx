"use client";

import { useState } from 'react';

function Stage1() {
	return <div className='flex flex-col gap-8 p-4'>
		<p className='text-2xl'><strong>Step 1</strong></p>

		<h2>It looks like you were involved in an auto incident. Let’s guide you through the necessary steps to handle the situation.</h2>


		<h2>
			First, safety is the priority. Have you contacted the proper authorities, like the police or medical services?
		</h2>

		<div className='flex flex-row gap-2'>
			<button className='btn flex-1 btn-success'>Yes</button>
			<button className='btn flex-1 btn-error'>No</button>
		</div>
	</div>
}

export default function ClaimPage() {
	return <>
		<div className='w-full px-4 py-10 rounded-md flex-1 flex justify-center'>
			<div className='max-w-[25rem]'>
				<Stage1 />

			</div>
		</div>
	</>
}