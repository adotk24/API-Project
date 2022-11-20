import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'


function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    console.log('WE GOT HERE')
    return (
        <>
            <button
                className='button-to-log-in'
                onClick={() => setShowModal(true)}>Log in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )
            }
        </>
    );
}

export default LoginFormModal;
