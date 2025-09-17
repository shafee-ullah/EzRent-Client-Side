import { useEffect, useState } from "react";

const stats = [
    { id: 1, label: "Years of Experience", value: 15 },
    { id: 2, label: "Qualified Realtors", value: 23 },
    { id: 3, label: "Best Properties", value: 849 },
];

// Counter animation hook
const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16); // ~60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return count;
};

const AboutCompany = () => {
    const years = useCounter(stats[0].value);
    const realtors = useCounter(stats[1].value);
    const properties = useCounter(stats[2].value);

    return (
        <section className="py-16 px-6 md:px-12">
            <div className="max-w-11/12 mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Left Image */}
                <div className="overflow-hidden rounded-lg shadow-lg flex justify-center items-center bg-gray-100">
                    <img
                        src="https://i.ibb.co.com/1fBjBtrc/group-architects-front-modern-building-1.jpg"
                        alt="Company Building"
                        className="w-full h-[350px] object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-semibold dark:text-gray-200 text-gray-800 mb-4">
                        Something About Our Company
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400  mb-8">
                        Browse the highest quality listings, apply online, sign your lease,
                        and even pay your rent from any device.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-12 lg:mb-15 flex-wrap">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-700">
                                {years}+
                            </h3>
                            <p className="text-gray-500">Years of Experience</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-700">
                                {realtors}
                            </h3>
                            <p className="text-gray-500">Qualified Realtors</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-700">
                                {properties}
                            </h3>
                            <p className="text-gray-500">Best Properties</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Image */}
                <div className="overflow-hidden rounded-lg shadow-lg md:col-span-2 flex justify-center items-center bg-gray-100">
                    <img
                        src="https://i.ibb.co.com/zhVmSnDr/highrise-1-1.jpg"
                        alt="Company Apartments"
                        className="w-full h-[250px] object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutCompany;
