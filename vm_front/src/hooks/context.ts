import { createContext } from 'react'

interface IContext {
    // setAuth: (pre: IAuth) => void
    // dataUser: IAuth
}

export const AppContext = createContext<Partial<IContext>>({})
