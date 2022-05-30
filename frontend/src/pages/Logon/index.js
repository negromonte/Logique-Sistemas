import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoImg.png';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {email, senha});
            console.log(response.data);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userEmail', response.data.email);

            navigate('profile');
        }catch (err) {
            alert('Falha no login, tente novamente mais tarde.');
        }
    }

    return (
       <div className="logon-container">
           <div className="content">
           <section className="form">

            <form onSubmit={handleLogin}>
            <img className="image" src={logoImg} alt="Logo" />
                <h1>Faça seu Logon</h1>

                <input 
                    placeholder="Seu Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-Link" to="/register">
                    <FiLogIn size={16} color="white"/>
                    Não tenho cadastro
                </Link>
            </form>
           </section>
           </div>
       </div>
    );
}