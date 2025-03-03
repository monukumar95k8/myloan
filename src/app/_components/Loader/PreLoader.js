"use client"
import "./loader.css";
const PreLoader = () => {
    return <>
        <div className="loader_page" >
            <div className="loader_container" >
                <img src="/assets/Rocket.gif" />
                <span>Loading Profile...</span>
            </div>
        </div>
    </>
}

export default PreLoader;