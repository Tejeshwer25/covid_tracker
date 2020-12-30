import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            Hey there, Tejeshwer here!!!<br/>
            Connect with me at: 
            <ul className="footer__list">
                <li><a href="https://www.linkedin.com/in/tejeshwer-singh-sachdeva-1961a9191/"><LinkedInIcon /></a></li>
                <li><a href="https://www.github.com/Tejeshwer25"><GitHubIcon /></a></li>
            </ul>
        </div>
    );
};

export default Footer;