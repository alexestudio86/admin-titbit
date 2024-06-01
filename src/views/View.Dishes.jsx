import { useLoginContext } from "../context/LoginProvider";
import { DishesSidebarLayout } from "../layouts/dishesLayouts/Dishes.Sidebar.Layout";
import { DishesMainLayout } from "../layouts/dishesLayouts/Dishes.Main.Layout";
import { HomeSidebarLayout } from "../layouts/homeLayouts/Home.Sidebar.Layout";
import { HomeMainLayout } from "../layouts/homeLayouts/Home.Main.Layout";

export function ViewDishes ( ) {

    const {login} = useLoginContext();

    return (
        <div className="container">
            { login.loginStatus ? (
                <>
                    <DishesSidebarLayout />
                    <DishesMainLayout />
                </>
            ) : (
                <>
                    <HomeSidebarLayout />
                    <HomeMainLayout />
                </>
            )}
        </div>
    )
}