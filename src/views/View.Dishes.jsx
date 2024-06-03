import { useLoginContext } from "../context/LoginProvider";
import { GeneralSidebarLayout } from "../layouts/generalLayouts/General.Sidebar.Layout";
    import { HomeSidebarLayout } from "../layouts/homeLayouts/Home.Sidebar.Layout";
    import { DishesSidebarLayout } from "../layouts/dishesLayouts/Dishes.Sidebar.Layout";
import { GeneralMainLayout } from "../layouts/generalLayouts/General.Main.Layout";
    import { HomeMainLayout } from "../layouts/homeLayouts/Home.Main.Layout";
    import { DishesMainLayout } from "../layouts/dishesLayouts/Dishes.Main.Layout";

export function ViewDishes ( ) {

    const {login} = useLoginContext();

    return (
        <>
            { login.loginStatus ? (
                <>
                    <GeneralSidebarLayout>
                        <DishesSidebarLayout />
                    </GeneralSidebarLayout>
                    <GeneralMainLayout>
                        <DishesMainLayout />
                    </GeneralMainLayout>
                </>
            ) : (
                <>
                    <GeneralSidebarLayout>
                        <HomeSidebarLayout />
                    </GeneralSidebarLayout>
                    <GeneralMainLayout>
                        <HomeMainLayout />
                    </GeneralMainLayout>
                </>
            )}
        </>
    )
}