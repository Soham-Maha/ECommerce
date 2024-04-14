import React, { useState } from "react";

const Accordion = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-5xl ">
                Questions? Wee are here to Help!
              </h2>
              <p className="text-base text-body-color">
                Some of the questions you may have answered right away!
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2 ">
            <AccordionItem
              header="Is SGP Ecommerce really worth it?"
              text="With only 15$ a month wee are the cheapest provider of this kind of service and wee deliver 2-4 more images and +1 Quality Creative as well. The other sites you may have come across that feature winning products eather lack good creatives, descriptions or the images of the product are taken straight from aliexpress or other wholesaller sites. This is why its defenetly worth investing in us and take advantage of our services."
            />
            <AccordionItem
              header="What do I get after i Subscribe?"
              text="After you choose our monthly pro plan you will have access to our premium products that are in-depth and well-researched by our team of experts that have deep knowledge in the space of ecommerce. You will be directly able to download the high-quality images and creatives as well as copy the ready-made descriptions into your store and launch your ads with our ad copies as fast as 5 minutes. The full package is ready for you!"
            />
            <AccordionItem
              header="Can I Cancel at any time?"
              text="Yes, you can cancel your subscription any time you like, no questions asked and you won't be billed for the coming month."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Can I use the images and videos I like?"
              text="Yes, the images and videos are royalty free and made for e-commerce purposes. You can modify and edit them as you wish they are completely yours."
            />
            <AccordionItem
              header="Do I really save time with your services?"
              text="Wee have seen that users save up to 1.5 Hours on average per product that they take from our services. Starting from saving time in photoshop and editing the images to make them clean looking till the cutting of the creatives and creating a compelling video to use for your ads. There is no doubt that you will save time and thats a Guarantee!"
            />
            <AccordionItem
              header="Can you guys create custom images and creatives?"
              text="After you find your winning product you can send us a message and we will arrange professional images to be made along with new creatives and unique videos just for you to help you scale your e-commerce store. For this service wee can reach a custom price agreement that will be to your benefit."
            />
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3056D3" stop-opacity="0.36" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Accordion;

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };
  return (
    <div className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary">
          <svg
            className={`duration-200 ease-in-out fill-primary stroke-primary ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-black">{header}</h4>
        </div>
      </button>

      <div
        className={`pl-[62px] transition duration-300 delay-100 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
      </div>
    </div>
  );
};
