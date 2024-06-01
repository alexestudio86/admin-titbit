import { createBrowserRouter } from "react-router-dom";
import { ViewNotFound } from "../views/View.NotFound";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { ViewHome } from "../views/View.Home";
  import { ViewOrders } from "../views/View.Orders";
  import { getAllData } from "../context/jsonCalls";
    import { OrdersSidebarLayout } from "../layouts/ordersLayouts/Orders.Sidebar.Layout";
    import { getOrdersData } from "../context/jsonCalls";
    import { OrdersMainLayout } from "../layouts/ordersLayouts/Orders.Main.Layout";
    import { getDishesData } from "../context/jsonCalls";
  import { ViewDishes } from "../views/View.Dishes";


export const App = createBrowserRouter([
  {
    errorElement: <ViewNotFound />,
    children: [
      {
        element:      <GeneralLayout />,
        children: [
          {
            index:        true,
            element:      <ViewHome />,
            path:         '/'
          },{
            element:  <ViewOrders />,
            path:     'ordenes',
            children: [
              {
                element:  <OrdersSidebarLayout />,
                path:     '',
                loader:   getOrdersData
              },{
                element:  <OrdersMainLayout />,
                path:     '',
                loader:   getDishesData
              }
            ]
          },{
            element:  <ViewDishes />,
            path:     'platillos',
            loader:   getDishesData
          }
        ]
      }
    ]
  }
])