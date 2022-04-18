import React from 'react';
import { useState } from 'react';

import "./Contact.css"


const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    return (
        <div>

            <div className='tableContact'>
                <div className="form-group">
                    <label htmlFor="name">
                        YOUR NAME
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="email">
                        YOUR EMAIL
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="message">
                        YOUR MESSAGE
                        <textarea
                            type="text"
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">SEND</button>


            </div >
        </div>
    );
};

export default Contact;