import Head from "next/head";
import Colours from "./home/Colours";
import Services from "./home/Services";
import About from "./home/About";
import Banner from "./home/Banner";
import CallToAction from "./home/CallToAction";

export default function Home({ data }) {
  return (
    <div>
      <Head />

      <Banner />

      <About />

      <Services />

      <Colours />

      <CallToAction />

    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://astralpaints.kwebmakerdigitalagency.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        pages(where: {name: "Homepage"}) {
          nodes {
            homepage {
              banners {
                bannerImage {
                  node {
                    sourceUrl
                  }
                }
                bannersTitle
                bannerDescription
                bannerButton {
                  title
                  url
                  target
                }
              }
              homeAboutTitle
              homeAboutSubtitle
              homeAboutButton {
                target
                title
                url
              }
              homeAboutVideoImage {
                node {
                  sourceUrl
                }
              }
              homeAboutVideoUrl
              homeAboutDescription
              homeServicesTitle
              homeServicesSubtitle
            }
            seo {
              canonical
              metaDesc
              title
            }
          }
        }
        allColourCategory(where: {slug: "popular"}) {
          nodes {
            name
            colours {
              nodes {
                title
                slug
                colourInfo {
                  selectColor
                  colourRgb
                }
              }
            }
          }
        }
        blogs {
          nodes {
            featuredImage {
              node {
                sourceUrl
                slug
              }
            }
            slug
            title
            date
          }
        }
      }
      `,
      }),
    }
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
