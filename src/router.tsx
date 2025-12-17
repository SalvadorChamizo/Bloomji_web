import HomePage from './pages/Home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            }
        ]
    }
])