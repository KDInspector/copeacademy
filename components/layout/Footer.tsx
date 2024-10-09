"use client";
import React from "react";
import { GeistSans } from "geist/font/sans";
import {
  ChevronUpIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classNames
import Image from "next/image";
import COPE from "@/app/images/COPE.png";
import COPEDark from "@/app/images/COPEDark.png";

const Footer = () => {
  return (
    <>
      {/* <!-- ========== FOOTER ========== --> */}
      <div className="w-full h-full bg-white dark:bg-black">
        <footer
          className={cn(
            `mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ${GeistSans.className} `
          )}
        >
          {/* <!-- Grid --> */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            <div className="col-span-full lg:col-span-1 hidden lg:block">
              <a
                className="flex-none font-semibold text-xl text-black dark:text-white focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Brand"
              >
                <Image
                  src={COPE}
                  alt="COPE"
                  className="w-28 h-auto dark:hidden block"
                />
                <Image
                  src={COPEDark}
                  alt="COPE"
                  className="w-28 h-auto dark:block hidden"
                />
              </a>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                © 2024 COPE.
              </p>
            </div>
            {/* <!-- End Col --> */}

            {/* Product Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
                Product
              </h4>
              <div className="mt-3 grid space-y-3 text-sm">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Pricing
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Changelog
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Docs
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Download
                  </a>
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}

            {/* Company Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
                Company
              </h4>
              <div className="mt-3 grid space-y-3 text-sm">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    About us
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Blog
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Careers
                  </a>{" "}
                  <span className="inline text-blue-600 dark:text-blue-500">
                    — We&apos;re hiring
                  </span>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Customers
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Newsroom
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Sitemap
                  </a>
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}

            {/* Resources Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
                Resources
              </h4>
              <div className="mt-3 grid space-y-3 text-sm">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Community
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Help & Support
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    eBook
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    What&apos;s New
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Status
                  </a>
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}

            {/* Developers & Industries Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
                Developers
              </h4>
              <div className="mt-3 grid space-y-3 text-sm">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    API
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Status
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    GitHub
                  </a>{" "}
                  <span className="inline text-blue-600 dark:text-blue-500">
                    — New
                  </span>
                </p>
              </div>

              <h4 className="mt-7 text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">
                Industries
              </h4>
              <div className="mt-3 grid space-y-3 text-sm">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Financial Services
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Education
                  </a>
                </p>
              </div>
            </div>
            {/* <!-- End Col --> */}
          </div>
          {/* <!-- End Grid --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="pt-5 mt-5 border-t border-gray-200 dark:border-neutral-700">
            <div className="sm:flex sm:justify-between sm:items-center">
              <div className="flex flex-wrap items-center gap-3">
                {/* <!-- Language Dropdown --> */}
                <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                  <button
                    id="hs-footer-language-dropdown"
                    type="button"
                    className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    English (US)
                    <ChevronUpIcon className="hs-dropdown-open:rotate-180 shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
                  </button>

                  <div
                    className="hs-dropdown-menu w-40 transition-opacity duration-300 hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-footer-language-dropdown"
                  >
                    <a
                      className="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                      href="#"
                    >
                      English (US)
                    </a>
                    <a
                      className="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                      href="#"
                    >
                      Nederlands
                    </a>
                  </div>
                </div>
                {/* <!-- End Language Dropdown --> */}

                <div className="space-x-4 text-sm">
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Terms
                  </a>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Privacy
                  </a>
                  <a
                    className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    Status
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="mt-3 sm:hidden">
                  <a
                    className="flex-none font-semibold text-xl text-black dark:text-white focus:outline-none focus:opacity-80"
                    href="#"
                  >
                    <Image
                      src={COPE}
                      alt="COPE"
                      className="w-28 h-auto dark:hidden block"
                    />
                    <Image
                      src={COPEDark}
                      alt="COPE"
                      className="w-28 h-auto dark:block hidden"
                    />
                  </a>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                    © 2024 COPE.
                  </p>
                </div>

                {/* <!-- Social Brands --> */}
                <div className="space-x-4">
                  <a
                    className="inline-block text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    <LinkedInLogoIcon className="shrink-0 size-4" />
                  </a>
                  <a
                    className="inline-block text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="#"
                  >
                    <GlobeIcon className="shrink-0 size-4" />
                  </a>
                </div>
                {/* <!-- End Social Brands --> */}
              </div>
              {/* <!-- End Col --> */}
            </div>
          </div>
          {/* <!-- End Footer Bottom --> */}
        </footer>
        {/* <!-- ========== END FOOTER ========== --> */}
      </div>
    </>
  );
};

export default Footer;
