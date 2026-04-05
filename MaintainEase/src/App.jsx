import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/Login"
import SignupPage from "./Pages/Signup"
import ForgotPasswordPage from "./Pages/ForgotPassword"
import HomePage from "./Pages/Homepage"
import ContactPage from "./Pages/Contactpage"
import AboutPage from "./Pages/AboutPage"
import FeaturesPage from "./Pages/FeaturesPage"
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={< HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
           <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

