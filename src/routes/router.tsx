import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Calendar from '../pages/Calendar'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<MainLayout />}>

                    <Route 
                        path="/calendar" 
                        element={ 
                            <ProtectedRoute> 
                                <Calendar /> 
                            </ProtectedRoute>
                        } 
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}