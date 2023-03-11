import React from 'react'
import PMC from '../assets/logos/PMC.png'
import Linkedin from '../assets/icons/linkedin_icon.svg'

function Testimonial() {
    return (
        <>


            <div className='grid place-item-center h-full bg-primary'>
                <div className='grid grid-cols-2 p-10 gap-10'>
                    <figure className='bg-white rounded-lg shadow-lg overflow-hidden hover:rotate-1 transition-none duration-200 '>
                        <blockquote className='p-8'>
                            <p className='font-bold text-lg'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus totam atque ea voluptatem, sapiente eius dignissimos natus officia et consectetur sint vel ipsam eveniet non vero, a quaerat, illo est.
                            </p>
                        </blockquote>
                        <div className='flex items-center justify-between px-8 py-4 bg-primary-light-1'>
                            <div className='flex items-center gap-5'>
                                <div className=' w-20 h-14  '>
                                    <img src={PMC} alt="" />
                                </div>
                                <figcaption className='text-white font-semibold'>
                                    <div>Pratham Pathak </div>
                                    <div className='opacity-70'>Developer </div>
                                </figcaption>
                            </div>
                            <a href="" className='text-white/50'>
                                <img src={Linkedin} alt="" />
                            </a>

                        </div>
                    </figure>
                </div>
            </div>


        </>
    )
}

export default Testimonial