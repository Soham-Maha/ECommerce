import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFreeProd } from "../../redux/slices/products/productsSlices.js";
import DateFormatter from "../../utils/dateFormate.js";

const ProductsFree = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.users);
  const { allFreeProductsGot } = useSelector((state) => state?.products);

  //pagnation variables
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const npage = Math.ceil(allFreeProductsGot?.slice(firstIndex, lastIndex));
  const records = allFreeProductsGot?.slice(firstIndex, lastIndex);
  const numbers = Array.from({ length: npage }, (_, index) => index + 1);

  useEffect(() => {
    dispatch(fetchFreeProd());
  }, [dispatch]);

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(changeCPage + 1);
    }
  };

  return (
    <div>
      <section class="pt-10 pb-10 lg:pb-20 bg-gray-100/80  font-poppins">
        <div class="container mx-auto ">
          <div class="-mx-4 flex flex-wrap justify-center">
            <div class="w-full px-4">
              <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span class="text-primary mb-2 block text-lg font-semibold">
                  Our Free Weekly Winning Products. A Sneak Peak!
                </span>
                <h2 class="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                  Save More Time, Test More Products!
                </h2>
              </div>
            </div>
          </div>
          <div></div>
          <div class="-mx-4 flex flex-wrap">
            {/* {map the records */}
            {records?.map((singleProd) => {
              return (
                <>
                  <div class="w-full px-4 md:w-1/2 lg:w-1/3 flex justify-between">
                    <div class="mx-auto mb-10 max-w-[370px] bg-white  rounded-xl p-2">
                      <div className="flex justify-between"></div>
                      <div class="mb-8 overflow-hidden rounded-lg">
                        <img
                          src={singleProd.image1}
                          alt="image1"
                          class="w-full"
                        />
                      </div>
                      <div className="px-2 pb-4">
                        <span class="bg-blue-400/90 mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                          <DateFormatter date={singleProd.createdAt} />
                        </span>
                        <h3>
                          <Link
                            to={`/productFree/${singleProd._id}`}
                            class="text-black hover:text-gray-800 mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                          >
                            {singleProd.title}
                          </Link>
                        </h3>
                        <p class="text-body-color text-base">
                          {singleProd.descriptionHero?.slice(0, 170)}
                        </p>
                        <p className="pt-4 font-semibold flex justify-between ">
                          <p className="pl-2">Price of Goods:</p>{" "}
                          <p className="pr-2">{singleProd.priceOfGoods}$</p>
                        </p>
                        <div className="h-[1px] block bg-gray-200 w-full"></div>
                        <p className="pt-4 font-semibold flex justify-between ">
                          <p className="pl-2">Sell Price:</p>{" "}
                          <p className="pr-2">{singleProd.sellPrice}$</p>
                        </p>
                        <div className="h-[1px] block bg-gray-200 w-full"></div>
                        <p className="pt-4 font-semibold flex justify-between ">
                          <p className="pl-2">Estimated Profit:</p>{" "}
                          <p className="pr-2">
                            {singleProd.sellPrice - singleProd.priceOfGoods}$
                          </p>
                        </p>
                        <div className="h-[1px] block bg-green-200 w-full"></div>

                        <p className="pt-4 font-semibold flex justify-between ">
                          <p className="pl-2">Platform:</p>{" "}
                          <p
                            className={`pr-2 ${
                              singleProd.bestPlatform === "Tiktok"
                                ? "text-red-500"
                                : singleProd.bestPlatform === "Facebook"
                                ? "text-blue-600"
                                : singleProd.bestPlatform === "Google"
                                ? "text-orange-500"
                                : null
                            }`}
                          >
                            {singleProd.bestPlatform}
                          </p>
                        </p>
                        <div className="flex flex-col justify-">
                          <Link
                            to={`/productFree/${singleProd._id}`}
                            class="bg-blue-500 sm:mt-10 items-center rounded-lg py-2 px-6 text-center text-white hover:bg-blue-600 "
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-full ">
          <ul className="flex w-full justify-center">
            <li className="text-3xl mr-4 ">
              <Link
                className="border rounded-lg px-4 transition-all delay-150 duration-300 hover:bg-blue-600 bg-blue-500 text-white"
                onClick={prePage}
              >
                Prev
              </Link>
            </li>
            {/* {map the numbers */}
            {numbers.map((n, i) => (
              <li
                className={`text-3xl mx-2 ${
                  currentPage === n ? "text-blue-500" : "text-gray-700"
                }`}
                key={i}
              >
                <Link onClick={() => changeCPage(n)}>{n}</Link>
              </li>
            ))}
            <li className="text-3xl ml-4">
              <Link
                className="border rounded-lg px-4 transition-all delay-150 duration-300 hover:bg-blue-600 bg-blue-500 text-white"
                onClick={nextPage}
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductsFree;
