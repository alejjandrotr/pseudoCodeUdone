import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { App } from './App'
import { LoginPage } from './pages/auth/LoginPage'
import { ChangePasswordPage } from './pages/auth/ChangePasswordPage'
import { StudentDashboardPage } from './pages/student/StudentDashboardPage'
import { ProjectDeliveryPage } from './pages/student/ProjectDeliveryPage'
import { ProjectDetailPage } from './pages/student/ProjectDetailPage'
import { ExamDashboardRouted } from './pages/ExamDashboardRouted'
import { VirtualExamRouted } from './pages/VirtualExamRouted'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login-estudiantes" element={<LoginPage />} />
        <Route path="/cambiar-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/proyecto/:projectId" element={<ProjectDetailPage />} />
        <Route path="/entregar/:projectId" element={<ProjectDeliveryPage />} />
        <Route path="/parcial-virtual" element={<ExamDashboardRouted />} />
        <Route path="/parcial-virtual/examen" element={<VirtualExamRouted />} />
        <Route path="/profesor-panel" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
