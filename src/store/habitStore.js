import {create} from "zustand"

const useHabitStore = create((set) =>({
    habits:[],
    createHabit: (habit) => set(state => ({habits: [habit,...state.habits]})),
    setHabits: (habits) => set({habits}),
    setHabit: (editedHabit) => set(state => ({
        habits: state.habits.map(habit => habit.id === editedHabit.id ? editedHabit : habit)
    })),
    deleteHabit: (id) => set(state => ({habits: state.habits.filter(habit => habit.id !== id)})),
    setCurrentHabit: (habit) => set({ currentHabit: habit })
}))

export default useHabitStore;