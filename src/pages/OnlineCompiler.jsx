import './styles/OnlineCompiler.css';
import BackButton from '../components/buttons/BackToMain';
import Footer from '../components/layout/Footer';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../src/components/buttons/ThemeContext';

const OnlineCompiler = () => {

    const { isDarkTheme } = useContext(ThemeContext);
    const [fontSize, setFontSize] = useState('20px');

    useEffect(() => {
        const adjustFontSize = () => {
            const screenWidth = window.innerWidth;

            let newFontSize = '20'; // Default font size

            if (screenWidth < 576) {
                newFontSize = '12';
            } else if (screenWidth >= 576 && screenWidth < 768) {
                newFontSize = '14';
            } else if (screenWidth >= 768 && screenWidth < 992) {
                newFontSize = '16';
            } else if (screenWidth >= 992 && screenWidth < 1200) {
                newFontSize = '18';
            }

            // Update fontSize state
            setFontSize(newFontSize);
        };

        // Adjust font size on component mount
        adjustFontSize();

        // Add event listener for window resize
        window.addEventListener('resize', adjustFontSize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, []); // Empty dependency array ensures this runs once when the component mounts


    // Function to generate the iframe src
    const getIframeSrc = () => {
        return `https://onecompiler.com/embed/c?hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&fontSize=${fontSize}${isDarkTheme === 'false' ? "&theme=dark" : ""}`;
    };

    return (
        <div className="OnlineCompiler">
            <BackButton />
            <div className="container mt-5">
                <div className="text-center">
                    <h1>Online Compiler</h1>
                    <h3>Time for some practice!</h3>
                    <hr className="my-4" />
                </div>      
            </div>
            <iframe className="cards d-flex justify-content-center flex-wrap gap-3 code-editor"
                src={getIframeSrc()} 
                width="100%"
                title="code-editor"
            ></iframe> 
        <Footer />
        </div>
    );
}

export default OnlineCompiler;