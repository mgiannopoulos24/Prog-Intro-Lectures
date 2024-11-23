import React from "react";
import "./styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer mt-5">
            <div className="container text-center py-3">
                <p>&copy; {new Date().getFullYear()} Prog Intro Lectures. All rights reserved.</p>
                <p>Designed and Developed by <a href="https://github.com/matinanadali" target="_blank" rel="noopener noreferrer">matinanadali</a> and <a href="https://github.com/mgiannopoulos24"target="_blank" rel="noopener noreferrer">mgiannopoulos24</a>.</p>
            </div>
        </footer>
    );
}

export default Footer;