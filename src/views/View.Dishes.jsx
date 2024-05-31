import { useLoginContext } from "../context/LoginProvider";
import { DishesSidebar } from "../layouts/dishesLayouts/Dishes.Sidebar";
import { DishesMain } from "../layouts/dishesLayouts/Dishes.Main";
import { HomeSidebar } from "../layouts/homeLayouts/Home.Sidebar";
import { HomeMain } from "../layouts/homeLayouts/Home.Main";

export function ViewDishes ( ) {

    const {login} = useLoginContext();

    return (
        <div className="container">
            { login.loginStatus ? (
                <>
                    <DishesSidebar />
                    <DishesMain />
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