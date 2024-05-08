import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import './comandasOrderCreator.css';


export function ComandasOrderCreator ( ) {

    const {platillos} = useLoaderData();
    // Body of forms to make a order
    const [order, setOrder] = useState({
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
        quantity:   1
    });
    // Check if variants exist and add this to list
    const [variants, setVariants] = useState([]);
    // With the product selected, get to variants
    const findProduct = (e) => {
        // Object spread for copy object in a object
        setOrder({...order, product: {id: e.target.value, name: platillos[e.target.value].title, tooltip: false}})
        const variantsAvailables = platillos[e.target.value].variant;
        // Clear product variants
        variants.length > 0 && variants.splice(0, variants.length);
        if (variantsAvailables.length > 0) {
            variantsAvailables.map ( v => variants.push(v) )
        };
    };
    const setVariant = (e) => {
        //Set newVariant
        setOrder({...order, variant: {id: e.target.value, name: variants[e.target.value], tooltip: false}})
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
                setOrder( {...order, quantity: order.quantity-1});
                break;
            case 'fastMinus':
                doOperation.current = setInterval( () => {
                    setOrder( (order) => (order = {...order, quantity: order.quantity-1}) );
                    //setOrder( {...order, quantity: order.quantity+1} );
                }, 100 );
                break;
            case 'plus':
                setOrder( {...order, quantity: order.quantity+1});
                break;
            case 'fastPlus':
                doOperation.current = setInterval( () => {
                    setOrder( (order) => (order = {...order, quantity: order.quantity+1}) );
                    //setOrder( {...order, quantity: order.quantity+1} );
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
        if (order.quantity < 1) {
            setCounter({status: 'stop'});
            //setOrder( {quantity: 1});
        }
        if (order.quantity > 49) {
            setCounter({status: 'stop'});
            //setOrder( {quantity: 50});
        }
    }, [order.quantity]);

    const [orders, setOrders] = useState([]);
    const addElement = () => {
        //Search product
        const resProduct = orders.findIndex( ord => ord.product === order.product.name);
        console.log('orders:', orders);
        //If the pruduct is found
        if (resProduct >= 0) {
            //Destructure variants
            const {variants} = orders[resProduct];

            //Search variant
            const resVariant = variants.findIndex( v => v.name === order.variant.name);
            //If product + variant was found
            if (resVariant >= 0) {
                const newOrder = orders.map( o => {
                    if ( o.product === order.product.name ) {
                        return {
                            product:    order.product.name,
                            variants:   o.variants.map( v => {
                                if (v.name === order.variant.name) {
                                    return {
                                        name:       order.variant.name,
                                        quantity:   order.quantity
                                    }
                                };
                                return v;
                            })
                        }
                    };
                    return o;
                });
                //Variant was found
                console.log('newOrder:', newOrder);                
                setOrders(newOrder);
            }else{
                //If product was found but variant not
                const newOrder = orders.map( o => {
                    if ( o.product === order.name) {
                        return {
                            product: '',
                            variants: [...o.variants, order.variant]
                        }
                    };
                    return c
                });
                setOrders(newOrder);
            };
        }else{
            //The product was not found and will be created
            setOrders([...orders, {
                    product:    order.product.name,
                    variants: [{
                        name:       order.variant.name,
                        quantity:   order.quantity
                    }]
                }
            ]);
        };
        //Clear order product and variant
        setOrder({product: {id: '', name: '', tooltip: false}, variant: {id: '', name: '', tooltip: false}, quantity: 3});
        setVariants([]);
    };

    const validateOrder = () => {
        if (!order.product.name) {
            setOrder({...order, product: {...order.product, tooltip: true}});
        }else{
            if (variants.length > 0) {
                if (!order.variant.name) {
                    setOrder({...order, variant: {...order.variant, tooltip: true}});
                }else{
                    addElement();
                }
            }else{
                setOrders([...orders, {
                    product:    order.product.name,
                    variants:   [
                        {
                            name:       order.variant.name,
                            quantity:   order.quantity
                        }
                    ]
                }]);
            };
        };
    };


    return (
        <div className='w3-white p-3'>
            <form onSubmit={ e => e.preventDefault()}>
                <div className='mb-3'>
                    <span>*Orden</span>
                    {order.product.tooltip && (
                        <div className="tooltip">
                            <span className="tooltiptext px-1" id='orderTooltip'>Seleccione una</span>
                        </div>
                    )}
                    {/* NOMBRE */}
                    {/* Dont assign a dynamic value if you use another value in options */}
                    <select value={order.product.id} className='w3-select w3-white' name='nameOrders' id="nameOrders" onChange={ e => {
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
                            {order.variant.tooltip && (
                                <div className="tooltip">
                                    <span className="tooltiptext px-1" id='elementsTooltip'>Seleccione producto</span>
                                </div>
                            )}
                            {/* VARIANTE */}
                            <div className="w3-row">
                                <span>*Variante</span>
                                <select value={order.variant.id} className='w3-select w3-white' name="variantOrder" id="variantOrder" onChange={ e => {
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
                                    <button className='w3-button w3-border w3-border-teal w3-text-teal w-100' onMouseDown={ () => order.quantity > 1 && checkCounter({action: 'minusCounter'}) }
                                                                                                onTouchStart={ () => order.quantity > 1 && checkCounter({action: 'minusCounter'}) }
                                                                                                onMouseUp={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onTouchEnd={ () => checkCounter({action: 'stopCounter'}) }
                                                                                                onMouseLeave={ () => checkCounter({action: 'stopCounter'})}
                                    >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>
                                <div className="w3-col s6 w3-padding w3-border w3-center">
                                    <span>{order.quantity}</span>
                                </div>
                                <div className="w3-col s3">
                                    {/* Cantidad mas */}
                                    <button className='w3-button w3-border w3-border-teal w3-text-teal w-100' onMouseDown={ () => order.quantity < 50 && checkCounter({action: 'plusCounter'}) }
                                                                                                onTouchStart={ () => order.quantity < 50 && checkCounter({action: 'plusCounter'}) }
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
                                    <button type="submit" className='w3-button w3-border w3-teal w3-text-white w-100' onClick={ validateOrder } >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* ELEMENTOS */}
            <div className="w3-border p-2 my-3 w3-light-gray">
                <ul className="w3-ul p-0">
                    { orders.length > 0 && orders.map( (ord, idx) => (
                        ord.variants.map( v => (
                            <li key={idx} className='w3-row w3-white w3-border w3-padding-small'>
                                <div className="w3-col s10 p-1" >
                                    <span className="w3-small">{!v.name ? `${ord.product} x ${v.quantity}` : `${ord.product}, ${v.name} x ${v.quantity}`}</span>
                                </div>
                                <div className="w3-rest w3-right">
                                    <button className="w3-button padding-4" >
                                        <i className="w3-text-teal fa-xl fa-regular fa-circle-xmark"></i>
                                    </button>
                                </div>
                            </li>
                        ) )
                    ) ) }
                </ul>
            </div>
            {/* COMENTARIOS Y FACTURA */}
            <div className="w3-row mb-3">
                <div className="w3-threequarter">
                    <span>Comentarios</span>
                    <textarea className="w3-input w3-border" ></textarea>
                </div>
                <div className="w3-rest w3-right">
                    <div>
                        <span>Factura</span>
                    </div>
                    <div className="w3-right">
                        <input className='w3-check' type='checkbox' />
                    </div>
                </div>
            </div>
            {/* PROGRAMADO */}
            <hr />
            <div className="w3-row">
                <div className="w3-third">
                    <div>
                        <span>Programado</span>
                    </div>
                    <div>
                        <input className="w3-check" type="checkbox" />
                    </div>
                </div>
                <div className="w3-rest">
                    <div>
                        <span>Horario</span>
                    </div>
                    <div>
                        <input className="w3-input w3-border" type="date" />
                    </div>
                </div>
            </div>
            <hr />
            {/* CLIENTE */}
            <div className="w3-row">
                <div className="w3-rest m10">
                    <div className='mb-3'>
                        <div className="tooltip">
                            <span className="tooltiptext px-1" id='guestTooltip'>Escriba un nombre</span>
                        </div>
                        <span>*Cliente</span>
                        <input className='w3-input w3-border' type='text' id='exampleInputEmail1' aria-describedby='emailHelp' />
                    </div>
                </div>
            </div>
            <button className='w3-button w3-teal w-100' type='submit' >Añadir</button>
        </div>
    )
}