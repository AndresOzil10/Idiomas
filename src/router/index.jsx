import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../Screens/login";
import NotFound from "../Screens/NotFound";
import HomeScreen from "../Screens/home";
import TeacherScreen from "../Screens/teacher";
import ScreenHome from "../Screens/test";


export const router = createBrowserRouter([
    {
        path: '/Idiomas/',
        element: <LoginScreen />,
        errorElement: <NotFound />
    },
    {
        path: '/Home',
        element: <ScreenHome />,
        errorElement: <NotFound />
    },
    {
        path: '/Teacher',
        element: <TeacherScreen />,
        errorElement: <NotFound />
    },

    
])