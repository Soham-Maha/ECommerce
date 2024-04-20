import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProdFree } from "../../redux/slices/products/productsSlices.js";
import { saveAs } from "file-saver";
import ProdStatsLinks from "../../components/ProdStatsLinks/ProdStatsLinks.jsx";
import ReactPlayer from "react-player";
import ProdDescriptions from "../../components/ProdDescriptions/ProdDescriptions.jsx";

const ProductDetailsFree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector((state) => state?.users);
  const { singleProdFree: singleProdGotFree } = useSelector(
    (state) => state?.products
  );

  useEffect(() => {
    dispatch(singleProdFree(id));
    window.scrollTo({ top: 0, left: 0 });
  }, [dispatch]);

  const [image, setImage] = useState("1");

  const downloadImages = (imageUrls) => {
    imageUrls.forEach((imageUrl, index) => {
      if (imageUrl === undefined) {
        return null;
      }
      const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      saveAs(imageUrl, `${index + 1}_${filename}`);
    });
  };

  const downloadVideos = (imageUrls) => {
    imageUrls.forEach((imageUrl, index) => {
      if (imageUrl.endsWith(".mov") || imageUrl.endsWith(".mp4")) {
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        saveAs(imageUrl, `${index + 1}_${filename}`);
      } else {
        return null;
      }
    });
  };

  return (
    <div className="overflow-hidden font-poppins px-4 bg-gray-50">
      <div className=" w-full sm:flex">
        <div className="sm:w-[57%] mt-20 h-[55rem]">
          <img
            className={`sm:h-[30rem] rounded-2xl items-center mx-auto border-2 border-gray-100 `}
            src={
              image === "1"
                ? singleProdGotFree?.image1
                : image === "2"
                ? singleProdGotFree?.image2
                : image === "3"
                ? singleProdGotFree?.image3
                : image === "4"
                ? singleProdGotFree?.image4
                : image === "5"
                ? singleProdGotFree?.image5
                : image === "6"
                ? singleProdGotFree?.image6
                : image === "7"
                ? singleProdGotFree?.image7
                : image === "8"
                ? singleProdGotFree?.image8
                : null
            }
            alt="image1"
          ></img>
          <div className="grid cursor-pointer place-items-center sm:grid-cols-4 grid-cols-2 mt-4 ">
            {" "}
            {singleProdGotFree?.image1 !== undefined &&
            !singleProdGotFree?.image1.endsWith("mp4") ? (
              <img
                onClick={() => setImage("1")}
                className="h-[10rem] rounded-lg p-[3px]"
                src={singleProdGotFree?.image1}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image2 !== undefined &&
            !singleProdGotFree?.image2.endsWith("mp4") ? (
              <img
                onClick={() => setImage("2")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image2}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image3 !== undefined &&
            !singleProdGotFree?.image3.endsWith("mp4") ? (
              <img
                onClick={() => setImage("3")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image3}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image4 !== undefined &&
            !singleProdGotFree?.image4.endsWith("mp4") ? (
              <img
                onClick={() => setImage("4")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image4}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image5 !== undefined &&
            !singleProdGotFree?.image5.endsWith("mp4") ? (
              <img
                onClick={() => setImage("5")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image5}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image6 !== undefined &&
            !singleProdGotFree?.image6.endsWith("mp4") ? (
              <img
                onClick={() => setImage("6")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image6}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image7 !== undefined &&
            !singleProdGotFree?.image7.endsWith("mp4") ? (
              <img
                onClick={() => setImage("7")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image7}
                alt="image1"
              ></img>
            ) : null}
            {singleProdGotFree?.image8 !== undefined &&
            !singleProdGotFree?.image8.endsWith("mp4") ? (
              <img
                onClick={() => setImage("8")}
                className="h-[10rem] cursor-pointer rounded-lg p-[3px]"
                src={singleProdGotFree?.image8}
                alt="image1"
              ></img>
            ) : null}
          </div>
        </div>
        <div className="sm:w-[43%] sm:mt-20 h-[55rem]">
          <h1 className="text-4xl">{singleProdGotFree?.title}</h1>
          <p className="mt-10 text-sm ml-8">
            Best Platform to Sell:{" "}
            <span
              className={`ml-4 border-2 border-green-200 rounded-md text-lg font-medium px-2 py-[2px] ${
                singleProdGotFree?.bestPlatform === "Google"
                  ? "text-orange-500"
                  : singleProdGotFree?.bestPlatform === "Facebook"
                  ? "text-blue-500"
                  : singleProdGotFree?.bestPlatform === "Tiktok"
                  ? "text-gray-900"
                  : null
              }`}
            >
              {singleProdGotFree?.bestPlatform}
            </span>
            <p className="mt-6">
              Category:{" "}
              <span className="text-lg font-medium ml-4 border-2 border-blue-200 rounded-md px-2 py-[2px]">
                {singleProdGotFree?.category}
              </span>
            </p>
          </p>
          <div className="w-full h-[2px] bg-gray-200 sm:mt-10"></div>
          <p className="mt-8 ml-8 ">Description #1:</p>
          <p className="mt-2 text-center ">
            {singleProdGotFree?.descriptionHero}
          </p>

          <div className="w-full h-[2px] bg-gray-200 sm:mt-10"></div>
          <p className="mt-8 ml-8 text-xl ">
            Price of Goods:{" "}
            <span className="border-2 ml-2 border-orange-400 rounded-md text-lg font-medium px-2 py-[2px]">
              {singleProdGotFree?.priceOfGoods}$
            </span>
          </p>
          <p className="mt-4 ml-8 text-xl ">
            Average Selling Price:{" "}
            <span className="border-2 ml-2 border-teal-400 rounded-md text-lg font-medium px-2 py-[2px]">
              {singleProdGotFree?.sellPrice}$
            </span>
          </p>
          <p className="mt-6 ml-8 text-3xl">
            Estimated Profit:{" "}
            <span className="border-2 ml-2 text-3xl border-emerald-500 rounded-md font-medium px-2 ">
              {singleProdGotFree?.sellPrice - singleProdGotFree?.priceOfGoods}$
            </span>
          </p>
          <div className="mt-14 sm:ml-8 flex justify-start">
            <button
              onClick={() =>
                downloadImages([
                  singleProdGotFree?.image1,
                  singleProdGotFree?.image2,
                  singleProdGotFree?.image3,
                  singleProdGotFree?.image4,
                  singleProdGotFree?.image5,
                  singleProdGotFree?.image6,
                  singleProdGotFree?.image7,
                  singleProdGotFree?.image8,
                  singleProdGotFree?.image9,
                  singleProdGotFree?.image10,
                ])
              }
              className="sm:mr-8 mr-4 ml-2 sm:ml-0 bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-4 py-2 "
            >
              Download Images
            </button>
            <button
              onClick={() =>
                downloadVideos([
                  singleProdGotFree?.creative1,
                  singleProdGotFree?.creative2,
                ])
              }
              className=" bg-blue-500 ml-4 mr-2 sm:ml-0 sm:mr-0 text-white rounded-lg hover:bg-blue-600 px-4 py-2"
            >
              Download Creatives
            </button>
          </div>
        </div>
      </div>

      {/* product Video */}
      <h1 className="text-center text-5xl sm:mt-14">Product Creatives</h1>
      <p className="text-center mt-[3px]">
        You can download the creatives throught the player or through the
        Download Creatives Button
      </p>
      <div className="text-center ">
        <div className="mt-20 inline-block mr-[5%] h-[40rem] ">
          {singleProdGotFree?.creative1 ===
          "creative 1 to be uploaded" ? null : (
            <ReactPlayer
              width="100%"
              height="100%"
              className=""
              controls
              url={singleProdGotFree?.creative1}
            />
          )}
        </div>
        <div className="mt-10 inline-block ml-[5%] h-[40rem]">
          {singleProdGotFree?.creative2 ===
          "creative 2 to be uploaded" ? null : (
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              url={singleProdGotFree?.creative2}
            />
          )}
        </div>
      </div>

      {/* product video end */}

      {/* prod descriptiosn*/}
      <ProdDescriptions singleProd={singleProdGotFree} />
      {/* prod desc end */}
      <ProdStatsLinks singleProdGot={singleProdGotFree} />
    </div>
  );
};

export default ProductDetailsFree;
