import {create} from "zustand"

const useHabitStore = create((set) =>({
    habits:[],
    createHabit: (habit) => set(state => ({habits: [habit,...state.habits]})),
    setHabits: (habits) => set({habits}),
}))

export default useHabitStore;