export const About = () => {
  return (
    <div id="about" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-business-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your Business Partner
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We are committed to delivering excellence in business solutions and technical support
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-blue mx-auto lg:max-w-3xl">
            <p className="text-gray-500">
              With years of experience in the industry, we understand the challenges businesses face in today's dynamic environment. Our team of experts is dedicated to providing innovative solutions that help your business thrive.
            </p>
            <p className="text-gray-500 mt-4">
              We pride ourselves on our commitment to quality, reliability, and customer satisfaction. Our comprehensive approach ensures that we address all aspects of your business needs, from technical support to strategic planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};