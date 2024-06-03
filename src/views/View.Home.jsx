import { HomeSidebarLayout } from "../layouts/homeLayouts/Home.Sidebar.Layout";
import { HomeMainLayout } from "../layouts/homeLayouts/Home.Main.Layout";


export function ViewHome () {
    return (
        <>
            <HomeSidebarLayout />
            <HomeMainLayout />
        </>
    )
}