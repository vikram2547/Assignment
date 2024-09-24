import React, { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = "https://astralpaints.kwebmakerdigitalagency.com/graphql";
  const client = new GraphQLClient(endpoint);

  const fetchServices = async () => {
    const query = `
      query {
        userRoles {
          edges {
            node {
              id
              name
              image  
              description 
            }
          }
        }
      }
    `;

    try {
      const data = await client.request(query);
      if (data.userRoles.edges.length > 0) {
        setServices(data.userRoles.edges.map(edge => edge.node)); 
      } else {
        setServices([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Services</h2>
        <h5 className="text-lg mt-2">Make Your Life Comfortable</h5>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={service.id}
            >
              {service.image && (
                <img
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="text-gray-700 mt-2">{service.description}</p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="mt-4 inline-block bg-white text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No services available at the moment.</p> 
        )}
      </div>
    </div>
  );
}

export default Services;
