import React, { Component } from 'react'
import { ReactMic } from 'react-mic'
import { ClipLoader } from "react-spinners"
import axiosSTT from '../../Axios and config/axiosSTT'
import axiosTTS from '../../Axios and config/axiosTTS'
import StartButton from './StartButton'
import StopButton from './StopButton'
export default class Record extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            transcript: '',
            isRecord: false,
            url: ''
        }
        this.audio = new Audio()
        this.speechReceived = this.speechReceived.bind(this)
    }
    /*
        function for react-mic 
    */
    startRecording = () => {
        this.audio.pause()
        this.setState({
            isRecord: true
        })
        console.log('click', this.state.isRecord)
    }

    stopRecording = () => {
        if (this.state.isRecord !== false) this.isLoading(true)
        this.setState({
            isRecord: false
        })
        console.log('click', this.state.isRecord)
    }

    speechReceived(recordedBlob) {
        //send user's voice to fpt to get response text
        this.speechToText(recordedBlob.blob)
    }
    /*
        function for data
    */
    setText = (responseText) => {
        this.setState({
            transcript: responseText
        })
    }

    linkIsReady = () => {
        this.setState({

        })
    }

    isLoading = (boolean) => {
        this.setState({
            isLoading: boolean
        })
    }

    speechToText = (blob) => { //binary large object 
        let responseText
        axiosSTT
            .post('', blob)
            .then(response => {
                responseText = response.data.hypotheses[0].utterance
                let string = responseText.replace(/\.|,/g, '');
                console.log(string)
                this.isLoading(false)
                this.setText(string)
                this.textToSpeech(string)
            }).catch(err => {
                console.log('Request to FPT error: ', err);
                console.log(process.env)
            })
    }

    textToSpeech = (tts) => {
        let urlResponse
        axiosTTS
            .post('', tts)
            .then(response => {
                urlResponse = response.data.async
                console.log(urlResponse)
                this.waitLinkAvailable(urlResponse, 5000)
            }).catch(err => {
                console.log('Text to speech error: ', err);
            })
    }

    waitLinkAvailable = (url, timeout) => {
        console.log('start')
        setTimeout(() => {
            var audio = document.getElementById('audio')
            audio.src = url
            audio.load()
        }, timeout);
    }
    /* 
    
    componentWillMount and componentDidMount

    */
    render() {
        const { isLoading, transcript, isRecord } = this.state
        return (
            <>
                <div className="container-fluid">
                    <div className="d-flex justify-content-center">
                        <ReactMic
                            record={isRecord}
                            className="sound-wave aw-soundWave pt-3"
                            onStop={this.speechReceived}
                            mimeType="audio/mp3"
                            strokeColor="#FF0000"
                            backgroundColor="#FFFFFF"
                        />
                    </div>
                    <div className="row justify-content-center mt-2">
                        <StartButton startRecording={this.startRecording} />
                        <StopButton stopRecording={this.stopRecording} />
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <p className="display-4 text-center">
                            {isLoading ? <ClipLoader /> : transcript}
                        </p>
                    </div>
                </div>
                <div>
                    <h3>Audio Here</h3>
                    <br />
                    <audio id="audio" controls="controls">
                        <source id="adudioSource" src="" type="audio/mpeg" />
                                Your browser does not support the audio element.
                    </audio>
                </div>
            </>
        )
    }
}

