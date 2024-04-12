import { useLoginContext } from "../../context/LoginProvider";
import { Navbar } from "../../components/Navbar";
import { NavbarCompact } from "../../components/NavbarCompact";
import { HomeHeader } from "../../components/homeComponents/Home.Header";
import { HomeBienvenida } from "../../components/homeComponents/Home.Bienvenida";
import { KeepOut } from "../../components/KeepOut";


export function HomeMain ( ) {

    const {login} = useLoginContext()

    return (
        <main className="w3-main w3-border w3-border-light-gray zIndex-1" style={ {marginLeft: 400}}>
            { login.loginStatus ? (
                <>
                    <Navbar />
                    <HomeHeader headerTitle='Sistema de Administración' />
                    <HomeBienvenida />
                </>
            ) : (
                <>
                    <NavbarCompact />
                    <KeepOut />
                </>
            )}
        </main>
    )
}