import { Navigate, Route, Router, Routes } from "react-router-dom"
import HeroPage from "./pages/HeroPage"
import PageLayout from "./Layouts/PageLayout"
import AuthPage from "./pages/AuthPage/AuthPage"
import Habits from "./pages/HabitsPage/Habits"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase/firebase"

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <>
      <PageLayout>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/"/>} />
            <Route path="/habits" element={authUser ? <Habits /> : <Navigate to="/auth"/>} />
          </Routes>
      </PageLayout>
    </>
  )
}

export default App
