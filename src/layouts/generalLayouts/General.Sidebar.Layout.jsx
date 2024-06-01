export function GeneralSidebarLayout () {
    return (
        <aside className="w3-sidebar w3-bar-block w3-collapse w3-top w3-card zIndex-3" id="mySidebar" style={ {width: '100%', maxWidth: 400}} >
            <div className="w3-bar">
                <SidebarMobileClose />
                <ComandasOrderCreator />
            </div>
        </aside>
    )
}