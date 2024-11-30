import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'
import MainPage from './pages/main/MainPage.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import {Provider} from "react-redux";
import store from "./store.ts";
import LoginPage from "./pages/login/LoginPage.tsx";
import {ActionIcon, createTheme, MantineProvider} from "@mantine/core";

import ai from "./extend/actionicon.module.css"
import {Page404} from "./pages/404/Page404.tsx";
import PersonalAccount from "./pages/personalaccount/PersonalAccount.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import Redirect from "./components/redirect/Redirect.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        children: [
            {
                index: true,
                element: <MainPage/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "register",
                element: <RegisterPage/>
            },
            {
                path: "pa",
                element: <PersonalAccount/>
            },
            {
                path: "launcher",
                element: <Redirect url={"https://github.com/nomfodm/InfinityLauncher/releases/latest/download/InfinityLauncher.exe"}/>
            },
            {
                path: "*",
                element: <Page404/>
            }
        ]
    }


])

const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    scale: 1.1,
    components: {
        ActionIcon: ActionIcon.extend({
            classNames: ai
        })
    },
    other: {
        headerTitleFont: "Montserrat Alternates, Inter, sans-serif",
        headerFontWeight: 600,
    }
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme={"dark"}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </MantineProvider>
    </StrictMode>,
)



