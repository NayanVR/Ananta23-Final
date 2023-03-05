import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import toast from 'react-hot-toast';


function Question() {

    const { currentUser, profile } = useContext(AuthContext);

    const serverURL = import.meta.env.VITE_SERVER_URL;

    const [question, setQuestion] = useState('')

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken().then((token) => {
                fetch(serverURL + "/api/secure/qotd", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setQuestion(data.data)
                    })
            })
        } else {
            toast.error('Please login to continue')
        }
    }, [])

    function checkAnswer(Answer) {
        if (currentUser && profile) {

            const PID = profile.ParticipantID;
            const QID = question.QID;

            currentUser.getIdToken().then((token) => {
                fetch(serverURL + "/api/secure/qotd", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ QID, PID, Answer })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.type === "success") {
                            toast.success(data.message, { duration: 3000 })
                        } else {
                            toast.error(data.message, { duration: 3000 })
                        }
                    })
            })
        }
    }

    return (
        question ? (
            <div className='flex flex-col pt-3 py-7 mx-4 md:mx-0 items-center'>

                <div className='w-full  md:w-8/12 h-1/4 my-2  border border-5 text-lg border-primary   shadow-md rounded-sm  md:mx-3 text-center'>{question.Question}</div>

                <button onClick={_ => checkAnswer("A")} className=' w-full md:w-8/12  h-1/4 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white'>{question.OptionA}</button>

                <button onClick={_ => checkAnswer("B")} className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white'>{question.OptionB}</button>

                <button onClick={_ => checkAnswer("C")} className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white'><span>{question.OptionC}</span></button>

                <button onClick={_ => checkAnswer("D")} className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white'>{question.OptionD}</button>
            </div>
        ) : (
            <div className='flex flex-col pt-3 py-7 mx-4 md:mx-0 items-center'>
                <div className='w-full  md:w-8/12 h-1/4 my-2  border border-5 text-lg border-primary   shadow-md rounded-sm  md:mx-3 text-center'>Loading...</div>
            </div>
        )
    )
}



export default Question