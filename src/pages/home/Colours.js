import React, { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = "https://astralpaints.kwebmakerdigitalagency.com/graphql";
  const client = new GraphQLClient(endpoint);

  const fetchColors = async () => {
    const query = `
      query {
        colors { 
          edges {
            node {
              name
              code
            }
          }
        }
      }
    `;

    try {
      const data = await client.request(query);
      setColors(data.colors.edges.map(edge => edge.node));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Colors</h1>
        <h5 className="text-lg mt-2">Popular Colours</h5>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {colors.length > 0 ? (
          colors.map((color) => (
            <div
              key={color.code}
              className="relative group w-full h-32 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              style={{ backgroundColor: color.code }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <div>
                  <p>Colour Name: {color.name}</p>
                  <p>Code: {color.code}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No colors available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Colors;
