import './styles/OnlineCompiler.css';
import BackButton from '../components/buttons/BackToMain';
import Footer from '../components/layout/Footer';
import { useContext } from 'react';
import { ThemeContext } from '../../src/components/buttons/ThemeContext';

const OnlineCompiler = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    // Function to generate the iframe src
    const getIframeSrc = () => {
        return `https://onecompiler.com/embed/c?hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&fontSize=18${isDarkTheme === 'true' ? "&theme=dark" : ""}`;
    };

    return (
        <div className="OnlineCompiler">
            <BackButton />
            <div className="container mt-5">
                <div className="text-center">
                    <h1>Prog Intro Lectures</h1>
                    <h3>Χειμερινό Εξάμηνο 2024-25</h3>
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