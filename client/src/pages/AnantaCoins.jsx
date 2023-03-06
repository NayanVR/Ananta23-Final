import React from 'react'



function AnantaCoins() {


  return (
    <div>
      <div className='w-full h-max py-20 bg-gradient-to-b from-primary-light-1 to-primary'>
        <h2 className='text-4xl font-heading font-bold text-white text-center'>
          Ananta Coins
        </h2>
      </div>
      <div className="py-20 px-[10%] text-xl flex flex-col gap-8 text-justify">
        <div>
          <p className="font-bold text-2xl"> What is Ananta Coins?</p>
          <p>
            Ananta Coins is concept of virtual currency which you can use to play fun events(Upshot).
          </p>
        </div>
        <div>
          <p className="font-bold text-2xl">Where can i use my Ananta Coins?</p>
          <p>You can utilize your Ananta Coins to play fun events(Upshot) by spending <span className='font-semibold'> 400 </span> coins in each participation.</p>
        </div>
        <div>
          <p className="font-bold text-2xl">How can i earn more Ananta Coins?</p>
          <ul className='list-disc ml-10'>
            <li>
              <p>There are many ways to earn more Ananta Coins. Let’s discuss one by one.</p>
            </li>
            <li>
              <p>On your first pass purchase you will get coins according to selection of your pass.</p>
              <ul className='list-decimal ml-10'>
                <li>
                  Bronze Pass  : <span className='font-semibold'>2000</span> coins
                </li>
                <li>
                  Silver Pass : <span className='font-semibold'>2200</span> coins
                </li>

                <li>
                  Gold Pass : <span className='font-semibold'>2400</span> coins
                </li>

                <li>
                  Combo Pass  : <span className='font-semibold'>2800</span> coins
                </li>
              </ul>
            </li>
            <li>
              <p>You can attend workshops or guest lectures to earn more coins.</p>
              <ul className='list-decimal ml-10'>
                <li>
                  You will get <span className='font-semibold'>1000</span> coins on workshop registration &  <span className='font-semibold'>600</span> once you attend the workshop.
                </li>
                <li>
                  You can earn <span className='font-semibold'>800</span>  for attending guest lectures.
                </li>
              </ul>
            </li>
            <li>
              <p>Win the fun event. </p>
              <ul className='list-decimal ml-10'>
                <li>
                  If you win any fun event(Upshots)  you will get <span className='font-semibold'> 800 </span> coins in return.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnantaCoins