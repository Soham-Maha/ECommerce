import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import off1 from "../../images/whatWeeOffer/off1.png";
import off2 from "../../images/whatWeeOffer/off2.png";
import off3 from "../../images/whatWeeOffer/off3.png";
import off4 from "../../images/whatWeeOffer/off4.png";
import off5 from "../../images/whatWeeOffer/off5.png";
import off6 from "../../images/whatWeeOffer/off6.png";
import f1 from "../../images/featuresbottom/1.svg";
import f2 from "../../images/featuresbottom/2.svg";
import f3 from "../../images/featuresbottom/3.svg";
import f4 from "../../images/featuresbottom/4.svg";
import f5 from "../../images/featuresbottom/5.svg";
import f6 from "../../images/featuresbottom/6.svg";

const Features = () => {
  //get user from store
  const { user } = useSelector((state) => state?.users);

  return (
    <div>
      <section class="bg-gray-800 text-white">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h2 class="text-3xl font-bold sm:text-4xl">
              Our Features that are Unmatched on Value and Price!
            </h2>

            <p class="mt-4 text-gray-300">
              We aim to deliver unmatched value as well as a super competitive
              price that is by far the cheapest on the market when it comes to
              this kind of service and coupled with the variety of our services
              it is truly an offer that is tailored around the customer for
              maximum benefit and satisfaction.
            </p>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off1} />

              <h2 class="mt-4 text-xl font-bold text-white">
                High-Quality Images on Demand
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                For each product wee offer 5 to 8 high quality images, that are
                polished for ecommerce conversions and to stand out in a
                costumers eyes
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off2} />

              <h2 class="mt-4 text-xl font-bold text-white">
                Persuasive and On-Point Descriptions
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                We offer you a wide range of selections when it comes to
                descriptions, choose one that fits your style and personalize it
                at your liking. Wee know that the hardest part is having a rough
                draft sometimes and thats where wee shine.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off3} />

              <h2 class="mt-4 text-xl font-bold text-white">
                Price of Goods and an Estimated Profit Margin
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                We calculate the price of goods through a wide range of
                comparisons through different vendors and after that, we take a
                look at the competitor's shops and see how much they charge.
                This way we offer a accurate and competitive price for you to
                sell the product for.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off4} />

              <h2 class="mt-4 text-xl font-bold text-white">
                Long and Short Form AD Copies
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                Whether you want to advertise your product on Facebook, Tiktok,
                Google Ads, Pinterest, or Instagram we got you covered! Wee will
                provide you with Persuasuve, Engagine, and Scroll Stopping Ad
                Copies for your ADS.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off5} />

              <h2 class="mt-4 text-xl font-bold text-white">
                Product Analysis and Trend Catcher
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                We Provide a product analysis that we do behind the scenes and
                let you know exactly how saturated the market is for this
                product this way you can calculate if it is the right product
                for you to test at this particular time. Wee also provide a
                Trend Catcher meaning that on each product there is a Keyword
                associated with the product letting you know if it is, Trending
                or New.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
              href="/services/digital-campaigns"
            >
              <img className="w-12" src={off6} />

              <h2 class="mt-4 text-xl font-bold text-white">
                Aliexpress and Competitor Shop Links
              </h2>

              <p class="mt-1 text-sm text-gray-300">
                We provide for each product the original Aliexpress link that
                you can use to source the product and the competitor's shop link
                so that you can analyze his shop, creatives, and strategy to get
                a better understanding of what made this a winning product for
                him
              </p>
            </a>
          </div>

          <div class="mt-12 text-center">
            {!user ? (
              <Link
                to={"/register"}
                class="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            ) : (
              <Link
                to={"/premiumProducts"}
                class="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                To Premium Products
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* render reviews component */}
      <Reviews />
      <section>
        <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div class="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 class="text-3xl font-bold sm:text-4xl">
                What's Included in our Pro Plan
              </h2>

              <p class="mt-4 text-gray-600">
                So let's take a look at what is included in your pro plan after
                you purchase. Here are the most important features and perks you
                will have access too.
              </p>
              {!user ? (
                <Link
                  to={"/register"}
                  class="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started Today
                </Link>
              ) : (
                <Link
                  to={"/premiumProducts"}
                  class="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  To Premium Products
                </Link>
              )}
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f5} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">24/7 Support</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  You can message our support team at any time and within 5-8
                  hours we will respond and fix whatever issue or question you
                  may have.
                </p>
              </a>

              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f6} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">Instant Full Access</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  After your purchase, you will have access to hundreds of
                  winning products to choose from and all features of SGP
                  Ecommerce!
                </p>
              </a>

              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f1} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">Download Instantly</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  You will have the ability to start testing right away, you can
                  download the high-quality images and video creatives right
                  away.
                </p>
              </a>

              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f3} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">Save Products</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  The Pro Plan members have the ability to save products and
                  look for them in their profile under saved products for later.
                </p>
              </a>

              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f4} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">Platform Search</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Our Pro Plan members have the ability to filter products by
                  Platform like Facebook, Tiktok, and Google Ads for optimal
                  performance.
                </p>
              </a>

              <a
                class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <img src={f2} className="w-20" alt="f6" />
                </span>

                <h2 class="mt-2 font-bold">Competitor Research</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  After purchase, you can view the competitor's shop or video
                  ads for the product that you want sell wich gives u a massive
                  advantage and saves you time doing product research.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
