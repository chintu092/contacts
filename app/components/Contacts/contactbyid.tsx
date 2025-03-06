/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Cookies from "js-cookie";
import useFetchContacts from '@/app/hook/useContact';

const ContactById = ({contactId}:any) => {
    const apiUrl = contactId ? `${process.env.NEXT_PUBLIC_CONTACT_URL}/${contactId}` : "";
    const token = Cookies.get("usercookie");
    const { contacts, loading } = useFetchContacts(apiUrl, token);
    
    if (contactId && loading)
        return (
          <div className="flex w-full flex-col gap-4 mt-3 p-4">
           
              <div className="flex items-center gap-4">
                <div className="skeleton bg-[#000] h-16 w-[64px] shrink-0 rounded-full"></div>
                <div className="flex flex-col w-[calc(100%-64px)] gap-4">
                  <div className="skeleton bg-[#000] h-4 w-[80%]"></div>
                  <div className="skeleton bg-[#000] h-4 w-full"></div>
                </div>
              </div>
           
          </div>
        );

  return (
    <>
  
{contactId && !loading ?
<>
<div className="hero bg-linear-[180deg,#121212_5%,#000_60%,#000_90%,#000] min-h-[200px]">
    <div className="hero-content text-center">
      <div className="max-w-md">
      <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <h3 className="text-xl">   {contacts.name}</h3>
        <div className="text-xs text-blue-500 uppercase font-semibold">
        {contacts.type} ,   {contacts.relation}
          </div>
        <p className="mt-2 text-sm text-[#67696b]">
        {contacts.phone},   {contacts.email}
        </p>
    
      </div>
    </div>
  </div>
  <div className="w-full p-4">   
        <h3 className="text-sm text-[#ffffff]">Address</h3>
     
                <div  className="bg-black mt-2 rounded-xl p-3 notes-list-inner text-sm text-[#fff]">{contacts.address}</div>
          
      </div> 
    {contacts.notes && contacts.notes.length > 0 ? (
      <div className="w-full p-4">   
        <h3 className="text-sm text-[#ffffff]">Notes</h3>
        <div className="notes-list">  
            {contacts.notes.map((note:any) => (
                <div key={note._id} className="bg-black mt-2 rounded-xl p-3 notes-list-inner text-sm text-[#868687]">{note.text}</div>
                ))}
        </div>
      </div>     
            ) : null}

  </> 
  : null} 
</>

  )
}

export default ContactById
