export function ComandasOrderPlaceholder () {
    return (
        <div>
            <article className="w3-white mb-3 px-3 py-1" >
                <div className="w3-row">
                    <div className="w3-col m2 w3-center">
                        {/* Image */}
                        <div className="load-wraper" style="height:70px">
                            <div className="loader"></div>
                        </div>
                        {/* Estado */}
                        <div className="load-wraper my-1" style="height:10px">
                            <div className="loader"></div>
                        </div>
                    </div>
                    <div className="w3-col m10">
                        <div className="w3-row">
                            <div className="w3-col m9 px-2">
                                {/* Title */}
                                <div className="load-wraper" style="height:20px">
                                    <div className="loader"></div>
                                </div>
                                {/* Details */}
                                <div className="load-wraper my-1" style="height:60px">
                                    <div className="loader" style="height:80px"></div>
                                </div>
                                {/* Comments */}
                                <div className="load-wraper my-1" style="height:20px">
                                    <div className="loader" style="height:40px"></div>
                                </div>
                            </div>
                            <div className="w3-col m3">
                                <div className="w3-row">
                                    <div className="w3-half pl-3">
                                        {/* Delete button */}
                                        <div className="load-wraper" style="height:50px">
                                            <div className="loader" ></div>
                                        </div>
                                    </div>
                                    <div className="w3-half pl-3">
                                        {/* edit button */}
                                        <div className="load-wraper" style="height:50px">
                                            <div className="loader" ></div>
                                        </div>                    
                                    </div>
                                    <div className="w3-col s12 pl-4 my-1">
                                        {/* invoice button */}
                                        <div className="load-wraper" style="height:20px">
                                            <div className="loader" ></div>
                                        </div>                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}