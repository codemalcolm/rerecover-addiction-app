import {create} from "zustand"

const useHabitStore = create((set) =>({
    habits:[],
    createHabit: (habit) => set(state => ({habits: [habit,...state.habits]})),
    setHabits: (habits) => set({habits}),
    setHabit: (habit) => set({habit}),
    deleteHabit: (id) => set(state => ({habits: state.habits.filter(habit => habit.id !== id)})),
}))

export default useHabitStore;