import React from 'react'

function AboutUs() {
    return (
        <div>
            <div className='w-full h-max py-20 bg-gradient-to-b from-primary-light-1 to-primary'>
                <h2 className='text-4xl font-heading font-bold text-white text-center'>
                    About Us
                </h2>
            </div>
            <div className='py-16 px-[10%] text-xl flex flex-col gap-10 text-justify'>

            <p>
            Ananta (अनंत), is a marquee annual event (fest) of GSFC university that serves as the biggest festival of the year. It derives its name from a Sanskrit word meaning “Infinite” and symbolizes the endless possibilities and opportunities it creates for every student connected with us. The annual fest provides a common platform for students, professionals, and enthusiasts alike, coming from different walks of life, and enables them to interact, network, and share their vital experiences. Above all, Ananta is a celebration of college life! 
        </p>
        <p>
        GSFC University has a strong vision of developing a student-centric culture, thereby inculcating core values of commitment, compassion, and courage among the students. The main purpose of Ananta is to unite the diverse student community according to their interests by providing a platform to express themselves and create vibrancy. Nurturing the vision of GSFC University of holistic development of their students, Ananta sets a perfect foundation to enhance and up-skill their leadership and managerial skills, team building, adaptability to different scenarios, creative and critical thinking, resource management, and many other traits.
        </p>
        <p>
        We stand out as having a core foundation with the university's ideology and integrity of giving holistic development to its students. The prospects and objectives of this fest are to diversify the students of the university by providing them a common platform to showcase and express themselves in preceding spaces like mentorship, entrepreneurship, and managerial skills. We believe in giving opportunities and experiences which will benefit students from all walks of life. The fest is for the students, by the students, and of the students.

        </p>
       
        <p className="font-bold">Your Policy and condition pages</p>
        <p>Please read our <a href="/privacy-policy" className='text-blue-900 underline'>Privacy Policy</a>,  <a href="/refund-policy" className='text-blue-900 underline'> Calcellation & Refund Policy </a> and <a href="/term&condition" className='text-blue-900 underline'>Terms and conditions</a>.</p>

        <p className="font-bold">Contact Us</p>
        <p>
          If you have any questions about this Cancellation and Refund Policy, You can contact
          us:
        </p>
        <ul className='list-disc ml-10'>
          <li>
            By email:
            <a href="mailto:ananta@gsfcuniversity.ac.in" className='text-blue-900 underline'>
              {" "}
              ananta@gsfcuniversity.ac.in
            </a>{" "}
          </li>
          <li>
            By visiting this page on our website :{" "}
            <a href="/contact-us" className='text-blue-900 underline'>anantagsfcu.in/contact-us</a>{" "}
          </li>
        </ul>
      </div>
        </div>

    )
}

export default AboutUs