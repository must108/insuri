import { atom } from 'jotai';

export const claimStageAtom = atom<1 | 2 | 3 | 4>(1);