import React from 'react'

import PartnersData from '../assets/Partners.json'

function Partners() {
    return (
        <>

            <h1 className="font-heading text-6xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Our Partners
            </h1>
            <div className="flex gap-10 mb-20 mx-10 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
                {PartnersData.Partners.map((info, index) => (
                    <PartnersCard info={info} key={index} />
                ))}


            </div>


            <h1 className="font-heading text-6xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Past Partners
            </h1>
            <div className="flex gap-10 mb-20 mx-10 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
                {PartnersData.Partner2.map((info, index) => (
                    <PartnersCard info={info} key={index} />
                ))}


            </div>


        </>

    )
}

function PartnersCard({ info }) {
    return (
        <div className="flex p-8 justify-center  sm:justify-start  rounded-lg border-2 shadow-md border-[#78BDC4]">
            <img src={`/partner/${info.image}`} className='h-20 items-center' alt="" />
            {/* <h1 className=" text-bold text-center text-2xl font-semibold">{info.role}</h1> */}
        </div>

    )
}
export default Partners


// import React from 'react'
// import Partner from '../assets/Partners.json'


// function Partners({ par }) {
//     return (
//         <>
//             <h1 className="font-heading text-center my-12 text-6xl font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
//                 Our Partners
//             </h1>

//             <div className="flex gap-10 mb-20 mx-10 flex-col bg-white sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
//                 <div className="flex p-8 justify-center sm:justify-start  rounded-lg border-2 shadow-md border-[#78BDC4]">
//                     <img src={`/Partner/${Par.image}`} className='h-20 items-center' alt="" />
//                     <h1 className="text-white text-bold text-center text-2xl font-semibold">{par.name}</h1>
//                 </div>

//             </div>


//         </>
//     )
// }

// export default Partners