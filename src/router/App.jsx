import { createBrowserRouter } from "react-router-dom";
import { ViewNotFound } from "../views/View.NotFound";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { ViewHome } from "../views/View.Home";
  import { ViewLogin } from "../views/View.Login";
  import { ViewOrders } from "../views/View.Orders";
    import { getOrdersDishesData } from "../context/jsonCalls";
  import { ViewDishes } from "../views/View.Dishes";
    import { getDishesData } from "../context/jsonCalls";


export const App = createBrowserRouter([
  {
    element:      <GeneralLayout />,
    errorElement: (<GeneralLayout><ViewNotFound /></GeneralLayout>),
    children: [
      {
        index:        true,
        element:      <ViewHome />,
        path:         '/'
      },{
        element:      <ViewLogin/>,
        path:         "login"
      },{
        element:      <ViewOrders />,
        path:         'ordenes',
        loader:       getOrdersDishesData
      },{
        element:      <ViewDishes />,
        path:         'platillos',
        loader:       getDishesData
      }
    ]
  }
])