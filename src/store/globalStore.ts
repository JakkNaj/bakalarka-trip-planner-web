import { create } from 'zustand';
import { createUserSlice } from './userSlice.ts';
import { createTripSlice } from './tripSlice.ts';

export const useStore = create((set) => ({
    ...createUserSlice(set),
    ...createTripSlice(set)
}));