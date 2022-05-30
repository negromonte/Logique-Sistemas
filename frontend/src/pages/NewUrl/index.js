import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logoImg.png';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function NewUrl() {
    const [urlOriginal, setUrlOriginal] = useState([]);
    const [userId, setUserId] = useState("");

    
    useEffect(() => {
        const strageUserId = localStorage.getItem('userId');
        console.log('úserId do new URL', strageUserId)
        setUserId(strageUserId)
      //  api.post('urls', {
//headers: {
        //        Authorization: userId,
        //    }
       // })
    }, [userId]);

    const navigate = useNavigate();

    async function handleUrl(e) {
        e.preventDefault();

        const data = {
            urlOriginal
        };

        try {
           await api.post('urls', data, {
               headers: {
                   Authorization: userId,
               }
           })
            alert('Url Encurtada com sucesso.');

            navigate('/profile');
        } catch (err) {
            alert('Erro ao encurtar, tente novamente mais tarde.');
        }
    }

    return (
        <div className="new-Url">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Encurtador de URL" />
                    <h1>Encurtar URL</h1>
                    <p>Informe uma URL válida para que possamos continuar com  o encurtamento.</p>

                    <Link className="back-Link" to="/profile">
                    <FiArrowLeft size={16} color="white"/>
                    Voltar para Home
                </Link>
                </section>

                <form onSubmit={handleUrl}>
                    <input
                        placeholder="URL Válida"
                        value={urlOriginal}
                        onChange={e => setUrlOriginal(e.target.value)}
                    />
                    <button className="button" type="submit">Encurtar</button>
                </form>
            </div>
        </div>
    );
}