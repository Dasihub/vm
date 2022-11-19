import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Error404 from './Error404/Error404'
import AuthPage from './AuthPage/AuthPage'
import { Loader } from '../components'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { access_dekanat, id_role_dekanat, id_role_student, id_role_teacher } from '../config/roles'
import { isScreen } from '../config/data'
import { url } from '../config/url'

const LazyPasses = React.lazy(() => import('./PassesPage/PassesPage'))
const LazyCheckToken = React.lazy(() => import('./CheckToken/CheckTokenPage'))
const LazyDakanat = React.lazy(() => import('./MainPage/MainPage'))
const LazyTeacher = React.lazy(() => import('./TeacherPage/TeacherPage'))
const LazyPayment = React.lazy(() => import('./Payment/Payment'))

const LazyStudent = isScreen
    ? React.lazy(() => import('./StudentPage/StudentPage'))
    : React.lazy(() => import('./MobileStudentPage/MobileStudentPage'))

const Load = (
    <div className="flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 60px)' }}>
        <Loader />
    </div>
)

const Router: React.FC<{ access: null | number }> = ({ access }) => {
    const navigate = useNavigate()
    const { isAuth, id_role } = useTypeSelector(state => state.authReducer)

    React.useEffect(() => {
        if (access == access_dekanat) {
            navigate('/dekanat')
        }
    }, [access])

    if (isAuth) {
        if (id_role == id_role_dekanat) {
            return (
                <div className="main_container">
                    <div style={{ marginTop: '110px', borderRadius: '4px' }} className=" min-vh-100 w-100">
                        <Routes>
                            <Route
                                path={`${url}/dekanat`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyDakanat />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/teacher`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyTeacher />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/token`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyCheckToken />
                                    </React.Suspense>
                                }
                            />
                            <Route path={`${url}/login`} element={<Navigate replace to={`${url}/dekanat`} />} />
                            <Route path="*" element={<Error404 />} />
                            <Route path="/" element={<Navigate replace to={`${url}/dekanat`} />} />
                        </Routes>
                    </div>
                </div>
            )
        }

        if (id_role == id_role_student) {
            return (
                <div className="main_container">
                    <div style={{ marginTop: '60px', borderRadius: '4px' }} className=" min-vh-100 w-100">
                        <Routes>
                            <Route
                                path={`${url}/passes`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyPasses />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/student`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyStudent />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/payment`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyPayment />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/token`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyCheckToken />
                                    </React.Suspense>
                                }
                            />
                            <Route path={`${url}/login`} element={<Navigate replace to={`${url}/passes`} />} />
                            <Route path="*" element={<Error404 />} />
                            <Route path="/" element={<Navigate replace to={`${url}/passes`} />} />
                        </Routes>
                    </div>
                </div>
            )
        }

        if (id_role == id_role_teacher) {
            return (
                <div className="main_container">
                    <div style={{ marginTop: '110px', borderRadius: '4px' }} className=" min-vh-100 w-100">
                        <Routes>
                            <Route
                                path={`${url}/dekanat`}
                                element={
                                    access == access_dekanat ? (
                                        <React.Suspense fallback={Load}>
                                            <LazyDakanat />
                                        </React.Suspense>
                                    ) : (
                                        <Error404 />
                                    )
                                }
                            />
                            <Route
                                path={`${url}/teacher`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyTeacher />
                                    </React.Suspense>
                                }
                            />
                            <Route
                                path={`${url}/token`}
                                element={
                                    <React.Suspense fallback={Load}>
                                        <LazyCheckToken />
                                    </React.Suspense>
                                }
                            />
                            <Route path={`${url}/login`} element={<Navigate replace to={`${url}/teacher`} />} />
                            <Route path="*" element={<Error404 />} />
                            <Route path="/" element={<Navigate replace to={`${url}/teacher`} />} />
                        </Routes>
                    </div>
                </div>
            )
        }
        return <Error404 />
    }

    return (
        <Routes>
            <Route
                path={`${url}/token`}
                element={
                    <React.Suspense fallback={Load}>
                        <LazyCheckToken />
                    </React.Suspense>
                }
            />
            <Route path={`${url}/dekanat`} element={<Navigate replace to={`${url}/login`} />} />
            <Route path={`${url}/teacher`} element={<Navigate replace to={`${url}/login`} />} />
            <Route path={`${url}/student`} element={<Navigate replace to={`${url}/login`} />} />
            <Route path={`${url}/passes`} element={<Navigate replace to={`${url}/login`} />} />
            <Route path={`${url}/payment`} element={<Navigate replace to={`${url}/login`} />} />
            <Route path={`${url}/login`} element={<AuthPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    )
}

export default React.memo(Router)
