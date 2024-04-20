import React, {useState} from "react";
import {PiCopySimpleLight} from 'react-icons/pi';
import {FcCheckmark} from 'react-icons/fc';

const ProdDescriptions = ({ singleProd }) => {
  const [coped, setCoped] = useState(false);
  const [coped2, setCoped2] = useState(false);
  const [coped3, setCoped3] = useState(false);
  const [coped4, setCoped4] = useState(false);
  const [coped5, setCoped5] = useState(false);
  const [coped6, setCoped6] = useState(false);
  const [coped7, setCoped7] = useState(false);
  const [coped8, setCoped8] = useState(false);

  const handleClick= () =>{
    navigator.clipboard.writeText(singleProd?.description);
    setCoped(true);
    setTimeout(()=>{
      setCoped(false)
    },1000)
  }
  const handleClick2= () =>{
    navigator.clipboard.writeText(singleProd?.description2);
    setCoped2(true);
    setTimeout(()=>{
      setCoped2(false)
    },1000)
  }
  const handleClick3= () =>{
    navigator.clipboard.writeText(singleProd?.description3);
    setCoped3(true);
    setTimeout(()=>{
      setCoped3(false)
    },1000)
  }
  const handleClick4= () =>{
    navigator.clipboard.writeText(singleProd?.adcopyFb1);
    setCoped4(true);
    setTimeout(()=>{
      setCoped4(false)
    },1000)
  }
  const handleClick5= () =>{
    navigator.clipboard.writeText(singleProd?.adcopyFb2);
    setCoped5(true);
    setTimeout(()=>{
      setCoped5(false)
    },1000)
  }
  const handleClick6= () =>{
    navigator.clipboard.writeText(singleProd?.adcopy1);
    setCoped6(true);
    setTimeout(()=>{
      setCoped6(false)
    },1000)
  }
  const handleClick7= () =>{
    navigator.clipboard.writeText(singleProd?.adcopy2);
    setCoped7(true);
    setTimeout(()=>{
      setCoped7(false)
    },1000)
  }
  const handleClick8= () =>{
    navigator.clipboard.writeText(singleProd?.adcopy3);
    setCoped8(true);
    setTimeout(()=>{
      setCoped8(false)
    },1000)
  }

  return (
    <div>
      {" "}
      <h1 className="text-center text-5xl mt-14">Product Descriptions</h1>
      <p className="text-center mt-[3px]">
        Ready to use and Test on various platforms and AD Campains!
      </p>
      {/* description one */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">Description #1</h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.description}</span>
            </div>
            <button onClick={handleClick}>
              {coped ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* description one end */}
      {/* description 2 */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">Description #2</h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.description2}</span>
            </div>
            <button onClick={handleClick2}>
              {coped2 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* description 2 end */}
      {/* description 3 */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">Description #3</h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.description3}</span>
            </div>
            <button onClick={handleClick3}>
              {coped3 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* description 3 end */}
      {/* ad copy fb one */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">AD Copy Long, Perfect for Facebook #1</h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.adcopyFb1}</span>
            </div>
            <button onClick={handleClick4}>
              {coped4 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ad copy fb one end */}
      {/* ad copy fb 2 */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">AD Copy Long, Perfect for Facebook #2</h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.adcopyFb2}</span>
            </div>
            <button onClick={handleClick5}>
              {coped5 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ad copy fb 2 end */}
      {/* ad copy tiktok one */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">
          AD Copy Short Title, Perfect for TikTok and other Platforms #1
        </h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.adcopy1}</span>
            </div>
            <button onClick={handleClick6}>
              {coped6 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ad copy tiktok one end */}
      {/* ad copy tiktok 2 */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">
          AD Copy Short Title, Perfect for TikTok and other Platforms #2
        </h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.adcopy2}</span>
            </div>
            <button onClick={handleClick7}>
              {coped7 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ad copy tiktok 2 end */}
      {/* ad copy tiktok 3 */}
      <div className="text-center mt-20">
        <h1 className="text-xl mb-6">
          AD Copy Short Title, Perfect for TikTok and other Platforms #3
        </h1>
        <div className="flex justify-center mb-12">
          {" "}
          <div class="flex items-center justify-between text-gray-800 border border-gray-800 bg-white  text-sm py-3 px-4 sm:w-[80%] rounded-md">
            <div class="flex gap-1">
              <span>{singleProd?.adcopy3}</span>
            </div>
            <button onClick={handleClick8}>
              {coped8 ? (
                <FcCheckmark size={30} />
              ) : (
                <PiCopySimpleLight
                  className="cursor-pointer hover:text-blue-500 transition delay-100 duration-200"
                  size={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* ad copy tiktok 3 end */}
    </div>
  );
};

export default ProdDescriptions;
