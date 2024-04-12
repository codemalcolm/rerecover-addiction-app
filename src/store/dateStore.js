import {create} from "zustand"

const useDateStore = create((set) =>({
    dates:[],
    setDates: (dates) => set({dates})
}))

export default useDateStore;