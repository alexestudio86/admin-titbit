import { useLoginContext } from "../../context/LoginProvider";
import { SidebarMobileClose } from "../../components/Sidebar.Mobile.Close";
import { ComandasOrderCreator } from "../../components/comandasComponents/Comandas.OrderCreator";
import { HomeSidebarLayout } from "../homeLayouts/Home.Sidebar.Layout";
import { HomeMainLayout } from "../homeLayouts/Home.Main.Layout";


export function OrdersSidebarLayout ( ) {

    const {login} = useLoginContext();

    return (
        <>
        <div className="container">
            { login.loginStatus ? (
                <aside className="w3-sidebar w3-bar-block w3-collapse w3-top w3-card zIndex-3" id="mySidebar" style={ {width: '100%', maxWidth: 400}} >
                    <div className="w3-bar">
                        <SidebarMobileClose />
                        <ComandasOrderCreator />
                    </div>
                </aside>
            ) : (
                <>
                    <HomeSidebarLayout />
                    <HomeMainLayout />
                </>
            )}
        </div>
        </>
    )
}