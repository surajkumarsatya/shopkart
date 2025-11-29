import { Header } from "../layout/Header/Header";
import { Outlet } from "react-router-dom"
import Footer from "../layout/Footer/Footer";

export default function AppRoutes(){
    return(
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}