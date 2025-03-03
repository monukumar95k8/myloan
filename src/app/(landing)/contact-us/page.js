const ContactUs = () => {
    return <>
        <div className="container-fluid" bis_skin_checked={1}>
            <div className="row" bis_skin_checked={1}>
                <dv className=" map">
                    <div className="wrap-map" bis_skin_checked={1} />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9047836253476!2d77.23945531449496!3d28.63261569082918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcd63dda69eb%3A0x31085ea589b70138!2sSuperb+Enterprises+Pvt.+Ltd.!5e0!3m2!1sen!2sin!4v1460350976513"
                        width="100%"
                        height={400}
                        frameBorder={0}
                        style={{ border: 0 }}
                        allowFullScreen=""
                    />
                </dv>
                <section className=" contact-box">
                    <div className="container" bis_skin_checked={1}>
                        <div className="col-md-8 col-md-offset-2" bis_skin_checked={1}>
                            <div className="contact-new" bis_skin_checked={1}>
                                <div
                                    className="col-md-6 col-lg-6 col-sm-12 col-xs-12"
                                    bis_skin_checked={1}
                                >
                                    <h3 className="text-center">Send Enquiry</h3>
                                    {/* Contact Form */}
                                    <form
                                        action="https://dhanifinancesonline.com/contact-us"
                                        method="POST"
                                    >
                                        <input
                                            type="hidden"
                                            name="_token"
                                            defaultValue="z6NRz97ildFeRlit5pkd5jxAXbgcrPncRbJZqnEf"
                                            autoComplete="off"
                                        />{" "}
                                        <div className="contact" bis_skin_checked={1}>
                                            <div className="form-group" bis_skin_checked={1}>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter your name"
                                                    defaultValue=""
                                                    required=""
                                                />
                                            </div>
                                            <div className="form-group" bis_skin_checked={1}>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    defaultValue=""
                                                    required=""
                                                />
                                            </div>
                                            <div className="form-group" bis_skin_checked={1}>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    className="form-control"
                                                    placeholder="Enter your mobile number"
                                                    defaultValue=""
                                                    required=""
                                                />
                                            </div>
                                            <div className="form-group" bis_skin_checked={1}>
                                                <textarea
                                                    name="message"
                                                    className="form-control"
                                                    height="250px"
                                                    placeholder="Enter your message"
                                                    required=""
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-contact">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    className="col-md-6 col-lg-6 col-sm-12 col-xs-12 text-center address"
                                    style={{ padding: "64px 10px" }}
                                    bis_skin_checked={1}
                                >
                                    <h2 className="text-center">Address</h2>
                                    <br />
                                    <p className="">
                                        D 114, 1st Floor, Eastern Business District, off Lal Bahadur
                                        Shastri Marg, Ganesh Nagar, Bhandup West, Mumbai, Maharashtra
                                        (400078)
                                        <br />
                                        <strong>Tel.:</strong>{" "}
                                        <a href="tel:8695754521">+91-8695754521</a>
                                        <br />
                                        <strong>
                                            E-mail :{" "}
                                            <a href="mailto:support@dhanifinancesonline.com">
                                                support@dhanifinancesonline.com
                                            </a>
                                        </strong>
                                    </p>{" "}
                                    <br />
                                    <ul className="list-inline social text-center hidden-xs">
                                        <li>
                                            <a href="https://www.facebook.com/#" target="_blank">
                                                <i className="fa fa-facebook" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/#" target="_blank">
                                                <i className="fa fa-twitter" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.youtube.com/channel/#" target="_blank">
                                                <i className="fa fa-youtube" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/company/#" target="_blank">
                                                <i className="fa fa-linkedin" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com//" target="_blank">
                                                <i className="fa fa-instagram" aria-hidden="true" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </>
}


export default ContactUs;