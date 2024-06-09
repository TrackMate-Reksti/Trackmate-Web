"use client";

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { IoIosList, IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEventListener } from "usehooks-ts";
import { IoHomeOutline } from "react-icons/io5";
// import { UserContext } from "@/lib/context/user-context";
// import { toastError, toastSuccess } from "./toast";
// import Cookies from "js-cookie";

interface NavbarProps {
  children?: ReactNode;
}

export default function NavbarAdmin({ children }: NavbarProps) {
  const router = useRouter();
  //   const context = useContext(UserContext);

  const [navOpen, setNavOpen] = useState(false);
  const [stickyClass, setStickyClass] = useState("absolute bg-blue-primary");
  const [isAccount, setAccount] = useState(false);
  const [user, setUser] = useState<boolean>(false);
  const location = usePathname();
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location == "/") {
      setActive(0);
    } else if (location == "/vehicle-list") {
      setActive(1);
    } else if (location == "/profile") {
      setActive(2);
    } else {
      setActive(-1);
    }
  }, [location]);

  const documentRef = useRef<Document | null>(
    typeof document !== "undefined" ? document : null
  );
  const onClickHamburger = (event: Event) => {
    let cekHamburger = true;
    const doc = document.getElementsByClassName("hamburger");
    for (let index = 0; index < doc.length; index++) {
      cekHamburger = cekHamburger && event.target != doc[index];
    }
    if (cekHamburger) {
      setNavOpen(false);
    }
  };
  useEventListener("click", onClickHamburger, documentRef);

  //   const handleLogout = async () => {
  //     setIsLoading(true);
  //     try {
  //       if (context.token) {
  //         // const response = await PostWithCredentials("auth/logout", context.token);
  //         // console.log(response);
  //         Cookies.remove("Authorization");
  //         context.updateUserandToken(null, null);
  //         toastSuccess("User logged out successfully");
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       toastError((error as any).response?.data?.error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const stickNavbar = () => {
    const header = document.querySelector("nav");
    if (header != null) {
      window.scrollY > header.offsetTop
        ? setStickyClass("fixed bg-blue-primary bg-opacity-80 backdrop-blur-sm")
        : setStickyClass("absolute bg-blue-primary");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  return (
    <div className="lg:flex w-screen min-h-screen lg:h-screen overflow-hidden relative">
      <div
        className={`${
          navOpen ? "fixed bg-blue-primary" : stickyClass
        } z-50 flex h-[80px] lg:hidden w-full items-center px-4 lg:px-14`}
      >
        <button
          type="button"
          className={`hamburger absolute z-10 h-[40px] w-[40px] cursor-pointer lg:hidden`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`${
              navOpen
                ? "top-[1.2em] h-[2px] rotate-[135deg] transition"
                : "top-[0.7em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
          ></span>
          <span
            id="span2"
            className={`${
              navOpen ? "h-[2px] scale-0 transition" : "top-[1.2em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
          ></span>
          <span
            id="span3"
            className={`${
              navOpen
                ? "top-[1.2em] h-[2px] rotate-45 transition"
                : "top-[1.7em] h-[3px]"
            } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
          ></span>
        </button>
        <img
          src={"/assets/logo.png"}
          alt="Carport"
          className={`${
            navOpen ? "hidden" : "block"
          } mx-auto lg:mx-0 w-[40%] max-w-fit object-contain`}
        />
      </div>
      <nav
        className={`${
          navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-40 ease-in-out duration-300 fixed lg:static font-poppins bg-blue-primary pt-[120px] lg:pt-[40px] pb-[80px] flex flex-col justify-between w-56 lg:w-[252px] lg:min-w-[252px] shadow-navbar h-screen`}
      >
        <div className="flex flex-col gap-[24px]">
          <img
            src="/assets/logo.png"
            alt="Logo Carport"
            className="mx-auto w-[40%] lg:w-[60%] object-contain mb-12 lg:mb-[64px]"
          />
          <div className="flex flex-col gap-[16px]">
            <Link
              href="/"
              className={`${
                active == 0
                  ? "border-r-4 border-yellow-primary text-yellow-primary box-border"
                  : "text-white"
              } w-full font-medium text-[20px] lg:text-[24px] pl-[32px] lg:pl-[48px] py-4 hover:text-yellow-accent active:text-yellow-primary hover:border-yellow-accent active:border-yellow-primary flex items-center gap-4 cursor-pointer`}
            >
              <IoHomeOutline />
              <p className="text-[16px] lg:text-[20px]">Home</p>
            </Link>
            <Link
              href="/vehicle-list"
              className={`${
                active == 1
                  ? "border-r-4 border-yellow-primary text-yellow-primary box-border"
                  : "text-white"
              } w-full font-medium text-[20px] lg:text-[24px] pl-[32px] lg:pl-[48px] py-4 hover:text-yellow-accent active:text-yellow-primary hover:border-yellow-accent active:border-yellow-primary flex items-center gap-4 cursor-pointer`}
            >
              <IoIosList />
              <p className="text-[16px] lg:text-[20px]">Vehicle Report</p>
            </Link>
          </div>
        </div>
      </nav>
      <div
        className={`${
          navOpen ? "block lg:hidden" : "hidden"
        } fixed z-10 bg-blue-primary h-screen w-full opacity-50`}
      ></div>
      <div className="w-full lg:w-auto lg:grow lg:overflow-auto">
        {children}
      </div>
    </div>
  );
}
