import React from 'react'
import TeamData from '../assets/Team.json'
import User from '../assets/icons/User.svg'
import EmailIcon from '../assets/icons/Email.svg'
import Phone from '../assets/icons/Phone.svg'
import WP from '../assets/icons/Whatsapp.svg'
import Linkedin from '../assets/icons/Linkedin.svg'

function Hardworking() {
    return (
        <>

            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    WEB TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem] my-5 '>

                    {TeamData.web2.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.web1.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>
            </div>
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    SOCIAL MEADIA TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem] my-4 '>

                    {TeamData.creative1.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>
            </div>
        </>
    )
}
function TeamCard({ info }) {
    return (
        <div className='group relative items-center border-2 border-primary justify-center overflow-hidden cursor=pointer hover:shadow-xl hover:shadow-black/30  rounded-md'>
            <div className='h-96 w-72'>
                <img src={`/team/${info.image}`} className='h-full w-full object-cover group-hover:rotate-1 group-hover:scale-125    transition-transform ' alt="" />
            </div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[63%] group-hover:translate-y-0 transition-all'>
                <h1 className='text-2xl mb-16 group-hover:mb-0 font-bold text-white'>{info.role}</h1>

                <p className='text-lg itallic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity'>{info.name}</p>
                <div className=' text-white  opacity-0 group-hover:opacity-100 transition-opacity '>
                    <div className='flex pb-1 justify-center gap-3'>

                        <a href={`mailto:${info.email}`} className='text-sm'>{info.email}</a>
                    </div>
                    <div className='flex pb-2 justify-center gap-3'>

                        <p className='text-normal'>{info.phone}</p>
                    </div>

                    <div className='flex pb-2 gap-3 justify-center mt-2'>


                        <a href={`https://wa.me/+91${info.phone}`}>
                            <div className='p-2 bg-white rounded-md'>
                                <img src={WP} className='h-4' alt="" />
                            </div>
                        </a>
                        <a href={`${info.linkedin}`}>
                            <div className='p-2 bg-white rounded-md'>
                                <img src={Linkedin} className='h-4' alt="" />
                            </div></a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hardworking