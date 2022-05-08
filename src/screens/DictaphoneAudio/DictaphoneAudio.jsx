import React from 'react';
import { Link } from 'react-router-dom';
import Audio from '../../components/Audio/Audio';

import './DictaphoneAudio.css'


const DictaphoneAudio = () => {
    return (
        <div>
            <div className='backgroundDictaphoneAudio'>
                <div className="text-center"><Link to="/">
                    <button type="button" class="big-logo btn -lg " >dictaphone</button>
                </Link>
                </div>
                <Audio />
            </div>
        </div>

    );
};

export default DictaphoneAudio;