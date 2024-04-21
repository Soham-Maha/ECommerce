import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllProducts, fetchPaidProd} from '../../redux/slices/products/productsSlices.js'
import DateFormater from "../../utils/dateFormate.js";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {saveProductAction, unsaveProductAction, userDetailsAction} from '../../redux/slices/users/usersSlices.js'

const PaidProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, userDetails } = useSelector((state) => state?.users);

  const gotUser = userDetails
  console.log(gotUser);

  const savedProducts = gotUser?.saved?.map((product) => {

    return product._id;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("All");

  const { aLLProductsGot: allProductsGot } = useSelector(
    (state) => state?.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(userDetailsAction())
    
  }, [dispatch]);

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, [])

  //pagnation states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const npage = Math.ceil(allProductsGot?.length / recordsPerPage);
  const records = allProductsGot?.slice(firstIndex, lastIndex);

  const numbers = Array.from({length: npage}, (_, index) => index + 1);

  const handleLike = (idBack)=> {
    dispatch(saveProductAction(idBack))
    dispatch(userDetailsAction());
    dispatch(userDetailsAction());
  }

  const handleDislike = (idBack)=> {
    dispatch(unsaveProductAction(idBack))
    dispatch(userDetailsAction())
    dispatch(userDetailsAction());
  }

  const prePage = ()=> {
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id)
  };

  const nextPage = ()=> {
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1)
    }
  };
  
  return (
    <div className="overflow-hidden w-full">
      <section class="pt-10 pb-10 lg:pb-20 bg-gray-100/80  font-poppins">
        <div class="container mx-auto ">
          <div class="-mx-4 flex flex-wrap justify-center">
            <div class="w-full px-4">
              <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span class="text-primary mb-2 block text-lg font-semibold">
                  Our Premium Weekly Winning Products
                </span>
                <h2 class="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                  Save More Time, Test More Products!
                </h2>
              </div>
            </div>
          </div>
          <div className="flex sm:ml-32 ml-6">
            <div class="py-8 text-center mr-6">
              <div class="relative mb-8 inline-block sm:-ml-[75%] text-left w-[10rem]">
                <p className="ml-2 text-sm mb-2">Select a Platform:</p>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  class="bg-white flex items-center justify-between rounded py-3 w-[10rem] px-5 text-base font-semibold text-black"
                >
                  {filter === "all" ? "All Products" : filter}
                  <span class="pl-2">
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      class="fill-current"
                    >
                      <path d="M0.564864 0.879232C0.564864 0.808624 0.600168 0.720364 0.653125 0.667408C0.776689 0.543843 0.970861 0.543844 1.09443 0.649756L5.82517 5.09807C5.91343 5.18633 6.07229 5.18633 6.17821 5.09807L10.9089 0.649756C11.0325 0.526192 11.2267 0.543844 11.3502 0.667408C11.4738 0.790972 11.4562 0.985145 11.3326 1.10871L6.60185 5.55702C6.26647 5.85711 5.73691 5.85711 5.41917 5.55702L0.670776 1.10871C0.600168 1.0381 0.564864 0.967492 0.564864 0.879232Z" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.4719 0.229332L6.00169 4.48868L10.5171 0.24288C10.9015 -0.133119 11.4504 -0.0312785 11.7497 0.267983C12.1344 0.652758 12.0332 1.2069 11.732 1.50812L11.7197 1.52041L6.97862 5.9781C6.43509 6.46442 5.57339 6.47872 5.03222 5.96853C5.03192 5.96825 5.03252 5.96881 5.03222 5.96853L0.271144 1.50833C0.123314 1.3605 -5.04223e-08 1.15353 -3.84322e-08 0.879226C-2.88721e-08 0.660517 0.0936127 0.428074 0.253705 0.267982C0.593641 -0.0719548 1.12269 -0.0699964 1.46204 0.220873L1.4719 0.229332ZM5.41917 5.55702C5.73691 5.85711 6.26647 5.85711 6.60185 5.55702L11.3326 1.10871C11.4562 0.985145 11.4738 0.790972 11.3502 0.667408C11.2267 0.543844 11.0325 0.526192 10.9089 0.649756L6.17821 5.09807C6.07229 5.18633 5.91343 5.18633 5.82517 5.09807L1.09443 0.649756C0.970861 0.543844 0.776689 0.543843 0.653125 0.667408C0.600168 0.720364 0.564864 0.808624 0.564864 0.879232C0.564864 0.967492 0.600168 1.0381 0.670776 1.10871L5.41917 5.55702Z"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  class={`${
                    dropdownOpen
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  } border-light shadow-card absolute left-0 z-40 mt-2 w-full rounded border-[.5px] bg-white py-5 transition-all`}
                >
                  <Link
                    onClick={() => {
                      setDropdownOpen(false);
                      setFilter("all");
                    }}
                    to={"/premiumProducts"}
                    class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                  >
                    All Products
                  </Link>
                  <Link
                    onClick={() => {
                      setDropdownOpen(false);
                      setFilter("Facebook");
                    }}
                    to={"/premiumProductsFacebook"}
                    class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                  >
                    Facebook
                  </Link>
                  <Link
                    onClick={() => {
                      setDropdownOpen(false);
                      setFilter("Tiktok");
                    }}
                    to={"/premiumProductsTiktok"}
                    class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                  >
                    TikTok
                  </Link>
                  <Link
                    onClick={() => {
                      setDropdownOpen(false);
                      setFilter("Google");
                    }}
                    to={"/premiumProductsGoogle"}
                    class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                  >
                    Google Ads
                  </Link>
                </div>
              </div>
            </div>
            {/* category filter */}
            <div class="py-8 text-center ">
              <div class="relative mb-8 inline-block sm:-ml-[25%] text-left w-[35rem]">
                <p className="ml-2 text-sm mb-2">Select a Category:</p>
                <button
                  onClick={() => setDropdownOpen2(!dropdownOpen2)}
                  class="bg-white flex items-center justify-between rounded py-3 w-[10rem] px-5 text-base font-semibold text-black"
                >
                  {category === "All" ? "All" : category}
                  <span class="pl-2">
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      class="fill-current"
                    >
                      <path d="M0.564864 0.879232C0.564864 0.808624 0.600168 0.720364 0.653125 0.667408C0.776689 0.543843 0.970861 0.543844 1.09443 0.649756L5.82517 5.09807C5.91343 5.18633 6.07229 5.18633 6.17821 5.09807L10.9089 0.649756C11.0325 0.526192 11.2267 0.543844 11.3502 0.667408C11.4738 0.790972 11.4562 0.985145 11.3326 1.10871L6.60185 5.55702C6.26647 5.85711 5.73691 5.85711 5.41917 5.55702L0.670776 1.10871C0.600168 1.0381 0.564864 0.967492 0.564864 0.879232Z" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.4719 0.229332L6.00169 4.48868L10.5171 0.24288C10.9015 -0.133119 11.4504 -0.0312785 11.7497 0.267983C12.1344 0.652758 12.0332 1.2069 11.732 1.50812L11.7197 1.52041L6.97862 5.9781C6.43509 6.46442 5.57339 6.47872 5.03222 5.96853C5.03192 5.96825 5.03252 5.96881 5.03222 5.96853L0.271144 1.50833C0.123314 1.3605 -5.04223e-08 1.15353 -3.84322e-08 0.879226C-2.88721e-08 0.660517 0.0936127 0.428074 0.253705 0.267982C0.593641 -0.0719548 1.12269 -0.0699964 1.46204 0.220873L1.4719 0.229332ZM5.41917 5.55702C5.73691 5.85711 6.26647 5.85711 6.60185 5.55702L11.3326 1.10871C11.4562 0.985145 11.4738 0.790972 11.3502 0.667408C11.2267 0.543844 11.0325 0.526192 10.9089 0.649756L6.17821 5.09807C6.07229 5.18633 5.91343 5.18633 5.82517 5.09807L1.09443 0.649756C0.970861 0.543844 0.776689 0.543843 0.653125 0.667408C0.600168 0.720364 0.564864 0.808624 0.564864 0.879232C0.564864 0.967492 0.600168 1.0381 0.670776 1.10871L5.41917 5.55702Z"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  class={`${
                    dropdownOpen2
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  } border-light -ml-28 shadow-card absolute left-0 z-40 mt-2 w-full rounded border-[.5px] bg-white py-5 transition-all`}
                >
                  <div className="sm:grid sm:grid-cols-3 ">
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("All");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-[18px] px-[18px] text-base font-semibold hover:bg-opacity-5"
                    >
                      All Categories
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Womens Fashion");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Women's Fashion
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Mens Fashion");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Men's Fashion
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Phones");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Phones and Accessories
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Computer and Office");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Computer and Office
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Consumer Electronics");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Consumer Electronics
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Beauty");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Beauty
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Electronics");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Electronics
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Jewelry & Accessories");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Jewelry & Accessories
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Home");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Luggage & Bags");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Luggage & Bags
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Toys & Hobbies");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Toys & Hobbies
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Sports & Outdoors");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Sports & Outdoors
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Automobiles & Motorcycles");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Automobiles & Motorcycles
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen2(false);
                        setCategory("Tools");
                      }}
                      class="text-body-color hover:bg-primary hover:text-primary block py-2 px-5 text-base font-semibold hover:bg-opacity-5"
                    >
                      Tools
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* catregory end  */}
          </div>
          <div class="-mx-4 flex flex-wrap">
            {records?.map((singleProd) => {
              return (
                <>
                  {category === "All" ? (
                    <div class="w-full px-4 md:w-1/2 lg:w-1/3 flex justify-between">
                      <div class="mx-auto mb-10 max-w-[370px] bg-white  rounded-xl p-2">
                        <div className="flex justify-between lg:h-[55rem] xl:h-[58rem] md:h-[55rem] sm:h-[57rem]">
                          <div>
                            <div class="mb-8 overflow-hidden rounded-lg">
                              <img
                                src={singleProd.image1}
                                alt="image1"
                                class="w-full"
                              />
                            </div>
                            <div className="px-2 pb-4">
                              <div className="flex justify-between">
                                {" "}
                                <span class="bg-blue-400/90 mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                                  <DateFormater date={singleProd.createdAt} />
                                </span>
                                <span>
                                  {savedProducts?.includes(singleProd._id) ? (
                                    <AiFillHeart
                                      onClick={() =>
                                        handleDislike(singleProd._id)
                                        
                                      }
                                      className="cursor-pointer text-red-500"
                                      size={30}
                                    />
                                  ) : (
                                    <AiOutlineHeart
                                      onClick={() => handleLike(singleProd._id)}
                                      className="cursor-pointer text-red-500"
                                      size={30}
                                    />
                                  )}
                                </span>
                              </div>
                              <h3>
                                <Link
                                  to={`/product/${singleProd._id}`}
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
                                <p className="pr-2">
                                  {singleProd.priceOfGoods}$
                                </p>
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
                                  {singleProd.sellPrice -
                                    singleProd.priceOfGoods}
                                  $
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
                              <p className="pt-4 font-semibold flex justify-between ">
                                <p className="pl-2">Category:</p>{" "}
                                <p className={`pr-2 text-sky-900`}>
                                  {singleProd.category}
                                </p>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link
                            to={`/product/${singleProd._id}`}
                            class="bg-blue-500 sm:mt-10 items-center rounded-lg py-2 px-6 text-center text-white hover:bg-blue-600 "
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : singleProd.category === category ? (
                    <div class="w-full px-4 md:w-1/2 lg:w-1/3 flex justify-between">
                      <div class="mx-auto mb-10 max-w-[370px] bg-white  rounded-xl p-2">
                        <div className="flex justify-between lg:h-[52rem] xl:h-[54rem] md:h-[53rem] sm:h-[54rem]">
                          <div>
                            <div class="mb-8 overflow-hidden rounded-lg">
                              <img
                                src={singleProd.image1}
                                alt="image1"
                                class="w-full"
                              />
                            </div>
                            <div className="px-2 pb-4">
                              <div className="flex justify-between">
                                {" "}
                                <span class="bg-blue-400/90 mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                                  <DateFormater date={singleProd.createdAt} />
                                </span>
                                <span>
                                  {savedProducts?.includes(singleProd._id) ? (
                                    <AiFillHeart
                                      onClick={() =>
                                        handleDislike(singleProd._id)
                                      }
                                      className="cursor-pointer text-red-500"
                                      size={30}
                                    />
                                  ) : (
                                    <AiOutlineHeart
                                      onClick={() => handleLike(singleProd._id)}
                                      className="cursor-pointer text-red-500"
                                      size={30}
                                    />
                                  )}
                                </span>
                              </div>
                              <h3>
                                <Link
                                  to={`/product/${singleProd._id}`}
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
                                <p className="pr-2">
                                  {singleProd.priceOfGoods}$
                                </p>
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
                                  {singleProd.sellPrice -
                                    singleProd.priceOfGoods}
                                  $
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
                              <p className="pt-4 font-semibold flex justify-between ">
                                <p className="pl-2">Category:</p>{" "}
                                <p className={`pr-2 text-sky-900`}>
                                  {singleProd.category}
                                </p>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link
                            to={`/product/${singleProd._id}`}
                            class="bg-blue-500 sm:mt-10 items-center rounded-lg py-2 px-6 text-center text-white hover:bg-blue-600 "
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
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

export default PaidProducts;
