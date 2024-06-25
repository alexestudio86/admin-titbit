import { useDishesContext } from "../../context/DataProvider";


export const DishesListEditor = ({setModal}) => {

    const {dishes} = useDishesContext();

    return (
      <>
        <div className="w3-row w3-padding">
          <h3 className="w3-col m12 w3-right-align w3-large text-uppercase">
            Registros Totales: {dishes.length}
          </h3>
        </div>
        {dishes.map((dish, index) => (
          <article key={index} className="w3-row w3-white mb-3 px-3 py-1">
            <div className="w3-col m10">
              {/* Field and leyend */}
              <div className="fieldset" key={index}>
                <h1 className="legend w3-large">
                  <span>{dish.productName}</span>
                </h1>
              </div>
            </div>
            <div className="w3-rest">
              <div className="w3-right-align">
                <button
                  className="w3-button w3-white w3-text-red mx-1 w3-padding-small"
                  data-ident="deleteModal"
                >
                  <i className="fas fa-trash text-danger w3-large"></i>
                </button>
                <button
                  className="w3-button w3-white w3-text-blue mx-1 w3-padding-small"
                  data-ident="editModal"
                  onClick={() => {
                    setModal({
                      dishId:   dish.id,
                      type:     'edit',
                    });
                  }}
                >
                  <i className="fas fa-edit text-primary w3-large"></i>
                </button>
              </div>
            </div>
            <div className="w3-col s12">
              {dish.variants.map((d, i) => (
                <div key={i}>
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </>
    );
}