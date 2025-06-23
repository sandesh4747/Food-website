import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";

const testimonialData = [
  {
    id: 1,
    name: "Sarah Johnson",

    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    name: "Michael Chen",

    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: 3,
    name: "Emily Rodriguez",

    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    id: 4,
    name: "David Thompson",

    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    id: 5,
    name: "Lisa Zhang",

    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
];

export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialData.length - 3 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === testimonialData.length - 3 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  const visibleTestimonials = testimonialData.slice(
    currentIndex,
    currentIndex + 3
  );

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center gap-1 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Testimonials</h1>
        <div className="w-40 h-0.5 bg-[#d62839] text-center" />
      </div>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex gap-6 transition-transform duration-500 ease-in-out ">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className=" w-full md:w-1/3 bg-white rounded-xl shadow-lg py-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center px-4 space-y-4 ">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
                    }}
                  />
                </div>
                <FaQuoteRight className="text-4xl text-red-500 opacity-20" />
                <p className="text-gray-600 italic">{testimonial.text}</p>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-red-500">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200 z-10"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft className="text-2xl text-red-500" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200 z-10"
          aria-label="Next testimonial"
        >
          <FiChevronRight className="text-2xl text-red-500" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(testimonialData.length - 2)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              currentIndex === index ? "bg-red-500" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
