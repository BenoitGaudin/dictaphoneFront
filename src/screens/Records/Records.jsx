import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarRecords from '../../components/NavbarRecords/NavbarRecords';
import './Records.css'



const Records = () => {

    const [records, setRecords] = useState([]);

    const b64toBlob = (base64, type = 'application/octet-stream') =>
        fetch(`data:${type};base64,${base64}`).then(res => res.blob())

    let getRecords = async () => {
        let response = await axios.get('http://localhost:3000/records')
        let records = response.data

        console.log('records:', records)

        let recordsAsMp3 = records.map(async r => {
            console.log('converting to blob', r)

            let blob = await b64toBlob(r.buffer)
            return {
                filename: r.filename,
                blob: blob
            }
        })

        setRecords(recordsAsMp3)
    }

    useEffect(() => {
        getRecords();
    }, []);

    let recordsElems = records.map(r => (
        <tr>
            <th scope="row "></th>
            <td>{r.filename}</td>
            <td>BOUTON PLAY</td>
            <td>DELETE</td>
            <td><a href={r.blob}>DOWNLOAD</a></td>
            <td>CONTACT</td>
        </tr>
    ))

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