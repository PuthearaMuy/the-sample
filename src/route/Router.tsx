import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import About from "../page/About.tsx";
import Home from "../page/home/Home.tsx";
import NotFoundPage from "../layout/NotfoundPage.tsx";
import Upload from "../page/upload/Upload.tsx";
import Test from "../page/Test.tsx";
import LoginRedirect from "../page/login/LoginRedirect.tsx";
import SampleDetail from "../page/detail/SampleDetail.tsx";
import SamplePurchaseSetting from "../page/upload/SamplePurchaseSetting.tsx";

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
                path: "home/:id",
                element: <SampleDetail/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "upload",
                element: <Upload/>
            },
            {
                path: "upload/:id",
                element: <SamplePurchaseSetting/>
            },
            {
                path: "test",
                element: <Test/>
            },
            {
                path: "login",
                element: null,
                children: [{
                    path: "redirect",
                    element: <LoginRedirect/>
                }]
            },
            {
                path: "/*",
                element: <NotFoundPage/>
            }
        ]
    }
]
export const routers = createBrowserRouter(routes);