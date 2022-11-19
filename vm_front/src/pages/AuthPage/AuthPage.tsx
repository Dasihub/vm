import React from 'react'
import { Loader } from '../../components'
import { IForm, IResAuth } from './IAuth'
import { useHttp } from '../../hooks/useHttp'
import { useMessage } from '../../hooks/useMessage'
import styles from './styles.module.scss'
import { AVN, EllipseMl, EllipseRb, EllipseRt } from '../../img'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { authSlice } from '../../redux/reducers/AuthSlice'

const AuthPage: React.FC = () => {
    const toast = useMessage()
    const dispatch = useTypeDispatch()
    const { accessAuth } = authSlice.actions
    const { request, loader } = useHttp()
    const [isPassword, setIsPassword] = React.useState<boolean>(false)
    const [form, setForm] = React.useState<IForm>({
        login: '',
        password: ''
    })
    // transform: translateY(-30px) scale(1.1);

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const loginApi = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, auth, type, message }: IResAuth = await request('/auth/login', 'POST', {
            login: form.login,
            password: form.password
        })
        toast(message, type)
        if (auth) {
            localStorage.setItem('form', JSON.stringify(form))
            dispatch(
                accessAuth({
                    id_user: data.id_user,
                    id_avn_user: data.id_avn_user,
                    id_role: data.id_role,
                    isAuth: auth
                })
            )
        }
    }

    React.useEffect(() => {
        const valueInput: JSON | null | string = localStorage.getItem('form') || null
        if (valueInput) {
            const p: IForm = JSON.parse(valueInput)
            setForm(p)
        }
    }, [])

    return (
        <div className={styles.container}>
            <img src={EllipseRt} alt="rt" className={styles.rt} />
            <img src={EllipseMl} alt="ml" className={styles.ml} />
            <img src={EllipseRb} alt="rb" className={styles.rb} />
            <img src={AVN} alt="avn" className={styles.avn} />

            <div className={styles.auth}>
                <form>
                    <h1 className="text-center">Авторизация</h1>
                    <div className={`${styles.content} ${styles.content_first}`}>
                        <label
                            style={form.login ? { transform: 'translateY(-19px) scale(1.1)' } : {}}
                            htmlFor="login"
                            className={styles.label}
                        >
                            Логин
                        </label>
                        <input
                            required={true}
                            value={form.login}
                            name="login"
                            id="login"
                            // placeholder="Логин"
                            onChange={change}
                        />
                        <i className="fa fa-user" />
                    </div>
                    <div className={styles.content}>
                        <label
                            style={form.password ? { transform: 'translateY(-19px) scale(1.1)' } : {}}
                            htmlFor="password"
                            className={styles.label}
                        >
                            Пароль
                        </label>
                        <input
                            required={true}
                            value={form.password}
                            name="password"
                            type={isPassword ? 'text' : 'password'}
                            onChange={change}
                            id="password"
                            // placeholder="Пароль"
                        />
                        <i
                            onClick={setIsPassword.bind(null, !isPassword)}
                            className={`fa-solid ${isPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                        />
                    </div>
                    <button onClick={loginApi} disabled={loader}>
                        {loader ? <Loader sm={true} /> : 'ВХОД'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage
