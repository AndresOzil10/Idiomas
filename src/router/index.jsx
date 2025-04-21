import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../Screens/login";
import NotFound from "../Screens/NotFound";
import HomeScreen from "../Screens/home";
import TeacherScreen from "../Screens/teacher";


export const router = createBrowserRouter([
    {
        path: '/rh/',
        element: <LoginScreen />,
        errorElement: <NotFound />
    },
    {
        path: '/home',
        element: <HomeScreen />,
        errorElement: <NotFound />
    },
    {
        path: '/Teacher',
        element: <TeacherScreen />,
        errorElement: <NotFound />
    },

    
])