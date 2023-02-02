import React from 'react'
import Anantalogo from '../assets/logos/ananta_logo.svg'
// import Renish from '../assets/photos/team/Renish.jpg'
// import Khyati from '../assets/photos/team/Khyati.jpg'
import User from '../assets/icons/User.svg'
import EmailIcon from '../assets/icons/Email.svg'
import Phone from '../assets/icons/Phone.svg'
import WP from '../assets/icons/Whatsapp.svg'
import Linkedin from '../assets/icons/Linkedin.svg'
import TeamData from '../assets/Team.json'

function Team() {
    return (
        <>
            {/* leader */}
            <h1 className="font-heading text-7xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Contact Us
            </h1>

            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    LEADERSHIP TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.leadership1.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>
                <div className='flex flex-wrap mt-8 gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.leadership2.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>


            </div>
            {/* event */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-10 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    EVENT TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.eventTeam1.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>
                <div className='flex flex-wrap mt-8 gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.eventTeam2.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* sponsor */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    SPONSORSHIP TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.sponsors.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* marketing */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    MARKETING TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.marketing.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* web */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    WEB TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.web.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* design */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    CREATIVE TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.creative.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* account */}
            <div className='flex flex-col items-center justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    ACCOUNTS TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.accounts.map((info, index) => (
                        <TeamCard info={info} key={index} />
                    ))}

                </div>



            </div>
            {/* resource */}
            <div className='flex flex-col items-center mb-10 justify-center  '>
                <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    RESOURCE TEAM
                </h1>
                <div className='flex flex-wrap gap-8 justify-center items-center max-w-[64rem]  '>

                    {TeamData.resource.map((info, index) => (
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
export default Team 