import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import './comandasOrderCreator.css';


export function ComandasOrderCreator ( ) {

    const {platillos} = useLoaderData();
    // Body of forms to make a Comanda
    const [comanda, setComanda] = useState({
        product:    {
            id:         '',
            name:       '',
            tooltip:   false
        },
        variant:    {
            id:         '',
            name:       '',
            tooltip:   false
        },
        quantity:   1,
        elementsTooltip:    false,
        guestNameTooltip:   false
    });
    // Check if variants exist and add this to list
    const [variants, setVariants] = useState([]);
    // With the product selected, get to variants
    const findProduct = (e) => {
        // Object spread for copy object in a object
        setComanda({...comanda, product: {id: e.target.value, name: platillos[e.target.value].title, tooltip: false}})
        const variantsAvailables = platillos[e.target.value].variant;
        // Clear product variants
        variants.length > 0 && variants.splice(0, variants.length);
        if (variantsAvailables.length > 0) {
            variantsAvailables.map ( v => variants.push(v) )
        };
    };
    const setVariant = (e) => {
        //Set newVariant
        setComanda({...comanda, variant: {id: e.target.value, name: variants[e.target.value], tooltip: false}})
    };
    //Identify the operation
    const [counter, setCounter] = useState({
        status: 'normal'
    });
    const operation = useRef(null);
    const checkCounter = (instruction = {action: null}) => {
        switch (instruction.action) {
            case 'minusCounter':
                setCounter({status: 'minus'});
                operation.current = setTimeout( () => {
                    setCounter({status: 'fastMinus'});
                }, 2000);
                break;
            case 'plusCounter':
                setCounter({status: 'plus'});
                operation.current = setTimeout( () => {
                    setCounter({status: 'fastPlus'});
                }, 2000);
                break;
            case 'stopCounter':
                clearTimeout(operation.current);
                setCounter({status: 'stop'});
                break;
            default:
                console.log('No instrucction set');
        }
    };
    //Do operation
    const doOperation = useRef(null);
    useEffect( () => {
        switch (counter.status) {
            case 'minus':
                setComanda( {...comanda, quantity: comanda.quantity-1});
                break;
            case 'fastMinus':
                doOperation.current = setInterval( () => {
                    setComanda( (comanda) => (comanda = {...comanda, quantity: comanda.quantity-1}) );
                    //setComanda( {...comanda, quantity: comanda.quantity+1} );
                }, 100 );
                break;
            case 'plus':
                setComanda( {...comanda, quantity: comanda.quantity+1});
                break;
            case 'fastPlus':
                doOperation.current = setInterval( () => {
                    setComanda( (comanda) => (comanda = {...comanda, quantity: comanda.quantity+1}) );
                    //setComanda( {...comanda, quantity: comanda.quantity+1} );
                }, 100 );
                break;
            case 'stop':
                clearInterval(doOperation.current);
                break;
            default:
                console.log('No ref2 set');
                break;
        }
    }, [counter.status]);
    useEffect( () => {
        if (comanda.quantity < 1) {
            setCounter({status: 'stop'});
            //setComanda( {quantity: 1});
        }
        if (comanda.quantity > 49) {
            setCounter({status: 'stop'});
            //setComanda( {quantity: 50});
        }
    }, [comanda.quantity]);
    const [comandas, setComandas] = useState({
        elements:       [],
        comment:        '',
        invoice:        false,
        schedule:       false,   
        timeCollect:    new Date().toISOString().substring(0,10),
        guest:          ''
    });
    const addElement = () => {
        //Search product in Comandas
        const resProduct = comandas.elements.findIndex( ord => ord.product === comanda.product.name);
        //If the pruduct is found
        if (resProduct >= 0) {
            //Destructure variants
            const {variants} = comandas.elements[resProduct];
            //Search variant
            const resVariant = variants.findIndex( v => v.name === comanda.variant.name);
            //Product found and variant found
            if (resVariant >= 0) {
                const newComanda = comandas.elements.map( o => {
                    if ( o.product === comanda.product.name ) {
                        return {
                            product:    comanda.product.name,
                            variants:   o.variants.map( v => {
                                if (v.name === comanda.variant.name) {
                                    return {
                                        name:       comanda.variant.name,
                                        quantity:   comanda.quantity
                                    }
                                };
                                return v;
                            })
                        }
                    };
                    return o;
                });
                setComandas({...comandas, elements: newComanda});
            }else{
                //Product found but variant not found
                const newComanda = comandas.elements.map( o => {
                    if ( o.product === comanda.product.name) {
                        return {
                            product:    o.product,
                            variants:   [...o.variants, {name: comanda.variant.name, quantity: comanda.quantity}]
                        }
                    };
                    return o
                });
                setComandas({...comandas, elements: newComanda});
            };
        }else{
            //The product was not found and will be created
            setComandas({...comandas, 
                elements: [{...comandas.elements,
                    product:    comanda.product.name,
                    variants: [{
                        name:       comanda.variant.name,
                        quantity:   comanda.quantity
                    }]
            }]
            });
        };
        //Clear comanda product and variant
        setComanda({product: {id: '', name: '', tooltip: false}, variant: {id: '', name: '', tooltip: false}, quantity: 1});
        setVariants([]);
    };
    const validateComanda = () => {
        //If product name not exist
        if (!comanda.product.name) {
            setComanda({...comanda, product: {...comanda.product, tooltip: true}});
        }else{
        //if product name exist
            //If variants exist
            if (variants.length > 0) {
                if (!comanda.variant.name) {
                    setComanda({...comanda, variant: {...comanda.variant, tooltip: true}});
                }else{
                    addElement();
                }
            }else{
            //If variants not exist
                addElement();
            };
        };
    };
    const deleteItem = (e) => {
        //If many variants exist
        if (comandas.elements[e.productIdx].variants.length > 1) {
            const newComanda = comandas.elements.map( ord => {
                if (ord.product === comandas.elements[e.productIdx].product) {
                    return {
                        ...ord,
                        variants: ord.variants.filter( (v,i) => i !== e.variantIdx)
                    }
                };
                return ord
            });
            setComandas({...comandas, elements: newComanda});
        }else{
        //If has only 1 variant
            const newComanda = comandas.elements.filter( o => o.product !== comandas.elements[e.productIdx].product )
            setComandas({...comandas, elements: newComanda});
        }
    };
    const validateOrder = () => {
        if (comandas.elements.length < 1) {
            setComanda({...comanda, elementsTooltip: true});
        }else{
        //if product name exist
            //If variants exist
            if (comandas.guest.length < 3) {
                setComanda({...comanda, guestNameTooltip: true});
                console.log('a');
            }else{
            //If variants not exist
                console.log('b');
            };
        };
    }

    return (
        <div className='w3-white p-3'>
            <form onSubmit={ e => e.preventDefault()}>
                <div className='mb-3'>
                    <span>*Comanda</span>
                    {comanda.product.tooltip && (
                        <div className="tooltip">
                            <span className="tooltiptext px-1" id='comandaTooltip'>Seleccione una</span>
                        </div>
                    )}
                    {/* NOMBRE */}
                    {/* Dont assign a dynamic value if you use another value in options */}
                    <select value={comanda.product.id} className='w3-select w3-white' name='nameComandas' id="nameComandas" onChange={ e => {
                                                                                                                findProduct(e);
                                                                                                            }}
                    >
                        <option value='' disabled>Elige una opcion</option>
                        { platillos.map( (platillo, index) => (
                            <option value={index} key={index}>{platillo.title}</option>
                            //<option value={JSON.stringify(platillo)} key={index} >{platillo.title}</option>
                            )
                        )}
                    </select>
                    { variants.length > 0 && (
                        <div className='my-3'>
                            {comanda.variant.tooltip && (
                                <div className="tooltip">
                                    <span className="tooltiptext px-1" id='elementsTooltip'>Seleccione producto</span>
                                </div>
                            )}
                            {/* VARIANTE */}
                            <div className="w3-row">
                                <span>*Variante</span>
                                <select value={comanda.variant.id} className='w3-select w3-white' name="variantComanda" id="variantComanda" onChange={ e => {
                                                                                                                                setVariant(e);
                                                                                                                            }}
                                >
                                    <option value='' disabled >Seleccione variante</option>
                                    { variants.map( (v, i) => (
                                        <option value={i} key={i} >{v}</option>
                                    ) ) }
                                </select>
                            </div>
                        </div>
                    ) }
                    <div className='w3-row py-2'>
                        <div className="w3-col s8">
                            <div className="w3-row">
                                <div className="w3-col s3">
                                    {/* Cantidad Menos */}
                                    <button className='w3-button w3-border w3-border-teal w3-text-teal w-100' onMouseDown={ () => comanda.quantity > 1 && checkCounter({action: 'minusCounter'}) }
                                                                                                onTouchStart={ () => comanda.quantity > 1 && checkCounter({action: 'minusCounter'}) }
                                                                                                onMouseUp={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onTouchEnd={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onMouseLeave={ () => checkCounter({action: 'stopCounter'})}
                                    >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>
                                <div className="w3-col s6 w3-padding w3-border w3-center">
                                    <span>{comanda.quantity}</span>
                                </div>
                                <div className="w3-col s3">
                                    {/* Cantidad mas */}
                                    <button className='w3-button w3-border w3-border-teal w3-text-teal w-100' onMouseDown={ () => comanda.quantity < 50 && checkCounter({action: 'plusCounter'}) }
                                                                                                onTouchStart={ () => comanda.quantity < 50 && checkCounter({action: 'plusCounter'}) }
                                                                                                onMouseUp={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onTouchEnd={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onMouseLeave={ () => checkCounter({action: 'stopCounter'}) }
                                    >
                                        <i className="fa-solid fa-angle-up"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w3-col s4">
                            <div className="w3-row">
                                <div className="w3-col s10 w3-right">
                                    {/* Add Item */}
                                    <button type="submit" className='w3-button w3-border w3-teal w3-text-white w-100' onClick={ validateComanda } >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* ELEMENTOS */}
            {comanda.elementsTooltip && (
                <div className="tooltip">
                    <span className="tooltiptext px-1" id='allProducts'>Añada un producto</span>
                </div>
            )}
            <div className="w3-border p-2 my-3 w3-light-gray">
                <ul className="w3-ul p-0">
                    { comandas.elements.length > 0 && comandas.elements.map( (ord, idx) => (
                        ord.variants.map( (v,i) => (
                            <li key={i} className='w3-row w3-white w3-border w3-padding-small'>
                                <div className="w3-col s10 p-1" >
                                    <span className="w3-small">{!v.name ? `${ord.product} x ${v.quantity}` : `${ord.product}, ${v.name} x ${v.quantity}`}</span>
                                </div>
                                <div className="w3-rest w3-right">
                                    <button className="w3-button padding-4" onClick={ () => {
                                        deleteItem({productIdx: idx, variantIdx: i})
                                    }} >
                                        <i className="w3-text-teal fa-xl fa-regular fa-circle-xmark"></i>
                                    </button>
                                </div>
                            </li>
                        ) )
                    ) ) }
                </ul>
            </div>
            <div className="w3-row mb-3">
                {/* COMENTARIOS */}
                <div className="w3-threequarter">
                    <span>Comentarios</span>
                    <textarea className="w3-input w3-border" value={comandas.comment} onChange={e => setComandas({...comandas, comment: e.target.value})} ></textarea>
                </div>
                {/* FACTURA */}
                <div className="w3-rest w3-right">
                    <div>
                        <label htmlFor='invoice'>Factura</label>
                    </div>
                    <div className="w3-padding">
                        <input className='w3-check' type='checkbox' id="invoice" value={comandas.checked} onChange={ e => setComandas({...comandas, invoice: !comandas.invoice}) } />
                    </div>
                </div>
            </div>
            <hr />
            <div className="w3-row">
                <div className="w3-third">
                    <div>
                        {/* PROGRAMADO */}
                        <label htmlFor='schedule'>Programado</label>
                    </div>
                    <div>
                        <input className="w3-check" type="checkbox" id="schedule" value={comandas.schedule} onChange={ e => setComandas({...comandas, schedule: !comandas.schedule}) } />
                    </div>
                </div>
                <div className={`w3-rest ${!comandas.schedule && 'w3-disabled'}`}>
                    <div>
                        <span>*Horario</span>
                    </div>
                    <div>
                        <input className="w3-input w3-border" type="date" value={comandas.timeCollect} onChange={ e => setComandas({...comandas, timeCollect: e.target.value}) } />
                    </div>
                </div>
            </div>
            <hr />
            {/* CLIENTE */}
            <div className="w3-row">
                <div className="w3-rest m10">
                    <div className='mb-3'>
                        {comanda.elementsTooltip && (
                            <div className="tooltip">
                                <span className="tooltiptext px-1" id='guestTooltip'>Escriba un nombre</span>
                            </div>
                        )}
                        <span>*Cliente</span>
                        <input className='w3-input w3-border' type='text' id='exampleInputEmail1' aria-describedby='emailHelp' />
                    </div>
                </div>
            </div>
            <button className='w3-button w3-teal w-100' type='button' onClick={validateOrder} >Añadir</button>
        </div>
    )
}