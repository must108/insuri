import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const claimStageAtom = atom<1 | 2 | 3 | 4 | 5>(1);

interface ClaimData {
  otherParty: boolean;
  otherPartyDescription: string;
  injured: boolean;
  injuredDescription: string;
  policeReport: boolean;
  insuranceCompany: string;
  otherComments: string;

  // Car data
  carMake: string;
  carModel: string;
  carYear: number;
  carMileage: number;

  // User data
  age: number;
  gender: string;
  address: string;
  deductible: number;
  premium: number;

  // Crash image files
  files: File[];
}

export const claimDataAtom = atomWithStorage<ClaimData>("insurify-claim-data", {
  otherParty: false,
  otherPartyDescription: "",
  injured: false,
  injuredDescription: "",
  policeReport: false,
  insuranceCompany: "",
  otherComments: "",

  // Car data
  carMake: "",
  carModel: "",
  carYear: 0,
  carMileage: 0,

  // User data
  age: 0,
  gender: "",
  address: "",
  deductible: 0,
  premium: 0,

  // Crash image files
  files: [],
});
