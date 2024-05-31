import { useLoginContext } from "../context/LoginProvider";
import { OrdersSidebar } from "../layouts/ordersLayouts/Orders.Sidebar";
import { OrdersMain } from "../layouts/ordersLayouts/Orders.Main";
import { HomeSidebar } from "../layouts/homeLayouts/Home.Sidebar";
import { HomeMain } from "../layouts/homeLayouts/Home.Main";


export function ViewOrders ( ) {

    const {login} = useLoginContext();

    return (
        <div className="container">
            { login.loginStatus ? (
                <>
                    <OrdersSidebar />
                    <OrdersMain />
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