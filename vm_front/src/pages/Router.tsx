import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Error404 from './Error404/Error404'
import MainPage from './MainPage/MainPage'
import AuthPage from './AuthPage/AuthPage'
import { Loader } from '../components'
import { useTypeSelector } from '../hooks/useTypeSelector'
import CheckTokenPage from './CheckToken/CheckTokenPage'

const LazyTeacher = React.lazy(() => import('./TeacherPage/TeacherPage'))
const LazyStudent = React.lazy(() => import('./StudentPage/StudentPage'))

const Load = (
    <div className="flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 60px)' }}>
        <Loader />
    </div>
)

const Router: React.FC = () => {
    const { isAuth, id_role } = useTypeSelector(state => state.authReducer)

    if (isAuth) {
        if (id_role == 2) {
            return (
                <div className="main_container">
                    <div style={{ marginTop: '60px', borderRadius: '4px' }} className=" min-vh-100 w-100">
                        <Routes>
                            <Route
                                path="/student"
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyStudent />
                                    </React.Suspense>
                                }
                            />
                            <Route path="/token" element={<CheckTokenPage />} />
                            <Route path="/login" element={<Navigate replace to="/student" />} />
                            <Route path="*" element={<Error404 />} />
                            <Route path="/" element={<Navigate replace to="/student" />} />
                        </Routes>
                    </div>
                </div>
            )
        }

        if (id_role == 1) {
            return (
                <div className="main_container">
                    <div style={{ marginTop: '60px', borderRadius: '4px' }} className=" min-vh-100 w-100">
                        <Routes>
                            <Route path="/main" element={<MainPage />} />
                            <Route
                                path="/teacher"
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyTeacher />
                                    </React.Suspense>
                                }
                            />
                            <Route path="/token" element={<CheckTokenPage />} />
                            <Route path="/login" element={<Navigate replace to="/main" />} />
                            <Route path="*" element={<Error404 />} />
                            <Route path="/" element={<Navigate replace to="/main" />} />
                        </Routes>
                    </div>
                </div>
            )
        }
        return <Error404 />
    }

    return (
        <Routes>
            <Route path="/token" element={<CheckTokenPage />} />
            <Route path="/main" element={<Navigate replace to="/login" />} />
            <Route path="/teacher" element={<Navigate replace to="/login" />} />
            <Route path="/student" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    )
}

export default React.memo(Router)
