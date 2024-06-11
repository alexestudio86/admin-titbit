import { useLoginContext } from "../../context/LoginProvider";
import { useOrdersContext } from "../../context/DataProvider";
import { GeneralSidebarLayout } from "../generalLayouts/General.Sidebar.Layout";
    import { OrdersProvider } from "../../context/DataProvider";
        import {ComandasOrderCreator} from "../../components/comandasComponents/Comandas.OrderCreator";
    import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
    import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../../layouts/generalLayouts/General.Main.Layout";
    import { DishesProvider } from "../../context/DataProvider";
        import { ComandasOrderList } from "../../components/comandasComponents/ComandasOrder.List";
    import { KeepOut } from "../../components/KeepOut";


export function OrdersLayout () {

    const {user} = useLoginContext();


    return (
        <>
            <GeneralSidebarLayout>
                {
                    user.authenticated
                    ?
                    <DishesProvider>
                        <ComandasOrderCreator/>
                    </DishesProvider>
                    :
                        user.loader
                        ?
                        <HomePlaceholderLogin/>
                        :
                        <HomeSignInForm/>
                }
            </GeneralSidebarLayout>
            <GeneralMainLayout>
                    {
                        user.authenticated
                        ?
                        <OrdersProvider>
                            <ComandasOrderList />
                        </OrdersProvider>
                        :
                        <KeepOut/>
                    }
            </GeneralMainLayout>
        </>
    )
}