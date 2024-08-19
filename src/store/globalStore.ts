import { create } from 'zustand';
import { createUserSlice } from './userSlice.ts';
import { createTripSlice } from './tripSlice.ts';

export const useStore = create((set, get) => {
    const userSlice = createUserSlice(set);
    const tripSlice = createTripSlice(set, get);

    return {
        ...userSlice,
        ...tripSlice,
        logoutAndReset: async (navigate) => {
            await userSlice.logout(navigate);
            tripSlice.reset();
        }
    };
});