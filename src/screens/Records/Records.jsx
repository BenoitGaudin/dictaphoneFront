import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarRecords from '../../components/NavbarRecords/NavbarRecords';
import './Records.css'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Records = () => {

    const [records, setRecords] = useState([]);
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
            const decoded = jwt_decode(response.data.accessToken);
            console.log('token', token)
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const b64toBlob = (base64, type = 'application/octet-stream') =>
        fetch(`${base64}`).then(res => res.blob())

    let getRecords = async () => {
        let response = await axiosJWT.get('http://localhost:3000/records', { withCredentials: true })
        let recordsR = response.data

        let recordsAsMp3 = await Promise.all(recordsR.map(async r => {


            let blob = await b64toBlob(r.buffer)
            console.log('converted', blob)
            let url = window.URL.createObjectURL(blob)

            return {
                filename: r.filename,
                blob: url
            }
        }))

        setRecords(recordsAsMp3)
    }

    useEffect(() => {
        getRecords();
    }, []);

    let recordsElems = records.map(r => {
        console.log('r', r);
        return (

            <tr>
                <th scope="row "></th>
                <td>{r.filename}</td>

                <td>
                    <audio controls="controls">
                        <source src={r.blob} type="audio/mp3" />
                    </audio>
                </td>

            </tr>
        )
    })

    return (
        <div>
            <NavbarRecords />
            <table class="table table border border-dark">
                <tbody>
                    {recordsElems}
                </tbody>
            </table>
        </div>
    );
};

export default Records;