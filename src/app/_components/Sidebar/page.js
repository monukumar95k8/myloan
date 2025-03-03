const Sidebar = () => {
    return <>
        <div id="mySidebar" className="sidebar hidden-md hidden-lg hidden-sm show-xs">
            <a href="javascript:void(0)" className="closebtn" >
                ×
            </a>
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href="index.html">
                        <span className="fa fa-home" /> &nbsp;Home
                    </a>
                </li>
                <li>
                    <a href="apply.html">
                        <span className="fa fa-file-text-o" /> &nbsp;Apply Now
                    </a>
                </li>
                <li>
                    <a href="about-us.html">
                        <span className="fa fa-info-circle" /> &nbsp;About Us
                    </a>
                </li>
                <li>
                    <a href="contact-us.html">
                        {" "}
                        <span className="fa fa-phone" /> &nbsp;Contact
                    </a>
                </li>
                <li>
                    <a href="user.html">
                        {" "}
                        <span className="fa fa-user" /> &nbsp;Login
                    </a>
                </li>
                {/*-----------Mega Menu-------------*/}
            </ul>
        </div></>
}

export default Sidebar;