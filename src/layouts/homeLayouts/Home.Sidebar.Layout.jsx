import { useLoginContext } from "../../context/LoginProvider";
import { HomeSignOutForm } from "../../components/homeComponents/Home.SignOutForm";
import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";


export function HomeSidebarLayout () {

    const {login}  =   useLoginContext();

    /* Logout */
    return (
        <aside className="w3-sidebar w3-bar-block w3-collapse w3-top w3-card zIndex-3" id="mySidebar" style={ {width: '100%', maxWidth: 400}} >
            <div className="w3-bar">
                {/* Mobile Menú */}
                <div className="w3-bar-item w3-teal py-4 w3-display-container">
                    <span className="fs-5 text-white fw-bold text-uppercase w3-display-center">Menú</span>
                    <button className="w3-button w3-hide-large w3-text-white w3-display-right" >
                    Close <i className="fas fa-times"></i>
                    </button>
                </div>
                { login.loginStatus ? (
                    <HomeSignOutForm userData='userData' getOut='getOut' />
                ) : (
                    login.loader ? (
                        <HomePlaceholderLogin />
                    ) : (
                        <HomeSignInForm userData='userData' updateUserData='updateUserData' getIn='getIn' />
                    )
                )}
            </div>
        </aside>
    )

        /* Login */
        {login.loader ? (
            <div className='w3-container py-4'>
                <div className="w3-center py-2">
                    < PlaceHolderLogin / >
                </div>
            </div>
        ) : (
            <HomeSignInForm />
        )}

}