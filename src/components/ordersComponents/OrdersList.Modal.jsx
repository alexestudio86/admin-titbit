import { Fragment, useEffect } from "react";
import { useOrdersContext } from "../../context/DataProvider";


export function OrdersListModal( {modal, setModal} ) {

    const {order, setOrder, getOrder} = useOrdersContext();
    useEffect( () => {
        getOrder(modal.userId);
    }, []);

    const dateConvertion = ( evt = 'default' ) => {
        if (evt === 'default') {    
            return new Date().toDateString();
        }
        return evt.toDate().toDateString();
    };

    const statusDefine = ( status ) => {
        switch (status) {
            case 'trabajando':
                return <option value="trabajando" defaultValue >tTrabajando</option>
                break;
            case 'entregado':
                return <option value="entregado" defaultValue >Entregado</option>
            default:
                break;
        }
    }

    const editItem = ( idx, value ) => {
        setOrder({...order, details: order.details.map( (detail, index) => (
            index === idx ? value : detail
        ))});
    }

    return (
        <div className={"w3-modal" + (modal.show ? ' w3-show' : ' w3-hide')} id="editModal">
            <div className="w3-modal-content w3-animate-top">
                <header className="w3-container w3-light-gray w3-row py-3">
                    <div className="w3-col s8">
                        <h1 className="w3-padding-16 w3-large w3-center p-0">{!order ? 'No User Selected' : order.name}</h1>
                    </div>
                    <div className="w3-col s4">
                        <span><b>{!order ? dateConvertion() : dateConvertion(order.created)}</b></span>
                    </div>
                </header>
                <form className="w3-container w3-padding-32 w3-row">
                    <div className="w3-col s12 w3-padding-small">
                        <span>Detalles</span>
                        <div className="w3-light-gray w3-padding" >
                            <div className="w3-row w3-padding-small" >
                                {
                                    !order.details
                                    ?
                                    <>
                                        <div className="w3-col s11">
                                            <input className="w3-white w3-input w3-border w3-disabled" disabled  type="text" />
                                        </div>
                                        <div className="w3-rest">
                                            <button className="w3-btn w3-text-red w-100 w3-disabled" disabled type="button">
                                                <i className="fas fa-times fa-2x"></i>
                                            </button>
                                        </div>
                                    </>
                                    :
                                    order.details.map((detail, index) => (
                                        <Fragment key={index}>
                                            {detail.variants.map( (variant, idx) => (
                                                <Fragment key={idx}>
                                                    <div className="w3-col s11">
                                                        <input value={order.details[index].variants[idx].name} className="w3-white w3-input w3-border" type="text" onChange={ e => editItem(index, e.target.value) } />
                                                    </div>
                                                    <div className="w3-rest">
                                                        <button className="w3-button w3-text-red w-100" type="button" onClick={ () => console.log('clicked') }>
                                                            <i className="fas fa-times fa-2x"></i>
                                                        </button>
                                                    </div>
                                                </Fragment>
                                            ))}
                                        </Fragment>
                                    ))
                                }
                                <button className={"w3-button w3-white w3-padding w3-center" + (!order && 'w3-disabled')} disabled={!order ? true : false} type="button" style={{border: '1 solid', borderColor: '#9e9e9e', borderStyle: 'dashed', width: '100%'}}>
                                    <i className="fas fa-plus-circle fa-2x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w3-col s8 w3-padding-small">
                        <label htmlFor="comment">Comentarios</label>
                        <textarea className={"w3-input w3-border" + (!order && 'w3-disabled')} disabled={!order ? true : false} id='comment'></textarea>
                    </div>
                    <div className="w3-col s3 w3-padding-small">
                        <span className="w3-disabled" disabled>Estatus</span>
                        <select className="w3-select w3-border w3-disabled" name="option" disabled>
                            {
                            !order
                            ?
                            <option value="" defaultValue >N/A</option>
                            :
                                statusDefine(order.status)
                            }
                        </select>
                    </div>
                    <div className="w3-col s1 w3-padding-small">
                        <div className="w3-right-align">
                            <label className="w3-disabled" disabled htmlFor="invoice">Factura</label>
                        </div>
                        <div className="w3-right-align">
                            {
                                !order
                                ?
                                <input id='invoice' className="w3-check w3-disabled" type="checkbox" disabled defaultChecked='false' />
                                :
                                <input id='invoice' className="w3-check w3-disabled" type="checkbox" disabled checked={order.invoice ? true : false} />
                            }
                        </div>
                    </div>
                </form>
                <footer className="w3-padding-16 w3-light-gray w3-center w3-row">
                    <div className="w3-col s6 w3-center">
                        <button className={"w3-button w3-white w3-border w3-border-red"}
                            data-ident='editModal'
                            onClick={ () => {
                                    setOrder([]);
                                    setModal({userId: null, show:  false});
                                }
                            }
                        >Cancelar</button>
                    </div>
                    <div className="w3-col s6 w3-center">
                        {/* Target send like $event only when more of 1 function is setted */}
                        <button className={"w3-button w3-white w3-border w3-border-green" + (!order && 'w3-disabled')} disabled={!order ? true : false} data-ident='editModal' >Guardar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}