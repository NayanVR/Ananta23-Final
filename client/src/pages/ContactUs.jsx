import React from 'react'
import UserIcon from '../assets/icons/User.svg'
import PhoneIcon from '../assets/icons/Phone.svg'
import EmailIcon from '../assets/icons/Email.svg'
import DiamondIcon from '../assets/icons/Diamond.svg'

export default function ContactUs() {

    const membersInfo = [
        {
            name: "Viraj Patel",
            role: "President",
            email: "20bt04039@gsfcuniversity.ac.in",
            phone: "8140390836"
        },
        {
            name: "Harsh Tanna",
            role: "Vice President",
            email: "20bba01067@gsfcuniversity.ac.in",
            phone: "6359812434"
        },
        {
            name: "Khyati Shah",
            role: "Secretary",
            email: "20sc02027@gsfcuniversity.ac.in",
            phone: "9157315777"
        },
        {
            name: "Varada Deshpande",
            role: "Joint Secretary",
            email: "20bt04039@gsfcuniversity.ac.in",
            phone: "9687349441"
        },
        {
            name: "Bhagya Kothadiya",
            role: "Treasurer",
            email: "20bba01058@gsfcuniversity.ac.in",
            phone: "9558148632"
        },
        {
            name: "Parth Rola",
            role: "Event Manager",
            email: "20bt01050@gsfcuniversity.ac.in",
            phone: "8153900621"
        },
        {
            name: "Sneh Padaliya",
            role: "Event Head - SoT",
            email: "21bt04122@gsfcuniversity.ac.in",
            phone: "6353978704"
        },
        {
            name: "Ujash Lakod",
            role: "Event Head - SoS",
            email: "20sc01010@gsfcuniversity.ac.in",
            phone: "9106203344"
        },
        {
            name: "Anshika Jain",
            role: "Evenet Head - SoM",
            email: "22bba01003@gsfcuniversity.ac.in",
            phone: "9116626003"
        },
        {
            name: "Renish Narola",
            role: "Sponsorship Head",
            email: "20bt04025@gsfcuniversity.ac.in",
            phone: "8866929832"
        },
        {
            name: "Viral Sachde",
            role: "Co-Sponsorship Head",
            email: "21bt04107@gsfcuniversity.ac.in",
            phone: "9484991399"
        },
        {
            name: "Devansh Shah",
            role: "Marketing Head",
            email: "21bt04d062@gsfcuniversity.ac.in",
            phone: "8154850006"
        },
        {
            name: "Khushi Panchal",
            role: "Co-Marketing Head",
            email: "21bt04038@gsfcuniversity.ac.in",
            phone: "9016535646"
        },
        {
            name: "Ashish Kumar Patel",
            role: "Web Team Head",
            email: "20bt04004@gsfcuniversity.ac.in",
            phone: "7567956523"
        },
        {
            name: "Nishant Viroja",
            role: "Co-Web Team Head",
            email: "20bt04052@gsfcuniversity.ac.in",
            phone: "7574914108"
        },
        {
            name: "Devanshi Patel",
            role: "Creative Team Head",
            email: "20bt04033@gsfcuniversity.ac.in",
            phone: "9104839527"
        },
        {
            name: "Het Pastagia",
            role: "Creative Team Head",
            email: "21bt04061@gsfcuniversity.ac.in",
            phone: "8866584244"
        },
        {
            name: "Heet Patel",
            role: "Accounts Team Head",
            email: "20bba01039@gsfcuniversity.ac.in",
            phone: "8128857928"
        },
        {
            name: "Samarth Desai",
            role: "Resource Team Head",
            email: "20bt01014@gsfcuniversity.ac.in",
            phone: "9377004949"
        }
    ]


    return (
        <div>
            <div className='w-full h-max py-20 bg-gradient-to-b from-primary-light-1 to-primary'>
                <h2 className='text-4xl font-heading font-bold text-white text-center'>
                    Contact Us
                </h2>
            </div>
            <div className='max-w-[1200px] m-auto grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:grid-cols-3 place-items-center my-16'>
                {
                    membersInfo.map((member, index) => <InfoCard cardInfo={member} key={index} />)
                }
            </div>
        </div>
    )
}

function InfoCard({ cardInfo }) {
    return (
        <div className='flex flex-col h-max w-96 gap-2 border-2 border-primary-dark-1 bg-primary-light-3 rounded-lg p-4'>
            <div className='flex justify-start items-center gap-4'>
                <div className='p-2 bg-primary-dark-1 rounded-lg'>
                    <img className='w-6' src={UserIcon} alt="Name" />
                </div>
                <p>{cardInfo.name}</p>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <div className='p-2 bg-primary-dark-1 rounded-lg'>
                    <img className='w-6' src={DiamondIcon} alt="Name" />
                </div>
                <p>{cardInfo.role}</p>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <div className='p-2 bg-primary-dark-1 rounded-lg'>
                    <img className='w-6' src={EmailIcon} alt="Name" />
                </div>
                <p>{cardInfo.email}</p>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <div className='p-2 bg-primary-dark-1 rounded-lg'>
                    <img className='w-6' src={PhoneIcon} alt="Name" />
                </div>
                <p>{cardInfo.phone}</p>
            </div>
        </div>
    )
}