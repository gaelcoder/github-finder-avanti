import { useState, useEffect, use } from "react";
import styles from "./EncontrarPerfil.module.css";
import axios from "axios";

function EncontrarPerfil(){
    const [busca, setBusca] = useState('');
    const [resultados, setResultados] = useState([]);
    const [semResultados, setSemResultados] = useState(false)
 
    useEffect(() => {
        const timer = setTimeout(() => {
            if(!busca.trim()){
                setResultados([]);
                setSemResultados(false);
                return;
            }


            axios.get(`https://api.github.com/search/users?q=${busca}`)
            .then (({ data }) => {
                setResultados(data.items)
                setSemResultados(data.items.length == 0)
            })
            .catch(() => {
                setResultados([]);
                setSemResultados(true);
            })

        }, 400)

        return() => clearTimeout(timer);

    }, [busca])

    return(
        <>
            <section className={styles.modal}>
                <input className={styles.campo} type="text" placeholder="Buscar usuário do github..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}/>

            <div className={styles.listaUsuarios}>
            {resultados.map(user => (
             
                    <a key={user.id}
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.card}
                    >
                        <img src={user.avatar_url} alt={user.login} className={styles.avatar}/>
                        <span>{user.login}</span>
                    </a>
                ))}

                {semResultados && <p>Nenhum usuário encontrado</p>}
                </div>
            </section>
        </>
    );

}

export default EncontrarPerfil