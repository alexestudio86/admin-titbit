import { useLoaderData } from "react-router-dom";
import { SidebarMobileClose } from "../Sidebar.Mobile.Close";

export function DishesShowList () {

  const {dishes} = useLoaderData();

  return (
    <div className="px-3 py-1 w3-white">
    <div>
    </div>
      <div className="w3-light-gray">
        { dishes.length > 0 && dishes.map( (dish, index) => (
          <button className="w3-button w3-padding w3-block" key={index} style={{ textAlign: 'left', borderBottom: '1px solid #ddd'}} >
            { dish.title }
          </button>
        ) ) }
      </div>
    </div>
  );
}