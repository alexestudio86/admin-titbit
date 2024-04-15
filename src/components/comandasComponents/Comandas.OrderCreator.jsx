import { useLoaderData } from "react-router-dom";
import { useState } from "react";


export function ComandasOrderCreator ( ) {

    const {platillos} = useLoaderData();
    const [order, setOrder] = useState({
        product:    '',
        variant:    ''
    });
    const findIdx = (e) => {
        console.log(e.target.value.title)
    }

    return (
        <div className='w3-white p-3'>
            <form onSubmit={ e => e.preventDefault()}>
                <div className='mb-3'>
                    <span>*Orden</span>
                    <div className="tooltip">
                        <span className="tooltiptext px-1" id='orderTooltip'>Elija una opción para continuar</span>
                    </div>
                    {/* NOMBRE */}
                    <select className='w3-select' name='nameOrders' id="nameOrders" onChange={ e => {
                                                                                                        setOrder({...order, product: e.target.value});
                                                                                                        findIdx(e)
                                                                                                    }
                                                                                            } >
                        <option defaultValue disabled>Elige una opcion</option>
                        { platillos.map( (platillo, index) => (
                            <option value={[{title: platillo.title, variant: platillo.variant}]} key={index} >{platillo.title}</option>
                            )
                        )}
                    </select>
                    <div className='my-3'>
                        {/* VARIANTE */}
                        <div className="w3-row">
                            <div>
                                <span>*Variante</span>
                                <select className='w3-select' name="variantOrder" id="variantOrder" defaultValue='' >
                                    <option value='' disabled >Elige una variante</option>
                                    <option >value</option>
                                </select>
                            </div>
                            <div className="w3-rest">
                                <div className="w3-right-align">
                                    <span>Precio</span>
                                </div>
                                <div className="w3-input w3-right-align">item.orderPrice</div>
                            </div>
                        </div>
                    </div>
                    <div className='w3-row py-2'>
                        <div className="w3-col s8">
                            <div className="w3-row">
                                <div className="w3-col s3">
                                    {/* Cantidad Menos */}
                                    <button className='w3-button w3-border w3-pale-green w-100' >
                                        <i className="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>
                                <div className="w3-col s6">
                                    <input className='w3-input w3-border w3-center' type='number' id='customRange2' />
                                </div>
                                <div className="w3-col s3">
                                    {/* Cantidad mas */}
                                    <button className='w3-button w3-border w3-pale-green w-100' >
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