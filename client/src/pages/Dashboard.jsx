function Dashboard({ profile }) {

    return (

        <div className='flex-col justify-center items-center w-full h-max lg:py-10 bg-primary-light-3 lg:px-60' >
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                    <div className='px-4 py-5 sm:px-6'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
                    </div>
                    <button className='py-2 px-6 h-1/4 items-end rounded-md bg-primary-dark-1 text-white'>EDIT</button>
                </div>
                <div className="border-t border-gray-200">
                    {
                        Object.entries(JSON.parse(profile)).map(([key, value], index) => {
                            return <TextField title={key} value={value} index={index} key={index} />
                        })
                    }
                </div>
            </div>
            <div className="overflow-hidden mt-10 bg-white shadow sm:rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                    <div className='px-4 py-5 sm:px-6'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
                        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Application for</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                        </div>

                    </dl>
                </div>
            </div>

        </div>

    )
}

function TextField({ title, value, index }) {

    const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'

    return (
        <div className={`${bgColor} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
            <dt className="text-sm font-medium text-gray-500">{title}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
        </div>
    )
}


export default Dashboard