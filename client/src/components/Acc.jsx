import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { HomeFAQs } from '../assets/FAQs.json'

const QuesionComponent = ({ question, answer, openIndex, index, setOpenIndex }) => {

    function handleBtnClick() {
        openIndex === index ? setOpenIndex(-1) : setOpenIndex(index);
    }

    return (
        <div className="flex flex-col justify-center items-center px-1.5 py-1.5">
            <button
                onClick={handleBtnClick}
                className="flex flex-col items-center  justify-between w-full  sm:w-3/4  font-medium text-left  border border-primary-light-1 rounded-md overflow-hidden"
            >
                <div className='flex items-center p-5 justify-between w-full'>

                    {question}
                    <svg className={`w-6 h-6 shrink-0 transition-all ${openIndex === index ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>

                {
                    openIndex === index && (
                        <div className='w-full transition-opacity bg-primary p-5 text-white'>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }} />
                        </div>
                    )
                }

            </button>

        </div>
    );
}

const FAQs = ({ faqs }) => {

    const [openIndex, setOpenIndex] = useState(-1)

    return (
        <>
            {
                faqs.map((faq, index) => (
                    <QuesionComponent question={faq.question} answer={faq.answer} openIndex={openIndex} index={index} setOpenIndex={setOpenIndex} key={index} />
                ))
            }
        </>
    )
}

const App = () => {

    return (
        <div>
            <h1 className='flex justify-center items-center mb-12 text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                FAQ's
            </h1>
            <FAQs faqs={HomeFAQs} />
        </div>
    );
}

export default App;
