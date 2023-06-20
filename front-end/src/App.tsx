import Started from "./pages/Started/Started";
import Home from "./pages/Home/Home";
import ForYou from "./pages/ForYou/ForYou";
import Saved from "./pages/Saved/Saved";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            { path: '', element: <Started/>},
            { path: '/main',element: <Home/> },
            { path: '/for-you', element: <ForYou/> },
            { path: '/saved', element: <Saved/> }
        ]
    }
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;