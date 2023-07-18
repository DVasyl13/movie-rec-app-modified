import Started from "./pages/Started/Started";
import Home from "./pages/Home/Home";
import ForYou from "./pages/ForYou/ForYou";
import Saved from "./pages/Saved/Saved";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LogIn from "./pages/Auth/login/LogIn";
import SignIn from "./pages/Auth/signin/SignIn";
import {RequireAuth} from "react-auth-kit";
import React, {Fragment} from "react";
import Movie from "./pages/DContent/Movie/Movie";
import Account from "./pages/Account/Account";
import PasswordRecovery from "./pages/Auth/password-recovery/PasswordRecovery";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            { path: '', element: <Started/>},
            { path: '/login', element: <LogIn/>},
            { path: '/register', element: <SignIn/>},
            { path: '/password-recovery', element: <PasswordRecovery/>},
            { path: '/main',element: <Home/> },
            { path: '/movie/:id',element: <Movie/> },
            { path: '/person/:id',element: <Movie/> },
            { path: '/for-you', element: (
                    <RequireAuth loginPath="/login">
                        <Fragment>
                            <ForYou />
                        </Fragment>
                    </RequireAuth>
                ) },
            { path: '/saved', element: (
                    <RequireAuth loginPath="/login">
                        <Fragment>
                            <Saved />
                        </Fragment>
                    </RequireAuth>
                ) },
            { path: '/account', element: (
                    <RequireAuth loginPath="/login">
                        <Fragment>
                            <Account />
                        </Fragment>
                    </RequireAuth>
                ) },
        ]
    }
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;