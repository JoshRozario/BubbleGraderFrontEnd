import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 px-4 py-2 shadow-md">
            <div className="container md:px-20 mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg font-semibold hover:text-blue-300">
                Home
                </a>
                <div>
                <a href="/upload-instructions" className="text-white text-lg hover:text-blue-300">
                    Upload Instructions
                </a>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
