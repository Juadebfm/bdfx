import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
  return (
    <main className="font-lato text-[16px] sm:text-[19px] text-gray-800 px-10 sm:px-24 my-10">
      <h2 className="text-[28px] sm:text-[32px] text-center sm:text-start text-[#212529] font-[700] mb-8">
        Contact
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <p className="flex flex-col sm:flex-row item-start sm:items-center justify-start gap-[11px] capitalize mb-8">
            <span>
              <HiOutlineLocationMarker className="text-[25px]" />
            </span>
            <span>
              6A George street, off mobolaji johnson street, Ikoyi, Lagos
            </span>
          </p>
          <p className="flex flex-col sm:flex-row item-start sm:items-center justify-start gap-[11px] capitalize mb-8">
            <span>
              <BsFillTelephoneInboundFill />
            </span>
            <Link href="tel:+2348068545123">08068545123</Link>
          </p>
          <p className="flex flex-col sm:flex-row item-start sm:items-center justify-start gap-[11px] capitalize mb-8">
            <span>
              <AiOutlineMail />
            </span>
            <Link href="mailto:customercare@businessday.ng">
              customercare@businessday.ng
            </Link>
          </p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4398.934105134582!2d3.4259300066292635!3d6.452848323113309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4ceed644ac9%3A0x66be43f7961f1b79!2s6a%20George%20St%2C%20Ikoyi%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1698518246036!5m2!1sen!2sng"
            className="w-max"
            height="450"
            style={{ border: 0, width: "100%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contact;
