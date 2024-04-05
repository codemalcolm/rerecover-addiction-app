import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore"
import useHabitStore from "../store/habitStore"
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserHabits = () => {
    const authUser = useAuthStore((state) => state.user)
    const [isFetching, setIsFetching] = useState(true);
    const { habits, setHabits } = useHabitStore()
    const showToast = useShowToast();

    useEffect(() => {
        const getHabits = async () => {
            if(!authUser) return
            setIsFetching(true);
            setHabits([])

            try {
                const q = query(
                    collection(firestore, "habits"),
                    where("createdBy", "==", authUser.uid)
                )
                const querySnapshot = await getDocs(q)

                const habits = []

                querySnapshot.forEach(doc => {
                    habits.push({...doc.data(), id:doc.id})
                })
                
                habits.sort((a,b) => b.createdAt - a.createdAt)
                setHabits(habits)

            } catch (error) {
                showToast("Error", error.message, "error")
                setHabits([])
            }
            finally{
                setIsFetching(false);
            }
        }
        getHabits()
    },[setHabits, authUser, showToast]);
    return { isFetching, habits }
}

export default useGetUserHabits