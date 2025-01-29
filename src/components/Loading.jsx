import React from 'react'
import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div className="flex justify-center items-center m-10">
            <ReactLoading type="spinningBubbles" color="#007bff" height={80} width={80} />
        </div>
    )
}

export default Loading


