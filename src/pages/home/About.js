import React, { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = "https://astralpaints.kwebmakerdigitalagency.com/graphql";
  const client = new GraphQLClient(endpoint);

  const fetchAboutData = async () => {
    const query = `
      query {
        about { 
          videoUrl
          title
          subtitle
          features {
            description
            title
          }
        }
      }
    `;

    try {
      const data = await client.request(query);
      setAboutData(data.about);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="about-us v1 pt-14 pb-4">
      <div className="flex flex-wrap items-center">
        <div className="p-8">
          <div className="about-us-video relative">
            <video width={600} controls>
              <source
                src={aboutData.videoUrl} 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-3xl font-bold">{aboutData.title}</h2>
            <h5 className="text-lg mt-2">{aboutData.subtitle}</h5>
          </div>

          <ul>
            {aboutData.features.map((feature, index) => (
              <li key={index}>
                <i className="me-2 bi-check-circle-fill"></i>
                <p>
                  <b>{feature.title}:</b>
                  <br />
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-start pt-10">
            <button className="bg-green-500 text-black py-2 px-6 rounded hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
