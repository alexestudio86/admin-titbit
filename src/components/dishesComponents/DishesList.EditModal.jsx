import { useEffect } from "react";
import { useDishesContext } from "../../context/DataProvider";


export const DishesListEditModal = ( {modal, setModal, children} ) => {

    const {getDish, dish, setDish, updateDish, setDishLoader} = useDishesContext();

    const editItem = ( event, index ) => {
        setDish({...dish, variants: dish.variants.map( (variant, idx) => (
            idx === index ? {name: event, price:0} : variant
        ))});
    };

    const addItem = () => {
        const searchDish = dish.variants.indexOf( dish.variants.find( d => d.name === '' ) );
        //Element fake found
        if ( searchDish >= 0 ) {
            setDish({...dish, variants: [...dish.variants.filter( (v) => v.name !== '' ), {name:'', price:0}] });
        //Element not found
        }else{
            setDish({...dish, variants: [...dish.variants, {name:'', price:0}]});
        };
    };

    const saveChanges = () => {
        setDishLoader(true);
        setTimeout( () => {
            const searchDish = dish.variants.indexOf( dish.variants.find( d => d.name === '' ) );
            //Element fake found
            if ( searchDish >= 0 ) {
                setDish({...dish, variants: [...dish.variants.filter( (v) => v.name !== '' )] });
            //Element not found
            };
            updateDish();
            setDish({});
            setModal({
                dishId:   null,
                type:     null,
            });
            setDishLoader(false);
        }, 600);
    };

    useEffect( () => {
        getDish(modal.dishId)
    },[])
    
    return (
        <div className={"w3-modal w3-show"} id="editModal">
            <div className="w3-modal-content w3-animate-top">
                {
                    children
                    ??
                    <>
                        <header className="w3-container w3-light-gray w3-row py-3">
                            <div className="w3-col m12">
                                <input className="w3-input w3-border" type="text" placeholder="ej. Hamburguesa Sencilla" value={dish.productName} onChange={ e => setDish({...dish, productName: e.target.value}) } />
                            </div>
                        </header>
                        <form className="w3-container w3-padding-32 w3-row">
                            <div className="w3-col s12 w3-padding-small">
                                <span>Detalles</span>
                                <div className="w3-light-gray w3-padding" >
                                    <div className="w3-row w3-padding-small" >
                                        {
                                        dish.variants
                                        &&
                                        dish.variants.map( (variant, index) => (
                                            <div key={index} className="my-1">
                                                <input className="w3-input w3-border" type="text" placeholder="ej. Pollo" value={variant.name} onChange={ event => editItem( event.target.value, index)} />
                                            </div>
                                        ))
                                        }
                                        <button className={"w3-button w3-white w3-padding w3-center"} type="button" style={{border: '1 solid', borderColor: '#9e9e9e', borderStyle: 'dashed', width: '100%'}} onClick={addItem}>
                                            <i className="fas fa-plus-circle fa-2x"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <footer className="w3-padding-16 w3-light-gray w3-center w3-row">
                            <div className="w3-col s6 w3-center">
                                <button className={"w3-button w3-white w3-border w3-border-red"}
                                    data-ident='editModal'
                                    onClick={ () => {
                                        setDish({});
                                        setModal({
                                            dishId:   null,
                                            type:     null,
                                        });
                                    }
                                } >Cancelar</button>
                            </div>
                            <div className="w3-col s6 w3-center">
                                {/* Target send like $event only when more of 1 function is setted */}
                                <button className={"w3-button w3-white w3-border w3-border-green"}
                                    onClick={ saveChanges }
                                >Guardar</button>
                            </div>
                        </footer>
                    </>
                }
            </div>
        </div>
    )
}