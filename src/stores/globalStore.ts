import { create } from 'zustand';
import { createUserSlice, userSlice } from './userSlice.ts';
import { createTripSlice, tripSlice } from './tripSlice.ts';

interface globalStore extends userSlice, tripSlice {
    logoutAndReset: (navigate: (path: string) => void) => void;
}

export const useStore = create<globalStore>()((...a) => {
    const userSlice = createUserSlice(...a);
    const tripSlice = createTripSlice(...a);

    return {
        ...userSlice,
        ...tripSlice,
        logoutAndReset: async (navigate : (path : string) => void) => {
            await userSlice.logout(navigate);
            tripSlice.reset();
        }
    };
});