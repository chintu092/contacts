/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import useFetchContacts from "@/app/hook/useContact";
import Cookies from "js-cookie";
import { Suspense } from 'react';

const ContactList = ({ sendDataToParent }:any) => {
  const skeletonbox = ["1", "2", "3", "4"];
  const [contactid, setContactId] = React.useState("");
  const apiUrl = `${process.env.NEXT_PUBLIC_CONTACT_URL}`;
  const token = Cookies.get("usercookie");
  const { contacts, loading } = useFetchContacts(apiUrl, token);

  useEffect(() => {
    sendDataToParent(contactid);
  }, [contactid]);

  if (loading)
    return (
      <div className="flex w-full flex-col gap-4 mt-3">
        {skeletonbox.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="skeleton bg-[#121212] h-16 w-[64px] shrink-0 rounded-full"></div>
            <div className="flex flex-col w-[calc(100%-64px)] gap-4">
              <div className="skeleton bg-[#121212] h-4 w-[80%]"></div>
              <div className="skeleton bg-[#121212] h-4 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
//   if (error) return <p>Error: {error}</p>;

  return (
    <Suspense fallback={<p>Loading Contacts...</p>} >
      <ul className="list rounded-box">
        {contacts && contacts?.length > 0 ? (
          <>
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">A</li>
            {contacts.map((contact: any) => (
              <li onClick={() => setContactId(contact._id)}  key={contact._id} className="hover:bg-[#121212] items-center cursor-pointer list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  />
                </div>
                <div>
                  <div>{contact.name}</div>
                  <div className="text-xs text-blue-500 uppercase font-semibold">
                  {contact.type} , {contact.relation}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs">{contact.phone}</div>
                  <div className="text-xs opacity-60">{contact.email}</div>
                </div>
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            ))}
          </>
        ) : (
          `No contacts found`
        )}
      </ul>
    </Suspense>
  );
};

export default ContactList;
