import { DishesProvider } from "../../context/DataProvider";
import { useLoginContext } from "../../context/LoginProvider";
import { GeneralSidebarLayout } from "../generalLayouts/GeneralSidebar.Layout";
    import {DishesShowList} from "../../components/dishesComponents/DishesShow.List";
    import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
    import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../../layouts/generalLayouts/GeneralMain.Layout";
    import {DishesEditorList} from "../../components/dishesComponents/DishesEditor.List";
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
                        <DishesShowList />
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
                    <DishesEditorList />
                    :
                    <KeepOut/>
                }
            </GeneralMainLayout>
        </>
    )
}