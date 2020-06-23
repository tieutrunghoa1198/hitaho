import React from 'react'
export default function StopButton(props) {
    return (
        <div
        //delete commit
            className="btn btn-th btn-danger my-1 mx-1 col-6 col-sm-2 col-xl-2"
            onClick={props.stopRecording}>
            Stop
        </div>
    )
}
