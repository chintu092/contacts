/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoMdCog } from "react-icons/io";
import { useAuth } from "./auth/AuthContext";
import ContactList from "./components/Contacts";
import React, { useState } from "react";
import ContactById from "./components/Contacts/contactbyid";
import Cookies from "js-cookie";

const Home = () => {
  const authContext = useAuth();
  if (!authContext) {
    return <div>Error: Auth context is not available</div>;
  }
  const { user, logout } = authContext;

  const signout = () => { 
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
    // logout();
  };

  const [message, setMessage] = useState("");

  // Callback function to receive data from child
  const handleChildData = (data: any) => {
    setMessage(data);
  };

  const token = Cookies.get("usercookie");

  console.log(user);

  const contactAdd = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Sandip Das",
          email: "sandip@mail.com",
          phone: "8972442389",
          type: "Friend",
          relation: "Friend",
          address: "Kolkata",
          notes: [
            {
              text: "This is a new note from Frontend.",
              
            },
            {
              text: "This is another new note from Frontend.",
             
            },
          ],
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Data Added", data);
      } else {
        alert("Data Added failed");
      }
    } catch (error) {
      console.error("Data Added error", error);
    }
  };

  return (
    <>
     <div className="container max-w-[100%] mx-auto p-[40px]">
      <div className="relative flex flex-row gap-5 items-center h-[calc(100vh-80px)] overflow-hidden">
        <div className="sidebar flex flex-col justify-between border-r-1 pl-4 border-[#262626] pr-4 w-3/12 h-full">
          <div className="top_section">
            <div className="navbar bg-[#0a0a0a]">
              <div className="flex-1 text-xl">Contacto</div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />{" "}
                      </svg>
                      <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="searchbar">
              <label className="input w-full bg-[#121212]">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" className="grow" placeholder="Search" />
                <kbd className="kbd kbd-sm bg-blue-600">⌘</kbd>
              </label>
            </div>
            <div className="add_contact mt-2">
              <button
                onClick={contactAdd}
                className="btn btn-block shadow-none bg-blue-500 text-[#fff] hover:bg-blue-900 hover:text-[#fff] rounded-lg border-0"
              >
                Add Contact
              </button>
            </div>
          </div>
          {user ? (
            <div className="bottom_section">
              <div className="user_box pb-2 flex gap-2 items-center justify-between mt-4">
                <div className="user_info flex gap-2 items-center">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <div className="capitalize user_name text-[#67696b]">
                    {user?.name ? user?.name : user?.username}
                  </div>
                </div>
                <div
                  className="user_actions cursor-pointer hover:text-blue-500"
                  onClick={signout}
                >
                  <IoMdCog />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mainbox  w-4/12 h-full">
          <div className="contact_list_box">
            <div className="contact_list_count text-[#67696b] text-xs">
              {/* {contacts && contacts?.length > 0 ? `${contacts.length} Total` : ""}  */}
            </div>
            <h1 className="text-xl font-semibold text-white">Contacts</h1>
            <ContactList sendDataToParent={handleChildData} />
          </div>
        </div>
        <div className="sidebar-right  w-5/12 h-full bg-[#121212] rounded-lg overflow-hidden">
          <ContactById contactId={message} />
        </div>
      </div>
    </div>
    <dialog id="my_modal_1" className="modal">
  <div className="modal-box bg-[#121212]">
    <h3 className="font-bold text-lg">Alert!</h3>
    <p className="py-4">Are you sure want to Logout?</p>
    <div className="modal-action">
      <form method="dialog">
      <div className="btn p-3 h-[30px]" onClick={logout}>Signout</div>
       
        <button className="btn btn-warning ml-2 p-3 h-[30px]">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
   
  );
};

export default Home;
