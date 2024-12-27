import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import About from "../page/About.tsx";
import Home from "../page/Home.tsx";
import NotFoundPage from "../layout/NotfoundPage.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Navigate to={"home"}/>
            },
            {
                path: "home",
                index: true,
                element: <Home/>,
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "/*",
                element: <NotFoundPage/>
            }
        ]
    }
]
export const routers = createBrowserRouter(routes);