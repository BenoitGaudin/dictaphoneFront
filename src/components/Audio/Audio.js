import React, { useEffect, useState } from "react"
import "./Audio.css";
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 96 });

const Audio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const [authorize, setAuthorize] = useState(true);

    useEffect(() => {
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );

        navigator.getUserMedia({ audio: true },
            () => { setAuthorize(true) },
            () => { setAuthorize(false) }
        );

    }, []);

    const start = () => {
        if (!authorize) {
            alert('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => setIsRecording(true))
                .catch((e) => console.error(e));
        }
    };

    const stop = () =>
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([_, blob]) => {
                showRecordInView(blob)
                setIsRecording(false)
                return blob
            })
            .then(encodeAndStore)
            .catch(e => console.log(e));

    const reset = () => setBlobURL('');

    function showRecordInView(blob) {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL)
    }

    return (
        <div className="row d-flex justify-content-center mt-5 ">
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={start} disabled={isRecording}>RECORD</button></div>
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={stop} disabled={!isRecording}>STOP</button></div>
            <div className="buttonRecord">
                <button className="btn btn-light border-dark" onClick={reset} disabled={!(blobURL != '')}>RESET</button></div>
            <audio src={blobURL} controls="controls" />
        </div >
    )
}

function encodeAndStore(blob) {
    const filename = `${new Date().toISOString()}.mp3`;
    blobToBase64(blob).then(b64 => {
        let body = { filename: filename, buffer: b64 }
        return storeRecord(body.filename, body.buffer)
    })
}

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

export default Audio