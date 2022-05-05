import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarRecords from '../../components/NavbarRecords/NavbarRecords';
import './Records.css'



const Records = () => {

    const [records, setRecords] = useState([]);

    const b64toBlob = (base64, type = 'application/octet-stream') =>
        fetch(`${base64}`).then(res => res.blob())

    let getRecords = async () => {
        let response = await axios.get('http://localhost:3000/records')
        let recordsR = response.data

        console.log('records:', recordsR)

        let recordsAsMp3 = await Promise.all(recordsR.map(async r => {
            console.log('converting to blob', r)

            let blob = await b64toBlob(r.buffer)
            console.log('converted', blob)
            let url = window.URL.createObjectURL(blob)
            console.log(url)
            return {
                filename: r.filename,
                blob: url
            }
        }))

        console.log('recordsAsMp3', recordsAsMp3)

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
                <td>BOUTON PLAY</td>
                <td>DELETE</td>
                <td>
                    <audio controls="controls">
                        <source src={r.blob} type="audio/mp3" />
                    </audio>
                </td>
                <td>CONTACT</td>
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