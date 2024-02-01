'use client';
import {useState} from 'react';

export default function UploadFile() {
    function handleClick() {
        alert('You clicked me!');
    }

    return (
        <div className = 'px-2 rounded-lg ring-2 ring-accent-yellow'>
            
            <button onClick={handleClick}>
            </button>

            <input
                type='file'
            />
        </div>
    );
}
