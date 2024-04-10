import { HomeSidebar } from "../layouts/Home.Sidebar";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Bienvenida } from "../components/Bienvenida";
import { KeepOut } from "../components/KeepOut";

export function ViewHome () {
    return (
        <div className="container">
            <HomeSidebar />
            <main className="w3-main w3-border w3-border-light-gray zIndex-1" style={ {marginLeft: 400}}>
                <Navbar />
                <Header headerTitle='Sistema de Administración' />
                <div>
                    <Bienvenida />
                </div>
                <div>
                    <KeepOut />
                </div>
            </main>
        </div>
    )
}