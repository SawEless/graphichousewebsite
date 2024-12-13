import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  image: string;
  name: string;
  position: string;
  secondaryPosition?: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, position, secondaryPosition, quote }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden bg-gray-900 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/20 border border-gray-800 font-sans"
  >
    <div className="px-8 py-12">
      <div className="relative w-32 h-32 mx-auto mb-8">
        <img className="relative object-cover w-32 h-32 mx-auto rounded-full" src={image} alt={name} />
        <div className="absolute top-0 right-0 flex items-center justify-center bg-yellow-400 rounded-full w-8 h-8">
          <svg className="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
        </div>
      </div>
      <blockquote className="mt-7">
        <p className="text-lg text-gray-300 font-sans">{quote}</p>
      </blockquote>
      <p className="text-base font-semibold text-yellow-400 mt-9 font-sans">{name}</p>
      <p className="mt-1 text-base text-gray-400 font-sans">{position}</p>
      {secondaryPosition && (
        <p className="text-base text-gray-400 font-sans">{secondaryPosition}</p>
      )}
    </div>
  </motion.div>
);

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-white sm:py-20 lg:py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold leading-tight text-gray-600 sm:text-4xl lg:text-5xl font-sans">
            Trusted by <span className="text-dark">10k+</span> businesses for quality printing
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-sans">
            From startups to Fortune 500 companies, we deliver excellence in every print.
          </p>
        </motion.div>
        
        <div className="grid max-w-xl grid-cols-1 mx-auto mt-8 lg:max-w-full sm:mt-16 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-10">
          <TestimonialCard 
            image="/images/testimonial/nk.jpeg"
            name="Narayan Karki"
            position="Chamber of Commerce and Industry, Sundarharaincha, Morang, President 2024"
            secondaryPosition="Social Worker, Businessman"
            quote="I had the pleasure of working with Graphic House Printing Press, and I am thoroughly impressed with their service! Their team was professional and responsive. They also delivered on time, which was critical for my project. The entire process was seamless, and their attention to detail made a huge difference. I highly recommend Graphic House for any printing needs. Excellent service, high-quality output, and fantastic customer care!"
          />
          <TestimonialCard 
            image="/images/testimonial/ut.jpeg"
            name="Utshab Thapa"
            position="JCI Indrapur President 2024"
            secondaryPosition="Social Worker , Businessman"
            quote="Graphic House Printing Press offers high-quality printing services for a variety of needs, including printing services and custom materials. They are known for their attention to detail, vibrant colors, and professional finishes. I appreciate their quick turnaround times and the helpful customer service team. The pricing is competitive, making it a go-to option for both small businesses and large projects. Overall, it is a reliable and efficient choice for printing needs!"
          />
          <TestimonialCard 
            image="/images/testimonial/roshan.jpg"
            name="Roshan Khanel"
            position="Former IT Officer"
            secondaryPosition="Computer Operator , Sundarharaincha Municipality"
            quote="Graphic House Designing & Printing Shop delivered exceptional service from start to finish. Their design team brought creative ideas to life, and the print quality was flawless—sharp, vibrant, and professional. The staff was attentive and responsive, ensuring everything met my expectations. They also delivered on time, even with a tight deadline. Highly recommend for top-quality design and printing services!"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
