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