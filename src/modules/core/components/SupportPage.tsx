const Support = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h1>
            
            <section className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact & Support</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        For technical issues, questions, or feedback, you can contact the support team.
                    </p>
                    <p className="text-gray-600 font-medium">
                        Email: <a href="mailto:leonardo.herrera@fundacion-jala.org" className="text-purple-600 hover:underline">leonardo.herrera@fundacion-jala.org</a>
                    </p>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-800">Do I need an account to use the Admin Dashboard?</h3>
                        [cite_start]<p className="text-gray-600">Yes, only users with an assigned Admin role and a valid Tenant ID can access the platform. [cite: 277]</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800">What should I do if I forget my password?</h3>
                        <p className="text-gray-600">On the login screen, click "Forgot Password." [cite_start]You will receive an email with a link to reset it. [cite: 279]</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800">Can I use DecorAR offline?</h3>
                        [cite_start]<p className="text-gray-600">No, a stable internet connection is required to access and use the system. [cite: 284]</p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-gray-800">How do I edit an existing product?</h3>
                        [cite_start]<p className="text-gray-600">Go to Products {">"} All Products, click "Edit" next to the product, update the fields, and then click "Update." [cite: 293]</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800">Can I recover a deleted product?</h3>
                        <p className="text-gray-600">Yes. Products are soft-deleted, which means they are hidden but retained in the database. [cite_start]Contact support to request restoration. [cite: 288]</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Support;