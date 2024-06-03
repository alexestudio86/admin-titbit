import { LoginProvider } from "../../context/LoginProvider";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";


export function GeneralLayout ({children}) {
    return (
        <LoginProvider>
            <div className="container">
                {
                children
                ??
                <Outlet />
                }
            </div>
        </LoginProvider>
    )
}