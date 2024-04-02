import { Route, Router, Routes } from "react-router-dom"
import HeroPage from "./pages/HeroPage"
import PageLayout from "./Layouts/PageLayout"
import AuthPage from "./pages/AuthPage"

function App() {
  return (
    <>
      <PageLayout>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
      </PageLayout>
    </>
  )
}

export default App
