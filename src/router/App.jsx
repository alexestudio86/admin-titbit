import { createBrowserRouter } from "react-router-dom";
import { ViewNotFound } from "../views/View.NotFound";
import { GeneralLayout } from "../layouts/General.Layout";
import {getLoginData} from '../context/db.js'
  import { ViewHome } from "../views/View.Home";
  import './app.css'

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
          }
        ]
      }
    ]
  }
])