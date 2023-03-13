import React from "react";
import ZING001 from "../assets/photos/1001.jpg";
import ZING002 from "../assets/photos/1002.jpg";
import ZING003 from "../assets/photos/1003.jpg";

function Zingaat() {
  return (
    <div className="relative h-full overflow-hidden">
    <div style={{ top: 0, transform: "rotate(180deg)" }} className="wrap-grid-container opacity-20">
					<div className="grid-container">
						<div className='grid-top-gradient'></div>
						{
							[...Array(250)].map((_, i) => {

								return (
									<div key={i} className='grid-item'></div>
								)
							})
						}
					</div>
				</div>
				<div className="wrap-grid-container opacity-20">
					<div className="grid-container">
						<div className='grid-top-gradient'></div>
						{
							[...Array(250)].map((_, i) => (
								<div key={i} className='grid-item'></div>
							))
						}
					</div>
				</div>
				{/* Gradient */}
				<div className='absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-25 pointer-events-none' />
				<div className='absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-25 pointer-events-none' />

      <h1 className="font-heading text-center my-12 text-[2rem] sm:text-[4rem]  font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
        Zingaat: Cultural Night
      </h1>
      <section id="major-usp">
        <div className="w-full pb-20 gap-8 md:gap-0 px-[10%] flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center items-center max-h-[70vh]">
            <img src={ZING001} className="w-11/12 sm:w-9/12 shadow-xl rounded-lg border-2 border-primary" alt="" />
          </div>
          <div className="flex-1 flex justify-center items-center">
          
            <p className="justify-center items-center text-justify">
            Ananta 23 is proud to present "Zingaat" - a celebration of youth, joy, and vitality! <br /><br />
Zingaat is a one-of-a-kind event that celebrates the free spirit of the young generation. It's a night full of music, dance, and energy, where you can let loose and have fun with your friends.
<br /> <br /> Our lineup includes some of the most talented performers and artists of GSFC University, who will keep you dancing all night long. We'll showcase a mix of popular and new songs, ranging from hip-hop and electronic music to Bollywood and regional beats.


 </p>
          </div>
        </div>
        <div className="w-full pb-20 gap-8 md:gap-0 px-[10%] flex flex-col-reverse md:flex-row">
        <div className="flex-1 flex justify-center items-center">
          
          <p className="justify-center items-center text-justify">
          The theme for this year’s Cultural night is- <b>“RETRO INDIE’’</b>

<br /><br />Our theme for the evening is inspired by the rebellious spirit and unique style of the indie music scene, which emerged during the golden age of rock and roll.
<br /><br />We'll transport you back in time with our retro-inspired decor, featuring neon lights, vintage posters, and iconic album covers from the indie music legends of the past. Our music lineup includes a mix of classic indie rock hits performed by our talented performers. You'll experience the raw energy, passionate vocals, and driving rhythms of the indie rockers who defined a generation.

          </p>
        </div>
          <div className="flex-1 flex justify-center items-center max-h-[70vh]">
            <img src={ZING002} className="w-11/12 sm:w-9/12 shadow-xl rounded-lg border-2 border-primary" alt="" />
          </div>
        
        </div>
        <div className="w-full pb-20 gap-8 md:gap-0 px-[10%] flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center items-center max-h-[70vh]">
            <img src={ZING003} className="w-11/12 sm:w-9/12 shadow-xl rounded-lg border-2 border-primary" alt="" />
          </div>
          <div className="flex-1 flex justify-center items-center">
          
            <p className="justify-center items-center text-justify">
            But that's not all - we've also got some exciting activities lined up, including photo booths and open mic performances where you can showcase your talent. You'll have the chance to show off your moves and connect with other like-minded individuals.

<br /><br />At Zingaat, we believe in celebrating the unique spirit of the youth - their energy, creativity, and passion. This event is all about letting go of inhibitions, breaking free from routine, and having a great time. So join us for a night of non-stop entertainment, where you can dance, sing, and create memories that will last a lifetime. Get ready to let your hair down and experience the thrill of Zingaat!
           
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Zingaat;
