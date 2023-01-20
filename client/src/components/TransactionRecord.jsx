import React from 'react'

function TransactionRecord({ data }) {

  console.log(row);
  return (
    <>
      <div className='flex flex-wrap'>
        <span>{data[0]}</span>
      </div>
    </>
  )
}

export default TransactionRecord;