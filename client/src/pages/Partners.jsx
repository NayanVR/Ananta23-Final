import React from 'react'

import PartnersData from '../assets/Partners.json'

function Partners() {
    return (
        <>

            <h1 className="font-heading text-6xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Our Partners
            </h1>
            <div className="flex  gap-9 mb-10 mx-10 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
                {PartnersData.Partnersmain.map((info, index) => (
                    <div className="relative flex p-8 justify-center items-center rounded-lg border-2 shadow-md border-[#78BDC4]">
                    <img src={`/partner/${info.image}`} className='h-56 items-center  pb-3 border-b-2 ' alt="" />
                    
                    {/* <h1 className=" text-bold text-center text-2xl font-semibold">{info.category}</h1> */}
                   
                    {/* <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-black text-bold text-center text-sm font-semibold mb-1 bg-amber-200 ">Partner 00</h1> */}
                    
                    <h1 className="flex w-max absolute bottom-0 left-1/2 -translate-x-1/2  text-black text-bold text-center text-lg font-bold  py-1  ">{info.category}</h1>
                
                </div>
                   
                  
                ))}
                


            </div>
            <div className="flex  gap-9 mb-20 mx-16 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
              
                {PartnersData.Partners.map((info, index) => (
                    
                    <PartnersCard info={info} key={index} />
                  
                ))}


            </div>


            {/* <h1 className="font-heading text-6xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Past Partners
            </h1>
            <div className="flex gap-9 mb-20 mx-10 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
                {PartnersData.Partner2.map((info, index) => (
                    <PartnersCard info={info} key={index} />
                ))}


            </div> */}


        </>

    )
}

function PartnersCard({ info }) {
    return (
        <>
            <div className="relative flex p-8 justify-center items-center rounded-lg border-2 shadow-md border-[#78BDC4]">
                <img src={`/partner/${info.image}`} className='h-28 items-center  pb-5 border-b-2 ' alt="" />
                
                {/* <h1 className=" text-bold text-center text-2xl font-semibold">{info.category}</h1> */}
               
                {/* <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-black text-bold text-center text-sm font-semibold mb-1 bg-amber-200 ">Partner 00</h1> */}
                
                <h1 className="flex w-max absolute bottom-0 left-1/2 -translate-x-1/2  text-black text-bold text-center text-md font-semibold py-1  ">{info.category}</h1>
            
            </div>
             {/* <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-black text-bold text-center text-2xl font-semibold mb-2 ">{info.category}</h1> */}
        </>

    )
}
export default Partners



// "Partner2": [
//     {
//         "image": "GSFC ltd.png"
        
        
//     },
//     {
//         "image": "GGRC.png"
        
//     },
//     {
//         "image": "PMC.png"
        
//     },
//     {
//         "image":"GIPCL.png"
//     },
//     {
//         "image":"RED.png"
//     },
//     {
//         "image": "Kanan.png"
        
//     },
    
//     {
//         "image": "Glocal Colliance.png"
        
//     },
    
//     {
//         "image": "IMS.png"
//     },
//     {
//         "image":"AIE.png"
//     },
   
    
//     {
//         "image":"ACUMEN.png"
//     },
//     {
//         "image":"AOne.png"
//     }
// ]