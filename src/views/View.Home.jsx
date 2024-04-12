import { HomeSidebar } from "../layouts/homeLayouts/Home.Sidebar";
import { HomeMain } from "../layouts/homeLayouts/Home.Main";

export function ViewHome () {
    return (
        <div className="container">
            <HomeSidebar />
            <HomeMain />
        </div>
    )
}