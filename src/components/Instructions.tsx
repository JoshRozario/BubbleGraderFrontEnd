import withBG from '../assets/withBG.png';
import noBG from '../assets/noBG.png';

const ImageUploadInstructions = () => {
    return (
        <div className="flex flex-col items-center  min-h-screen bg-gray-900 text-white w-full ">
            <h1 className="text-4xl font-bold mb-4 pt-5">Image Upload Instructions</h1>
            <p className="text-base pt-2">
                Images of the same test can be uploaded in bulk and must be of same view
            </p>
            <p className='mt-4'>
                This means that they are either all without any borders or backgrounds - as in only the page is on the screen
            </p>
            <img className='my-5' src={noBG} alt="quiz with no BG" />
            <p>
                or that there is a background for all of them - as in background objects or colours are in your scan or picture
            </p>
            <img  className='my-5' src={withBG} alt="quiz with BG" />
        </div>
    );
};

export default ImageUploadInstructions;
