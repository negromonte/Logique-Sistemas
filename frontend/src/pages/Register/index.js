import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logoImg.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    
    const navigate = useNavigate();
    
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            senha
        };

        try {
            const response = await api.post('users', data);
            
            localStorage.setItem('userId', response.data.id);

            alert(`Cadastro finalizado Sr(a).${name}`);

            navigate('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente mais tarde.');
        }
    }
    

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Encurtador de URL" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a criar URLs mais curtas.</p>

                    <Link className="back-Link" to="/">
                    <FiArrowLeft size={16} color="white"/>
                    Já sou cadastrado
                </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do Usuario" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}