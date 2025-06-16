

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="my-10 text-center md:w-4/12 mx-auto">
            <p className="text-yellow-600 mb-2">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-gray-300 border-y-4 py-3">{heading}</h3>
        </div>
    );
};

export default SectionTitle;