import React, { useEffect, useState } from "react"
import "./Audio.css";
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 320 });

const Audio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const [authorize, setAuthorize] = useState(true);
    const [isRecordingStp, setIsRecordingStp] = useState(false);



    useEffect(() => {
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );
        //Detects the action on user click to allow or deny permission of audio device
        navigator.getUserMedia({ audio: true },
            //'Permission Granted
            () => { setAuthorize(true) },
            //'Permission Denied'
            () => { setAuthorize(false) }
        );

    }, []);

    const start = () => {
        /*
         * If the user denys permission to use the audio device
         * in the browser no recording can be done and an alert is shown
         * If the user allows permission the recoding will begin
         */
        if (!authorize) {
            alert('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true)
                }).catch((e) => console.error(e));
        }
    };
    const stop = () => {
        let blobToBase64 = (blob) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    resolve(reader.result);
                };
            });
        };
        let storeRecord = (filename, buffer) => {
            return axios.post('http://localhost:3000/record', {
                filename: filename,
                buffer: buffer
            })
        }
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                setBlobURL(blobURL)
                setIsRecording(false)
                setIsRecordingStp(true)
                return blobToBase64(blob)
            })
            .then(b64 => {
                const today = new Date();

                let body = { filename: `${today}.mp3`, buffer: b64 }
                JSON.stringify(body);
                return storeRecord(body.filename, body.buffer)
            })
            .catch((e) => console.log(e));
    };
    const reset = () => {
        /*
         * The user can reset the audio recording
         * once the stop button is clicked
         */
        document.getElementsByTagName('audio')[0].src = '';
        setIsRecordingStp(false)
    };
    return (

        <div className="row d-flex justify-content-center mt-5 ">
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={start} disabled={isRecording}>RECORD</button></div>
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={stop} disabled={!isRecording}>STOP</button></div>
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={reset} disabled={!isRecordingStp}>RESET</button></div>
            <audio src={blobURL} controls="controls" />
        </div >


    )
}
export default Audio