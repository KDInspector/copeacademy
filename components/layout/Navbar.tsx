"use client";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import COPE from "@/app/images/COPE.png";
import COPEDark from "@/app/images/COPEDark.png";
import {
  ChevronDownIcon,
  Cross1Icon,
  EnterIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ========== HEADER ========== --> */}
      <header
        className={`sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5  dark:bg-black dark:border-neutral-800 ${GeistSans.className}`}
      >
        <nav className="max-w-[85rem] mx-auto w-full px-4 sm:px-6 lg:px-8 flex basis-full items-center">
          <div className="me-5">
            {/* <!-- Logo --> */}
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="#"
            >
              <Image
                src={COPE}
                alt="COPE"
                className="w-28 h-auto dark:hidden block"
                priority
              />
              <Image
                src={COPEDark}
                alt="COPE"
                className="w-28 h-auto dark:block hidden"
              />
            </a>
            {/* <!-- End Logo --> */}
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            {/* <!-- Collapse --> */}
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                id="hs-secondaru-navbar-collapse"
                aria-expanded="false"
                aria-controls="hs-secondaru-navbar"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-secondaru-navbar"
              >
                <HamburgerMenuIcon className="hs-collapse-open:hidden size-4" />
                <Cross1Icon className="hs-collapse-open:block shrink-0 hidden size-4" />
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
            {/* <!-- End Collapse --> */}

            <div className="hidden md:block">
              {/* <!-- Search Input --> */}
              <div className="relative"></div>
              {/* <!-- End Search Input --> */}
            </div>

            <div className="flex flex-row items-center justify-end gap-1">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                type="button"
                className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                {theme == "dark" ? (
                  <SunIcon className="shrink-0 size-4" />
                ) : (
                  <MoonIcon className="shrink-0 size-4" />
                )}
                <span className="sr-only">Dark Mode</span>
              </button>

              {/* <!-- Dropdown --> */}
              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                <button
                  id="hs-dropdown-account"
                  type="button"
                  className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <Image
                    width={50}
                    height={50}
                    className="shrink-0 size-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Avatar"
                  />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-account"
                >
                  <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      james@site.com
                    </p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                      href="#"
                    >
                      <EnterIcon className="shrink-0 size-4" />
                      Log In
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- End Dropdown --> */}
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}

      {/* <!-- Secondary Navbar --> */}
      <div className="md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
        <nav
          className={`relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8 ${GeistSans.className}  z-30`}
        >
          {/* <!-- Collapse --> */}
          <div
            id="hs-secondaru-navbar"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
            aria-labelledby="hs-secondaru-navbar-collapse"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
                <a
                  className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="#"
                >
                  Home
                </a>

                <a
                  className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="/courses"
                >
                  Courses
                </a>

                <a
                  className="py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="#"
                >
                  Leaderboards
                </a>

                {/* <!-- Dropdown --> */}
                <div className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
                  <button
                    id="hs-secondaru-navbar-dropdown"
                    type="button"
                    className="hs-dropdown-toggle w-full py-2 md:py-0 flex items-center font-medium text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    COPE
                    <ChevronDownIcon className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 shrink-0 size-4 ms-auto md:ms-1" />
                  </button>

                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-52 hidden z-10 top-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 md:after:hidden after:absolute after:top-1 after:start-2 after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100 dark:md:bg-neutral-800 dark:after:bg-neutral-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-secondaru-navbar-dropdown"
                  >
                    <div className="py-1 md:px-1 space-y-0.5">
                      <a
                        className="py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="#"
                      >
                        Contact
                      </a>

                      <a
                        className="py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="#"
                      >
                        About us
                      </a>

                      <div className="hs-dropdown [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover] [--is-collapse:true] md:[--is-collapse:false] relative">
                        <button
                          id="hs-secondaru-navbar-dropdown-sub"
                          type="button"
                          className="hs-dropdown-toggle w-full py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        >
                          CopeAcademy
                          <ChevronDownIcon className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:-rotate-90 md:-rotate-90 duration-300 ms-auto shrink-0 size-4" />
                        </button>

                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] hs-dropdown-open:opacity-100 opacity-0 relative md:w-48 hidden z-10 md:mt-2 md:!mx-[10px] md:top-0 md:end-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md dark:bg-neutral-800 dark:divide-neutral-700 before:hidden md:before:block before:absolute before:-end-5 before:top-0 before:h-full before:w-5 md:after:hidden after:absolute after:top-1 after:start-2 after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100 dark:md:bg-neutral-800 dark:after:bg-neutral-700"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="hs-secondaru-navbar-dropdown-sub"
                        >
                          <div className="p-1 space-y-0.5 md:space-y-1">
                            <a
                              className="py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                              href="#"
                            >
                              Training
                            </a>

                            <a
                              className="py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                              href="#"
                            >
                              Workshops
                            </a>

                            <a
                              className="py-1.5 md:px-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                              href="#"
                            >
                              Coaching
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Dropdown --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Collapse --> */}
        </nav>
      </div>
      {/* <!-- End Secondary Navbar --> */}
    </>
  );
};

export default Navbar;
