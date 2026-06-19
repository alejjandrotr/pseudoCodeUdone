import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { App } from './App'
import { LoginPage } from './pages/auth/LoginPage'
import { ChangePasswordPage } from './pages/auth/ChangePasswordPage'
import { StudentDashboardPage } from './pages/student/StudentDashboardPage'
import { ProjectDeliveryPage } from './pages/student/ProjectDeliveryPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login-estudiantes" element={<LoginPage />} />
        <Route path="/cambiar-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/entregar/:projectId" element={<ProjectDeliveryPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
