import { createBrowserRouter } from "react-router-dom";
import { ViewNotFound } from "../views/View.NotFound";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { ViewHome } from "../views/View.Home";
  import { ViewComandas } from "../views/View.Comandas";
  import { getPlatillosData } from "../context/jsonCalls";
  import { getComandasData } from "../context/jsonCalls";
  import { ViewPlatillos } from "../views/View.Platillos";


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
            path:     'comandas',
            element:  <ViewComandas />,
            loader:   getPlatillosData
          },{
            path:     'platillos',
            element:  <ViewPlatillos />
          }
        ]
      }
    ]
  }
])