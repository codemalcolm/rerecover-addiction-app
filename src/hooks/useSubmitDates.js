import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSubmitDates = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast();

    const addDateLogs = async (dates, habit) => {
        for (const date of dates) {
            const q = query(collection(firestore, "date-logs"),
            where("logDate", "==", date.logDate),
            where("habitId", "==", habit.id)
            );
            const dateDocs = await getDocs(q);
            
            if (dateDocs.size > 0) {
                // Date is in the database, update the document
                dateDocs.forEach(async (doc) => {
                    await updateDoc(doc.ref, {
                        state: `${date.state}`
                    });
                });
            } else {
                // Date is not in the database, create new document
                const dateLogDoc = {
                    logDate: `${date.logDate}`,
                    state: `${date.state}`,
                    habitId: habit.id
                };
                await addDoc(collection(firestore, "date-logs"), dateLogDoc);
            }
        }
    };

    const submitDates = async (dates, habit) => {
        if (isSubmitting || !authUser) return;

        setIsSubmitting(true)
        // const habitId = habit.id;
        // const habitRef = doc(firestore, `habits/${habitId}`)

        try {
            await addDateLogs(dates, habit)
            
            showToast("Success", "Dates saved successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }finally {
            setIsSubmitting(false)
        }

    }
    return {submitDates,isSubmitting}
}

export default useSubmitDates