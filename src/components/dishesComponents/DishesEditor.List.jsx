export function DishesEditorList () {
  return (
    <div className="w3-white px-3 py-1">
      <div className="w3-row w3-light-gray p-2">
        <div className="w3-col s12 w3-border-bottom">
          <div className="w3-row w3-padding-small">
            <div className="w3-col s8">
              <h1 className="w3-large w3-center w3-padding" style={{ textTransform: "uppercase", fontWeight: "bold" }}>Creador</h1>
            </div>
            <div className="w3-rest w3-right">{/* Cancel */}</div>
          </div>
        </div>
        <div className="w3-col s12">
          <form className="w3-row w3-padding-large">
            {/* Image */}
            <div className="w3-col s4 w3-center py-2">
              <i className="fas fa-utensils w3-jumbo w3-text-gray"></i>
            </div>
            <div className="w3-rest">
              {/* Platillo */}
              <div className="p-1">
                <label htmlFor="dishName">*Platillo</label>
                <input v-model="item.title" className="w3-input w3-border" id="dishName" type="text" placeholder="ej. Hamburguesa sencilla" />
              </div>
              {/* Categoría */}
              <div className="p-1">
                <label className="w3-disabled" htmlFor="dishCategory">Categoría</label>
                <input className="w3-input w3-border" id="dishCategory" type="text" placeholder="ej. Hamburguesas" disabled />
              </div>
            </div>
            <div className="w3-col s12">
              <div>
                <span>Variantes</span>
              </div>
              {/* Edit */}
              <div className="w3-row py-1" v-for="(variant, index) of item.variant" >
                <div className="w3-col s11">
                  <input v-model="item.variant[index]" className="w3-input w3-border" id="dishName" type="text" placeholder="ej. De res" />
                </div>
                <button type="button" className="w3-button w3-rest w3-right p-0" >
                  <i className="far fa-times-circle w3-xxlarge w3-text-red"></i>
                </button>
              </div>
              {/* Add */}
              <div className="w3-padding w3-center" style={{ border: "1 solid", borderColor: "#9e9e9e", borderStyle: "dashed" }} >
                <button className="w3-button w3-light-gray w3-text-gray" type="button" >
                  <i className="fas fa-plus-circle fa-2x"></i>
                </button>
              </div>
              {/* Save */}
              <div className="w3-right-align p-1 py-2">
                <button className="w3-button w-100 w3-teal" type="submit">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
