import {createRoot} from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'
import MainPage from './pages/main/MainPage.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store.ts";
import LoginPage from "./pages/LoginPage.tsx";
import {ActionIcon, createTheme, MantineProvider} from "@mantine/core";

import ai from "./extend/actionicon.module.css"
import {Page404} from "./pages/404/Page404.tsx";
import PersonalAccount from "./pages/PersonalAccount.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Redirect from "./components/Redirect.tsx";
import Layout from "./components/Layout.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import NotAllowedToAuthed from "./components/NotAllowedToAuthed.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <PersistLogin/>,
        children: [
            {
                element: <Layout/>,
                children: [
                    {
                        index: true,
                        element: <MainPage/>
                    },
                    {
                        element: <RequireAuth/>,
                        children: [
                            {
                                path: "pa",
                                element: <PersonalAccount/>
                            },
                        ]
                    },
                    {
                        element: <NotAllowedToAuthed/>,
                        children: [
                            {
                                path: "login",
                                element: <LoginPage/>
                            },
                            {
                                path: "register",
                                element: <RegisterPage/>
                            },
                        ]
                    },
                    {
                        path: "launcher",
                        element: <Redirect
                            url={"https://github.com/nomfodm/InfinityLauncher/releases/latest/download/InfinityLauncher.exe"}/>
                    },
                    {
                        path: "*",
                        element: <Page404/>
                    }
                ]
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
    <MantineProvider theme={theme} defaultColorScheme={"dark"}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </MantineProvider>,
)



