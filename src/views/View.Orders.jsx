import { useLoginContext } from "../context/LoginProvider";
import { GeneralSidebarLayout } from "../layouts/generalLayouts/General.Sidebar.Layout";
    import { OrdersSidebarLayout } from "../layouts/ordersLayouts/Orders.Sidebar.Layout";
    import { HomeSidebarLayout } from "../layouts/homeLayouts/Home.Sidebar.Layout";
import { GeneralMainLayout } from "../layouts/generalLayouts/General.Main.Layout";
    import { OrdersMainLayout } from "../layouts/ordersLayouts/Orders.Main.Layout";
    import { HomeMainLayout } from "../layouts/homeLayouts/Home.Main.Layout";


export function ViewOrders ( ) {

    const {login} = useLoginContext();

    return (
        <>
            { login.loginStatus
                ?
                <>
                    <GeneralSidebarLayout>
                        <OrdersSidebarLayout />
                    </GeneralSidebarLayout>
                    <GeneralMainLayout>
                        <OrdersMainLayout />
                    </GeneralMainLayout>
                </>
                :
                <>
                    <GeneralSidebarLayout>
                        <HomeSidebarLayout />
                    </GeneralSidebarLayout>
                    <GeneralMainLayout>
                        <HomeMainLayout />
                    </GeneralMainLayout>
                </>
            }
        </>
    )
}