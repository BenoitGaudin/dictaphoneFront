import React, { useEffect, useState } from "react"
import "./Audio.css";
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Mp3Recorder = new MicRecorder({ bitRate: 96 });

const Audio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const [authorize, setAuthorize] = useState(true);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:3000/token', { withCredentials: true });
            setToken(response.data.accessToken);
            console.log('stored token during refresh', response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken);
            console.log(decoded)
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
                console.log(error)
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:3000/token', { withCredentials: true });
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            console.log('stored token during interceptor', response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken);
            console.log('token', token)
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

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

    function encodeAndStore(blob) {
        const filename = `${new Date().toISOString()}.mp3`;
        blobToBase64(blob)
            .then(b64 => storeRecord(filename, b64))
    }

    let storeRecord = (filename, buffer) =>
        axiosJWT.post('http://localhost:3000/record', {
            filename: filename,
            buffer: buffer
        }, { withCredentials: true })

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

let blobToBase64 = (blob) =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            resolve(reader.result);
        };
    });

export default Audio