import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-3">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/team'>Team</Link></li>
                        <li><Link to='/simulator'>Simulator</Link></li>
                        <li><Link to='/developmentblog'>Development Blog</Link></li>
                        <li><Link to='/contactus'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-3">
                    <h5>Our Address</h5>
                    <address>
		              3400 North Charles Street<br />
		              Baltimore, MD 21218<br />
		              The United States<br />
		              <i className="fa fa-phone fa-lg"></i>: 410-516-8775<br />
		              <i className="fa fa-envelope fa-lg"></i>: contactus@cs.jhu.edu<br />
		              <i className="fa fa-globe fa-lg"></i>: <a href="https://engineering.jhu.edu/fields-of-study/computer-science/">https://engineering.jhu.edu/fields-of-study/computer-science/</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;