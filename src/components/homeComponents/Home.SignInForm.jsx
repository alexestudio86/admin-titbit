import { useLoginContext } from "../../context/LoginProvider";


export function HomeSignInForm ( ) {

    const {userData, updateUserData, getIn}  =   useLoginContext();

    return (
        <form className="w3-container py-4" onSubmit={ e => e.preventDefault() } >
            <div className="w3-center py-2">
                <i className="fas fa-user w3-jumbo"></i>
            </div>
            <div className="py-2">
                <div className="py-1">
                    <label ><b>Usuario</b></label>
                    <input className="w3-input w3-border w3-margin-bottom" placeholder="Nombre de usuario" name="email" type="text" value={userData.email} onChange={ updateUserData } />
                </div>
                <div className="py-1">
                    <label ><b>Contraseña</b></label>
                    <input className="w3-input w3-border" placeholder='******' name="password" type="password" value={userData.password} onChange={ updateUserData } />
                </div>
            </div>
                <button type="submit" className="w3-button w-100 w3-teal" onClick={ getIn } >Login</button>
                <input className='w3-check' id="remember" type="checkbox"/>
                <label className="px-2" htmlFor="remember">Recordarme</label>
        </form>
    )
}