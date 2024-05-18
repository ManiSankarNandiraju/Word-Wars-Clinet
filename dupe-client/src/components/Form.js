import React from 'react';
import './Form.css';

export default function Form(props) {
    // Set the background class dynamically based on your logic
    const backgroundClass = 'background-form'; // replace this with your logic

    // Apply the class to the body element
    document.body.className = backgroundClass;

    return (
        <form className="form-style">
            <div className='name'>
                <label>Name</label>
            </div>
            <input
                placeholder=' Enter Name'
                type="text"
                value={props.username}
                onChange={props.onChange}
                style={inputStyle}
            />

            <button className="connect" onClick={props.connect}>Connect</button>
        </form>
    );
}

const inputStyle = {
    position: 'relative',
    marginTop: '50px',
    borderRadius: '15px',
    height: '50px',
    alignItems: 'center',
    width: '325px',
    background: '#FFF',
    color: 'black'
};
