import { useLoaderData } from "react-router-dom";
import { SidebarMobileClose } from "../../components/Sidebar.Mobile.Close";

export function DishesSidebarLayout () {

  const {dishes} = useLoaderData();

  return (
    <aside className="w3-sidebar w3-bar-block w3-collapse w3-top w3-card zIndex-3" id="mySidebar" style={ {width: '100%', maxWidth: 400}} >
      <div className="w3-bar">
        <SidebarMobileClose />
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
      </div>
    </aside>
  );
}