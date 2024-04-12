import { useLoginContext } from "../context/LoginProvider";
import { ComandasSidebar } from "../layouts/comandasLayouts/Comandas.Sidebar";
import { ComandasMain } from "../layouts/comandasLayouts/Comandas.Main";
import { HomeSidebar } from "../layouts/homeLayouts/Home.Sidebar";
import { HomeMain } from "../layouts/homeLayouts/Home.Main";


export function ViewComandas ( ) {

    const {login} = useLoginContext();

    return (
        <div className="container">
            { login.loginStatus ? (
                <>
                    <ComandasSidebar />
                    <ComandasMain />
                </>
            ) : (
                <>
                    <HomeSidebar />
                    <HomeMain />
                </>
            )}
        </div>
    )
}