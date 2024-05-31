import { createBrowserRouter } from "react-router-dom";
import { ViewNotFound } from "../views/View.NotFound";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { ViewHome } from "../views/View.Home";
  import { ViewOrders } from "../views/View.Orders";
  import { getAllData } from "../context/jsonCalls";
  import { getOrdersData } from "../context/jsonCalls";
  import { ViewDishes } from "../views/View.Dishes";
  import { getDishesData } from "../context/jsonCalls";


export const App = createBrowserRouter([
  {
    errorElement: <ViewNotFound />,
    children: [
      {
        element:      <GeneralLayout />,
        children: [
          {
            index:        true,
            path:         '/',
            element:      <ViewHome />
          },{
            path:     'ordenes',
            element:  <ViewOrders />,
            loader:   getAllData
          },{
            path:     'platillos',
            element:  <ViewDishes />,
            loader:   getDishesData
          }
        ]
      }
    ]
  }
])