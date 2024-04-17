import React from "react";

const ProdStatsLinks = ({ singleProdGot }) => {
  return (
    <div className="container mx-auto text-center py-24">
      <h1 className="text-5xl font-bold mb-4">Product Stats and Links</h1>
      <p className="text-lg text-gray-600 mb-16">
        Gain valuable insights into the product and explore competitor ads and
        shops.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-lg font-medium mb-4">Product Competitiveness:</h2>
          <div className="relative h-10 bg-gray-200 rounded-full">
            <div
              class={`bg-blue-500 absolute top-0 left-0 h-full ${
                singleProdGot?.competitivness === 1
                  ? "w-[10%]"
                  : singleProdGot?.competitivness === 2
                  ? "w-[20%]"
                  : singleProdGot?.competitivness === 3
                  ? "w-[30%]"
                  : singleProdGot?.competitivness === 4
                  ? "w-[40%]"
                  : singleProdGot?.competitivness === 5
                  ? "w-[50%]"
                  : singleProdGot?.competitivness === 6
                  ? "w-[60%]"
                  : singleProdGot?.competitivness === 7
                  ? "w-[70%]"
                  : singleProdGot?.competitivness === 8
                  ? "w-[80%]"
                  : singleProdGot?.competitivness === 9
                  ? "w-[90%]"
                  : singleProdGot?.competitivness === 10
                  ? "w-[100%]"
                  : null
              } rounded-2xl`}
            >
              <span class="bg-blue-500 absolute -right-4 bottom-full mb-2 rounded-sm py-1 px-2 text-xs font-semibold text-white">
                <span class="bg-blue-500 absolute bottom-[-2px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm"></span>
                {singleProdGot?.competitivness === 1
                  ? "1"
                  : singleProdGot?.competitivness === 2
                  ? "2"
                  : singleProdGot?.competitivness === 3
                  ? "3"
                  : singleProdGot?.competitivness === 4
                  ? "4"
                  : singleProdGot?.competitivness === 5
                  ? "5"
                  : singleProdGot?.competitivness === 6
                  ? "6"
                  : singleProdGot?.competitivness === 7
                  ? "7"
                  : singleProdGot?.competitivness === 8
                  ? "8"
                  : singleProdGot?.competitivness === 9
                  ? "9"
                  : singleProdGot?.competitivness === 10
                  ? "10"
                  : null}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Competitor Link:</h2>
          <a
            href={singleProdGot?.competitorShop}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-blue-400 border border-gray-900 rounded-md hover:text-blue-500"
          >
            Competitor Shop Link
          </a>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">
            Aliexpress Link for Original Product:
          </h2>
          <a
            href={singleProdGot?.aliexpressLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-blue-400 border border-gray-900 rounded-md hover:text-blue-500"
          >
            Aliexpress Link to Original Product
          </a>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Product Popularity:</h2>
          <p className="text-2xl font-semibold text-indigo-600">
            The Product is:{" "}
            <span id="popularityValue">{singleProdGot?.popularity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdStatsLinks;
