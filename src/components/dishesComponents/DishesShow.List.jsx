import { useDishesContext } from "../../context/DataProvider";


export function DishesShowList () {

  const {dishes} = useDishesContext();

  return (
    <div className="px-3 py-1 w3-white">
      <div className="w3-light-gray">
        { dishes.map( (dish, index) => (
          <button className="w3-button w3-padding w3-block" key={index} style={{ textAlign: 'left', borderBottom: '1px solid #ddd'}} >
            { dish.title }
          </button>
        ) ) }
      </div>
    </div>
  );
}