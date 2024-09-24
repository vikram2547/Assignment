
import React, { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = "https://astralpaints.kwebmakerdigitalagency.com/graphql";
  const client = new GraphQLClient(endpoint);

  const fetchSlides = async () => {
    const query = `
      query {
        slides {  
          title
          subtitle
          image
          button {
            title
            url
            target
          }
        }
      }
    `;

    try {
      const data = await client.request(query);
      setSlides(data.slides);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides]); 

  if (loading) return <p>Loading slides...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative overflow-hidden w-full ">
      <div
        className="flex transition-transform duration-500 ease-in-out h-[600px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="text-center p-4 bg-opacity-50 rounded-lg">
              <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
              <p className="text-xl text-white mt-2">{slide.subtitle}</p>
              <a
                href={slide.button.url}
                target={slide.button.target}
                className="mt-4 inline-block bg-white text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-200 transition"
              >
                {slide.button.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        &gt;
      </button>
    </div>
  );
};

export default Banner;
