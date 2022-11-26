import React, { useState } from 'react';
const Icon = () => {
    const [state, setState] = useState('inactive');

    const currentState = () => {
        switch(state) {
            case 'inactive': 
                return (
                    <path d="M14 0H2C0.875 0 0 0.90625 0 2V11C0 12.125 0.875 13 2 13H5V15.625C5 15.875 5.15625 16 5.375 16C5.4375 16 5.5 16 5.59375 15.9375L9.5 13H14C15.0938 13 16 12.125 16 11V2C16 0.90625 15.0938 0 14 0ZM14.5 11C14.5 11.2812 14.25 11.5 14 11.5H9L8.59375 11.8125L6.5 13.375V11.5H2C1.71875 11.5 1.5 11.2812 1.5 11V2C1.5 1.75 1.71875 1.5 2 1.5H14C14.25 1.5 14.5 1.75 14.5 2V11Z" fill="#12151D" fill-opacity="0.6"/>
                )
            case 'active': 
                return (
                    <>
                        <rect width="30" height="30" rx="15" fill="#006CFA" fill-opacity="0.3"/>
                        <path d="M21 7H9C7.875 7 7 7.90625 7 9V18C7 19.125 7.875 20 9 20H12V22.625C12 22.875 12.1562 23 12.375 23C12.4375 23 12.5 23 12.5938 22.9375L16.5 20H21C22.0938 20 23 19.125 23 18V9C23 7.90625 22.0938 7 21 7ZM21.5 18C21.5 18.2812 21.25 18.5 21 18.5H16L15.5938 18.8125L13.5 20.375V18.5H9C8.71875 18.5 8.5 18.2812 8.5 18V9C8.5 8.75 8.71875 8.5 9 8.5H21C21.25 8.5 21.5 8.75 21.5 9V18Z" fill="#006CFA"/>
                    </>
                )
            case 'clicked': 
                return (
                    <>
                        <rect width="30" height="30" rx="15" fill="#006CFA"/>
                        <path d="M21 7H9C7.875 7 7 7.90625 7 9V18C7 19.125 7.875 20 9 20H12V22.625C12 22.875 12.1562 23 12.375 23C12.4375 23 12.5 23 12.5938 22.9375L16.5 20H21C22.0938 20 23 19.125 23 18V9C23 7.90625 22.0938 7 21 7ZM21.5 18C21.5 18.2812 21.25 18.5 21 18.5H16L15.5938 18.8125L13.5 20.375V18.5H9C8.71875 18.5 8.5 18.2812 8.5 18V9C8.5 8.75 8.71875 8.5 9 8.5H21C21.25 8.5 21.5 8.75 21.5 9V18Z" fill="white"/>
                    </>
                )
        }
    }

    return (
        <svg 
            style={{
                position: 'relative', 
                left: state !== 'inactive' ? -7 : 0, 
                top: state !== 'inactive' ? -7 : 0
            }}
            onClick={() => setState('clicked')}
            onMouseOver={() => state !== 'clicked' && setState('active')}
            onMouseOut={() => setState('inactive')}
            width="30" height="30" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            {
                currentState()
            }
        </svg>
    )
}

export default Icon;