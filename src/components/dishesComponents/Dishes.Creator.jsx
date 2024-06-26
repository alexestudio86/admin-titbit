import { Fragment, useState } from "react";
import { useDishesContext } from "../../context/DataProvider";


export function DishesCreator () {

  const {addDish} = useDishesContext();
  
  const [dish, setDish] = useState({
    basePrice:    0,
    productName:  '',
    variants:     [],
    tooltip:      false,
    loading:      false
  });
  
  const validateDish = () => {
    const searchDish = dish.variants.indexOf( dish.variants.find( d => d.name === '' ) );
    //Element fake found
    if ( searchDish >= 0 ) {
      setDish({...dish, variants: [...dish.variants.filter( (v) => v.name !== '' ), {name:'', price:0}] }); 
    //Element not found
    }else{
      setDish({...dish, variants: [...dish.variants, {name:'', price:0}]});
    };
  };

  const saveDish = () => {
    //Set Loading
    setDish({...dish, loading:true});
    if (dish.productName.length <= 3) {
      setDish({...dish, tooltip: true});
    }else{
      if (dish.variants) {
        const searchDish = dish.variants.indexOf( dish.variants.find( d => d.name === '' ) );
        //Element fake found
        if ( searchDish >= 0 ) {  
          setDish({...dish, variants: [...dish.variants.filter( (v) => v.name !== '' )] });
        //Element not found
        };
      }

      const excluded = ['tooltip', 'loading'];
      const filtered = Object.keys(dish)
        .filter(key => !excluded.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: dish[key]
          };
          }, {});
      addDish(filtered);
      setTimeout( () => {
        setDish({
          basePrice:    0,
          productName:  '',
          variants:     [],
          tooltip:      false,
          loading:      false
        })
      }, 500)
    }
  }

  return (
    <div className="w3-white px-3 py-1">
      <div className="w3-row">
        <div className="w3-col s12 w3-border-bottom">
          <h1 className="w3-large w3-center w3-padding" style={{ textTransform: "uppercase", fontWeight: "bold" }}>Creador</h1>
        </div>
        <form className="w3-col s12" onSubmit={ e => e.preventDefault()}>
          {
            dish.loading
            ?
            <div className="w3-padding-64" style={ {display:'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
              <div className="loader-creator"></div>
            </div>  
            :
            <>
              {/* Platillo */}
              <div className="p-1">
                {
                  dish.tooltip
                  &&
                  <div className="tooltip">
                    <span className="tooltiptext px-1" id='dishName'>Escriba un nombre válido</span>
                  </div>
                }
                <label htmlFor="dishName">*Platillo</label>
                <input className="w3-input w3-border"
                  id="dishName"
                  type="text"
                  placeholder="ej. Hamburguesa sencilla"
                  value={dish.productName} onChange={ e => setDish({...dish, tooltip:false, productName: e.target.value}) }
                />
              </div>
              {/* Variantes */}
              <div className="w3-row p-1">
                <span>Variantes</span>
                { dish.variants
                  &&
                  dish.variants.map( (variant, index) => 
                    <Fragment key={index}>
                      {/* Variantes Edit */}
                      <div className="w3-col s10">
                        <input
                          className="w3-input w3-border"
                          type="text" placeholder="ej. De res"
                          value={variant.name}
                          onChange={ e => setDish({...dish, variants: dish.variants.map( (v, i) => index === i ? {name: e.target.value, price: 0} : v )}) }
                        />
                      </div>
                      {/* Remove Variant */}
                      <div className="w3-rest">
                        <button type="button" className="w3-button w3-right p-0" >
                          <i className="far fa-times-circle w3-xxlarge w3-text-red"></i>
                        </button>
                      </div>
                    </Fragment>
                  )
                }
              </div>
              {/* Add */}
              <div className="p-1">
                <div className="w3-center" style={{ border: "1 solid", borderColor: "#9e9e9e", borderStyle: "dashed" }} >
                  <button className="w-100 w3-button w3-text-gray" type="button" onClick={ validateDish } >
                    <i className="fas fa-plus-circle fa-2x"></i>
                  </button>
                </div>
              </div>
            </>
          }
          {/* Save */}
          <div className="p-1">
            <button className={"w3-button w-100 w3-teal"+(dish.loading ? ' w3-disabled' : '')} disabled={dish.loading ? true : false} type="submit" onClick={saveDish}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
