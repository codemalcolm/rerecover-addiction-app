import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user-info")),
	login: (user) => set({ user }),
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
	addHabit:(habit) => set(state => ({
        user:{...state.user, habits:[habit.id,...state.user.habits]}
    })),
}));

export default useAuthStore;
