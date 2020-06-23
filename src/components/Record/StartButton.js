import React from 'react'
export default function StartButton(props) {
    return (
        <div
            className="btn btn-th btn-primary my-1 mx-1 col-6 col-sm-2 col-xl-2"
            onClick={props.startRecording}>
            Start
        </div>
    )
}
