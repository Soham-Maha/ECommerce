import React from 'react';
import i1 from '../../images/pricepage/1.png';
import Pricing1 from '../../components/Pricing/Pricing'

const Pricing = () => {
  return (
    <div className="-mb-10 sm:-mb-0">
      {" "}
      <div className="sm:w-[80%] w-[90%]  flex justify-center mx-auto mt-16 overflow-hidden">
        <article class="group">
          <img
            alt="Lava"
            src={i1}
            class=" w-full  rounded-xl object-cover shadow-xl transition group-hover:grayscale-[20%]"
          />

          <div class="p-4 text-center">
            <a href="#">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-800 pb-10 pt-20">
                We aim to have Affordable Prices. Always!
              </h1>
            </a>

            <p class="mt-2  text-sm/relaxed text-gray-500 pb-20">
              At SGP Ecommerce, we firmly believe that every entrepreneur
              deserves a chance to hit the ground running without worrying about
              breaking the bank. Our platform is engineered to help ecommerce
              enthusiasts unlock their full potential, with our subscription
              plans structured to be as affordable as possible. Our Pro Plan,
              priced at an incredibly competitive rate of just $15 a month, is
              designed to offer the best value for your money. With this
              budget-friendly pricing, we aim to empower businesses, big and
              small, to maximize their returns, test winning products faster,
              and gain a crucial edge in today's demanding market. Our unique
              selling proposition lies not only in our unrivaled affordability,
              but also in our commitment to helping customers drive their
              ecommerce growth rapidly. With SGP Ecommerce, you get an
              opportunity to test winning products swiftly and efficiently,
              minimizing the guesswork and reducing the time spent in the
              trial-and-error phase. Our robust and innovative platform has been
              tailored to accommodate the volatile nature of the ecommerce
              space, enabling businesses to swiftly adapt to market changes and
              trends. In essence, SGP Ecommerce provides a cost-effective
              solution that stands unrivaled in the ecommerce realm, proving
              that exceptional quality and affordable pricing can indeed go hand
              in hand.
            </p>
          </div>
        </article>
      </div>
      <Pricing1 />
    </div>
  );
}

export default Pricing