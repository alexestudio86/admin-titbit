import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";


export function ComandasOrderCreator ( ) {

    const [order, setOrder] = useState({
        product:    '',
        variant:    '',
        quantity:   1
    });

    const {platillos} = useLoaderData();
    const [variants, setVariants] = useState([]);
    const findProduct = (e) => {
        setOrder({...order, product: platillos[e.target.value].title})
        const variantsAvailables = platillos[e.target.value].variant;
        // Remove items
        variants.length > 0 && variants.splice(0, variants.length);
        if (variantsAvailables.length > 0) {
            variantsAvailables.map ( v => variants.push(v) )
        };
    }

    const [counter, setCounter] = useState({
        status: 'stop'
    })
    const ref = useRef({
        status: 'stop'
    });
    const checkCounter = (instruction = {action: null}) => {
        const ae86 = async () => {
            await new Promise( res => {
                setTimeout(() => {
                    if (ref.current.status === 'normal') {
                        ref.current.status = 'fast'
                    }
                }, 2000)
            })
        };
        switch (instruction.action) {
            case 'clickHandle':
                //setCounter({status: 'normal'});
                ref.current.status = 'normal'
                ae86();
                break;
            case 'leaveHandle':
                //setCounter({status: 'stop'});
                ref.current.status = 'stop'
                break;
            default:
                console.log('No Counter set');
        }
    }

    const interval = useRef(null);
    useEffect ( () => {
        console.log('la ref es: ', ref.current)
        switch (ref.current.status) {
            case 'normal':
                setOrder({...order, quantity: order.quantity+1});
                break;
            case 'fast':
                interval.current = setInterval( () => {
                    setOrder( order => ({order, quantity: order.quantity+1}) );
                }, 50 );
                break;
            case 'stop':
                clearInterval(interval.current);
                break
            default:
                break;
        }
    },[ref.current])
 

    return (
        <div className='w3-white p-3'>
            <form onSubmit={ e => e.preventDefault()}>
                <div className='mb-3'>
                    <span>*Orden</span>
                    <div className="tooltip">
                        <span className="tooltiptext px-1" id='orderTooltip'>Elija una opción para continuar</span>
                    </div>
                    {/* NOMBRE */}
                    {/* Dont assign a dynamic value if you use another value in options */}
                    <select defaultValue={''} className='w3-select' name='nameOrders' id="nameOrders" onChange={ e => findProduct(e) } >
                        <option value='' disabled>Elige una opcion</option>
                        { platillos.map( (platillo, index) => (
                            <option value={index} key={index}>{platillo.title}</option>
                            //<option value={JSON.stringify(platillo)} key={index} >{platillo.title}</option>
                            )
                        )}
                    </select>
                    { variants.length > 0 && (
                        <div className='my-3'>
                            {/* VARIANTE */}
                            <div className="w3-row">
                                <span>*Variante</span>
                                <select defaultValue={''} className='w3-select' name="variantOrder" id="variantOrder" onChange={ e => setOrder({...order, variant: e.target.value})} >
                                    <option value='' disabled >Elige una variante</option>
                                    { variants.map( (v, i) => (
                                        <option value={v} key={i} >{v}</option>
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
                                    <button className='w3-button w3-border w3-pale-green w-100' >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>
                                <div className="w3-col s6 w3-padding w3-border w3-center">
                                    <span>{order.quantity}</span>
                                </div>
                                <div className="w3-col s3">
                                    {/* Cantidad mas */}
                                    <button className='w3-button w3-border w3-pale-green w-100' onMouseDown={ () => checkCounter({action: 'clickHandle'}) }
                                                                                                onMouseUp={ () => checkCounter({action: 'leaveHandle'}) }
                                                                                                //onTouchStart={ () => checkCounter({action: 'clickHandle'}) }
                                                                                                //onTouchEnd={ () => checkCounter({action: 'leaveHandle'}) }
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
                                    <button className='w3-button w3-border w3-teal w3-text-white w-100' >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* ELEMENTOS */}
            <div className="tooltip">
                <span className="tooltiptext px-1" id='elementsTooltip'>Elija una variante para continuar</span>
            </div>
            <div className="w3-border p-2 my-3 w3-light-gray">
                <ul className="w3-ul p-0">
                    <li className='w3-row m-1 p-0 w3-white w3-border'>
                        <div className="w3-col s10 p-1" >
                            e.title x e.quantity
                        </div>
                        <div className="w3-rest">
                            <button className="w3-button w3-red w-100" style={{cursor: "pointer"}} >×</button>
                        </div>
                    </li>
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
            <button className='w3-button w3-blue w-100' type='submit' >Añadir</button>
        </div>
    )
}