import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logoImg.png';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [urls, setUrls] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    
    
    useEffect(() => {


        const userName = localStorage.getItem('userName');
        setUserName(userName);
        const userId = localStorage.getItem('userId');
        setUserId(userId)
        console.log(`${userName} tem o id de ${userId}`)
        
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setUrls(response.data);
        })
    }, [userId]);

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Encurtador de URL" />
                <span>Bem vindo(a), {userName}</span>

                <Link className="button" to="/new">Encurtar Nova URL</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="darkslateblue" />
                </button>
            </header>

            <h1>Links Encurtados</h1>

            <ul>
            {urls.map(url => (
                <li key={url.id}>
                    <strong>URL Encurtada: http://localhost:3333/url/{url.urlEncurtada}</strong>
                    <p><strong>URL Original: {url.urlOriginal}</strong></p>

                    <p>Data/Hora:{url.dataHora}</p>
                </li>
                ))}
            </ul>
        </div>
    );
}
