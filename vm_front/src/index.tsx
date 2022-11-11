import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/store'
import 'react-toastify/dist/ReactToastify.css'
import './styles/styles.scss'
// import './i18n'
import { Loader } from './components'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <React.Suspense
        fallback={
            <div className="vh-100 flex justify-content-center align-items-center">
                <Loader />
            </div>
        }>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.Suspense>
    // </React.StrictMode>,
)
