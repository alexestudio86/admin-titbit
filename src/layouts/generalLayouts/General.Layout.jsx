import { Outlet } from "react-router-dom";
import { LoginProvider } from "../../context/LoginProvider";

export function GeneralLayout ( ) {
    return (
        <LoginProvider>
            <Outlet />
        </LoginProvider>
    )
}