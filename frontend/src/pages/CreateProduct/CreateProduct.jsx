import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createProduct } from "../../redux/slices/products/productsSlices.js";
import styled from "styled-components";
import Dropzone from "react-dropzone";

//css from dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: colum;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border:radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #dbdbdb;
  border-color: #c5dff8;
  transition: border 0.24s ease-in-out;
`;

const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  description2: Yup.string().required("description2 is required"),
  description3: Yup.string().required("description3 is required"),
  adcopyFb1: Yup.string().required("adcopyFb1 is required"),
  adcopyFb2: Yup.string().required("adcopyFb2 is required"),
  adcopy1: Yup.string().required("adcopy1 is required"),
  adcopy2: Yup.string().required("adcopy2 is required"),
  adcopy3: Yup.string().required("adcopy3 is required"),
  priceOfGoods: Yup.number().required("priceOfGoods is required"),
  sellPrice: Yup.number().required("sellPrice is required"),
  free: Yup.boolean().required("free is required"),
  aliexpressLink: Yup.string().required("aliexpressLink is required"),
  cjdropshippingLink: Yup.string().required("cjdropshippingLink is required"),
  competitorShop: Yup.string().required("competitorShop is required"),
  popullarity: Yup.string().required("popullarity is required"),
  competitivness: Yup.number().required("competitivness is required"),
  bestPlatform: Yup.string().required("bestPlatform is required"),
  user: Yup.string().required("user is required"),
  category: Yup.string().required("category is required"),
  descriptionHero: Yup.string().required("descriptionHero is required"),
});

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} =  useSelector((state)=>state?.users);
  const {createRedirect, loading: productLoading} =useSelector((state)=>state?.products);

  const imageArray = [];
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      description2: "",
      description3: "",
      descriptionHero: "",
      adcopyFb1: "",
      adcopyFb2: "",
      adcopy1: "",
      adcopy2: "",
      adcopy3: "",
      priceOfGoods: 0,
      sellPrice: 0,
      free: false,
      aliexpressLink: "",
      cjdropshippingLink: "",
      competitorShop: "",
      popullarity: "",
      competitivness: 1,
      bestPlatform: "",
      user: user?._id,
      category: "",
      images: "",
      images2: "",
      images3: "",
      images4: "",
      images5: "",
      images6: "",
      images7: "",
      images8: "",
      images9: "",
      images10: "",
    },onSubmit: (values)=>{
      dispatch(createProduct(values))
    },validationSchema: formSchema
  });

  //redirect after creation
  if(createRedirect){
    navigate('/premiumProducts')
  }

  return (
    <div className="bg-gray-100/50 h-full pt-20">
      <form className="" onSubmit={formik.handleSubmit}>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          User ID for : {user?.firstName} {user?.lastName}
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.user}
            onChange={formik.handleChange("user")}
            onBlur={formik.handleBlur("user")}
            type="user"
            placeholder="user"
            className="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#e8e8e8] py-3 px-5 text-gray-500 text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Title Of Product
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            type="title"
            placeholder="Title of Product"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Description Hero Featured
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.descriptionHero}
            onChange={formik.handleChange("descriptionHero")}
            onBlur={formik.handleBlur("descriptionHero")}
            type="descriptionHero"
            placeholder="Description Hero"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Description variant 1
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            type="description1"
            placeholder="description 1"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Description variant 2
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.description2}
            onChange={formik.handleChange("description2")}
            onBlur={formik.handleBlur("description2")}
            type="description2"
            placeholder="description 2"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Description variant 3
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.description3}
            onChange={formik.handleChange("description3")}
            onBlur={formik.handleBlur("description3")}
            type="description3"
            placeholder="description 3"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Is it a Free Promotional Product
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.free}
            onChange={formik.handleChange("free")}
            onBlur={formik.handleBlur("free")}
            type="Free"
            placeholder="True or False"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Facebook, TikTok, Pinterest AdCopy Title Short variant 1
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.adcopyFb1}
            onChange={formik.handleChange("adcopyFb1")}
            onBlur={formik.handleBlur("adcopyFb1")}
            type="adcopyFb1"
            placeholder="Ad Copy for Facebook 1"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Facebook, TikTok, Pinterest AdCopy Title Short variant 2
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.adcopyFb2}
            onChange={formik.handleChange("adcopyFb2")}
            onBlur={formik.handleBlur("adcopyFb2")}
            type="adcopyFb2"
            placeholder="Ad Copy for Facebook 2"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Facebook, TikTok, Pinterest AdCopy Title + Paragraph variant 1
        </p>
        <div className="flex justify-center">
          <textarea
            value={formik.values.adcopy1}
            onChange={formik.handleChange("adcopy1")}
            onBlur={formik.handleBlur("adcopy1")}
            type="adcopy1"
            placeholder="AD copy 1"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Facebook, TikTok, Pinterest AdCopy Title + Paragraph variant 2
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.adcopy2}
            onChange={formik.handleChange("adcopy2")}
            onBlur={formik.handleBlur("adcopy2")}
            type="adcopy2"
            placeholder="AD copy 2"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Facebook, TikTok, Pinterest AdCopy Title + Paragraph variant 3
        </p>
        <div className="flex justify-center pb-8">
          <textarea
            value={formik.values.adcopy3}
            onChange={formik.handleChange("adcopy3")}
            onBlur={formik.handleBlur("adcopy3")}
            type="adcopy3"
            placeholder="AD copy 3"
            rows="5"
            class="border-form-stroke m-2 w-[80%] placeholder-gray-300 focus:border-blue-400 rounded-lg border-[1.5px] py-3 px-5 outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          ></textarea>
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Sell Price after Markup
        </p>
        <div className="flex justify-start ml-[10%] pb-8">
          <input
            value={formik.values.sellPrice}
            onChange={formik.handleChange("sellPrice")}
            onBlur={formik.handleBlur("sellPrice")}
            type="sellPrice"
            placeholder="Sell Price"
            class="bordder-[#E9EDF4] mt-2 w-[20%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Cost of Product
        </p>
        <div className="flex justify-start ml-[10%] pb-8">
          <input
            value={formik.values.priceOfGoods}
            onChange={formik.handleChange("priceOfGoods")}
            onBlur={formik.handleBlur("priceOfGoods")}
            type="priceOfGoods"
            placeholder="Price of Goods"
            class="bordder-[#E9EDF4] mt-2 w-[20%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Aliexpress Link
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.aliexpressLink}
            onChange={formik.handleChange("aliexpressLink")}
            onBlur={formik.handleBlur("aliexpressLink")}
            type="aliexpressLink"
            placeholder="Aliexpress Link"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          CJ Dropshipping Sourced Link
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.cjdropshippingLink}
            onChange={formik.handleChange("cjdropshippingLink")}
            onBlur={formik.handleBlur("cjdropshippingLink")}
            type="cjdropshippingLink"
            placeholder="Cjdropshipping Link"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Competitor Shop Link
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.competitorShop}
            onChange={formik.handleChange("competitorShop")}
            onBlur={formik.handleBlur("competitorShop")}
            type="competitorShop"
            placeholder="Competitor Shop"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Product Popullarity
        </p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.popullarity}
            onChange={formik.handleChange("popullarity")}
            onBlur={formik.handleBlur("popullarity")}
            type="popullarity"
            placeholder="Popularity"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">Category</p>
        <div className="flex justify-center pb-8">
          <input
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            type="category"
            placeholder="Beauty, Electronics, Animals etc"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Product Hard to Sell from 1-10 ?
        </p>
        <div className="flex justify-start ml-[10%] pb-8">
          <input
            value={formik.values.competitivness}
            onChange={formik.handleChange("competitivness")}
            onBlur={formik.handleBlur("competitivness")}
            type="competitivness"
            placeholder="Competitivness"
            class="bordder-[#E9EDF4] mt-2 w-[20%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <p className="flex justify-start ml-[10%]  text-gray-600">
          Best Platform to sell it
        </p>
        <div className="flex justify-center">
          <input
            value={formik.values.bestPlatform}
            onChange={formik.handleChange("bestPlatform")}
            onBlur={formik.handleBlur("bestPlatform")}
            type="bestPlatform"
            placeholder="Best Platform"
            class="bordder-[#E9EDF4] m-2 w-[80%] rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
          />
        </div>
        {/* working for uploading a single image */}
        <div className="flex justify-center w-[30%] mx-auto mb-12">
          <Container className="container hover:border-green-400">
            <Dropzone
              onBlur={formik.handleBlur("images")}
              accept="image/jpeg, image/png"
              onDrop={(acceptedFiles) => {
                formik.setFieldValue("images", acceptedFiles[0]);
                formik.setFieldValue("images2", acceptedFiles[1]);
                formik.setFieldValue("images3", acceptedFiles[2]);
                formik.setFieldValue("images4", acceptedFiles[3]);
                formik.setFieldValue("images5", acceptedFiles[4]);
                formik.setFieldValue("images6", acceptedFiles[5]);
                formik.setFieldValue("images7", acceptedFiles[6]);
                formik.setFieldValue("images8", acceptedFiles[7]);
                formik.setFieldValue("images9", acceptedFiles[8]);
                formik.setFieldValue("images10", acceptedFiles[9]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="container">
                  <div
                    {...getRootProps({
                      className: "dropzone",
                      onDrop: (event) => event.stopPropagation(),
                    })}
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-400 text-lg flex justify-center cursor-pointer hover:text-gray-500">
                      Select Images and Videos
                    </p>
                  </div>
                </div>
              )}
            </Dropzone>
          </Container>
        </div>

        {/* working for uploading a single image end */}
        <div class="mb-10 flex justify-center pb-20">
          {productLoading ? (
            <button
              disabled
              class="w-[20%] m-2 cursor-pointer rounded-md border bg-slate-600 py-3 px-5 text-base font-semibold text-white transition"
            >
              Loading... Dont Refresh!
            </button>
          ) : (
            <button
              type="submit"
              class="w-[20%] m-2 cursor-pointer rounded-md border bg-blue-600 py-3 px-5 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              Create Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
