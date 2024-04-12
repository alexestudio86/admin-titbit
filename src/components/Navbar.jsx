import { NavLink } from "react-router-dom";

export function Navbar ( ) {
    return (
        <nav className="sticky-top zIndex-2" id="navbar">
            <div className="w3-row w3-large w3-pale-green" >
                <div className="w3-col s3 w3-hide-large">
                    <button className="w3-button w3-blue w-100 w3-hide-large" v-on:click="openSidebar">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className="w3-col s3 l4 w3-center">
                    <NavLink to='/' className="w3-bar-item w3-button w-100">
                        <span className="w3-hide-small">Home</span>
                        <i className="fas fa-home w3-hide-large"></i>
                    </NavLink>
                </div>
                <div className="w3-col s3 l4 w3-center">
                    <NavLink to='/comandas' className="w3-bar-item w3-button w-100">
                        <span className="w3-hide-small">Comandas</span>
                        <i className="fab fa-elementor w3-hide-large"></i>
                    </NavLink>
                </div>
                <div className="w3-col s3 l4 w3-center">
                    <NavLink to='/platillos' className="w3-bar-item w3-button w-100">
                        <span className="w3-hide-small">Platillos</span>
                        <i className="fas fa-utensils w3-hide-large"></i>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}