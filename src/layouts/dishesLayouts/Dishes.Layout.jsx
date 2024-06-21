import { useLoginContext } from "../../context/LoginProvider";
import { GeneralSidebarLayout } from "../generalLayouts/GeneralSidebar.Layout";
    import { DishesProvider } from "../../context/DataProvider";
        import { DishesMainLayout } from "./DishesMain.Layout";
    import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
    import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../../layouts/generalLayouts/GeneralMain.Layout";
    import { DishesSidebarLayout } from "./DishesSidebar.Layout";
    import { KeepOut } from "../../components/KeepOut";


export function DishesLayout () {

    const {user} = useLoginContext();

    return (
        <>
            <GeneralSidebarLayout>
                {
                    user.authenticated
                    ?
                    <DishesProvider>
                        <DishesMainLayout />
                    </DishesProvider>
                    :
                        user.loader
                        ?
                        <HomePlaceholderLogin />
                        :
                        <HomeSignInForm />
                }
            </GeneralSidebarLayout>
            <GeneralMainLayout>
                {
                    user.authenticated
                    ?
                    <DishesSidebarLayout />
                    :
                    <KeepOut/>
                }
            </GeneralMainLayout>
        </>
    )
}