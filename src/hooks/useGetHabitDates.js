import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useDateStore from "../store/dateStore"
import useHabitStore from "../store/habitStore"
const useGetHabitDates = () => {
    const authUser = useAuthStore((state)=> state.user)
    const [isFetching, setIsFetching] = useState(false)
    const showToast = useShowToast();
    const {dates, setDates} = useDateStore()
    const currentHabit = useHabitStore((state) => state.currentHabit)

    useEffect(()=>{
        const getDates = async () => {
            if(!authUser || !currentHabit) return
            setIsFetching(true)
            console.log(currentHabit.id)
            try {
                const q = query(
                    collection(firestore, "date-logs"),
                    where("habitId", "==", currentHabit.id)
                )
                const querySnapshot = await getDocs(q)
                
                const datesArr = []
                
                querySnapshot.forEach(doc => {
                    datesArr.push({ ...doc.data(), id: doc.id })
                })

                setDates(datesArr)

            } catch (error) {
                showToast("Error", error.message, "error")
            }finally{
                setIsFetching(false);
            }
        }
        getDates()
    }, [authUser, showToast, setDates] )
    return {isFetching, dates}
}

export default useGetHabitDates