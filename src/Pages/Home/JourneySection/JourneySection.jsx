import React from 'react';

const JourneySection = () => {
    return (
        <div>
            <section className="w-11/12 mx-auto rounded-2xl my-10 bg-gradient-to-r from-green-600 to-green-900 text-white py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Ready to Start Our Journey?
                    </h2>
                    <p className="text-gray-200  dark:text-gray-200 max-w-2xl mx-auto mb-8">
                        Find your perfect home from our top-quality listings or become a host and
                        share your property with thousands of potential renters worldwide.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/properties"
                            className="px-6 py-3 rounded-lg border-2 hover:bg-gray-200 bg-white text-green-600 border-green-400 font-semibold transition"
                        >
                            Browse Property
                        </a>
                        <a
                            href="/host"
                            className="px-6 py-3 rounded-lg border-2 border-white font-semibold hover:bg-white hover:text-blue-900 transition"
                        >
                            Become a Host
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JourneySection;