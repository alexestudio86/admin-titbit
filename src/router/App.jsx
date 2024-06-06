import { createBrowserRouter } from "react-router-dom";
import { IsErrorView } from "../views/IsError.View";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { IsHomeView } from "../views/IsHome.View";
  import { IsPageView } from "../views/IsPage.View";
    import { OrdersLayout } from "../layouts/ordersLayouts/Orders.Layout";
    import { getOrdersDishesData } from "../context/jsonCalls";
    import { DishesLayout } from "../layouts/dishesLayouts/Dishes.Layout";
    import { getDishesData } from "../context/jsonCalls";



export const App = createBrowserRouter([
  {
    element:      <GeneralLayout />,
    errorElement: (<GeneralLayout><IsErrorView /></GeneralLayout>),
    children: [
      {
        index:        true,
        element:      (
          <IsHomeView/>
        ),
        path:         '/'
      },{
        element:      <IsPageView />,
        path:         '',
        children:     [
          {
            element:    <OrdersLayout />,
            path:       'ordenes', 
            loader:     getOrdersDishesData
          },{
            element:    <DishesLayout />,
            path:       'platillos',
            loader:     getDishesData
          }
        ]
      }
    ]
  }
])