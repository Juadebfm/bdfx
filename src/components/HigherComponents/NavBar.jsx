import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";

export default function NavBar() {
  const router = usePathname();
  const { user, googleSignIn, logOut } = UserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bdfx_flex bdfx_nav_font text-base w-[100%] p-5">
      <div>
        <Link href="/" passHref>
          <Image
            src="https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png"
            alt="BDFX Logo"
            width={300}
            height={100}
            className="hidden sm:block"
          />
          <Image
            src="https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_mobile_fx_xfmhfi.png"
            alt="BDFX Logo"
            width={50}
            height={50}
            className="block sm:hidden"
          />
        </Link>
      </div>
      <div className={`sm:flex space-x-8 ${isMenuOpen ? "block" : "hidden"}`}>
        <div>
          <Link href="/" passHref>
            <div
              className={`font-medium ${
                router === "/"
                  ? "border-b-2 text-bdfx_red border-bdfx_red"
                  : "text-black"
              }`}
            >
              Home
            </div>
          </Link>
          {/* Add other menu items here */}
        </div>

        <div>
          {user ? (
            <div className="flex flex-wrap items-center justify-between gap-3 cursor-pointer">
              <p className="text-lg font-semibold w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                {user.displayName.charAt(0)}
              </p>
              <button
                className="px-7 py-2 bg-black text-white"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            </div>
          ) : (
            <div className="">
              <button
                className="px-6 py-3 bg-black text-white"
                onClick={handleSignIn}
              >
                SignIn
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-bdfx_red"
        >
          <BiMenu />
        </button>
      </div>
    </nav>
  );
}
