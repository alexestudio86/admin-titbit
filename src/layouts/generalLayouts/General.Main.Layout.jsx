import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { Outlet } from "react-router-dom";


export function GeneralMainLayout () {
    return (
        <main className="w3-main w3-border w3-border-light-gray zIndex-1" style={ {marginLeft: 400}}>
            <Navbar />
            <Header headerTitle='Alta de comandas' />
            main layout
        </main>
    )
}