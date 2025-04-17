import { useState, useEffect, use } from "react";
import styles from "./EncontrarPerfil.module.css";
import axios from "axios";

function EncontrarPerfil(){
    const [busca, setBusca] = useState('');
    const [resultados, setResultados] = useState([]);
    const [semResultados, setSemResultados] = useState(false)

  const buscarUsuarios = () => {
    if (!busca.trim()) {
      setResultados([]);
      setSemResultados(false);
      return;
    }

    axios.get(`https://api.github.com/search/users?q=${busca}`)
      .then(async ({ data }) => {
        if (data.items.length === 0) {
          setResultados([]);
          setSemResultados(true);
          return;
        }

        const primeirosUsuarios = data.items.slice(0, 3);
        const resultadosComBio = [];

        for (const user of primeirosUsuarios) {
          try {
            const resposta = await axios.get(`https://api.github.com/users/${user.login}`);
            resultadosComBio.push({
              ...user,
              bio: resposta.data.bio
            });
          } catch (error) {
            resultadosComBio.push({
              ...user,
              bio: null
            });
          }
        }

        setResultados(resultadosComBio);
        setSemResultados(false);
      })
      .catch(() => {
        setResultados([]);
        setSemResultados(true);
      });
  };


    return(
        <>
            <section className={styles.modal}>
                <figure>
                    <img src="https://img.icons8.com/ios11/512/FFFFFF/github.png" width="80px"/>
                    <h2>Perfil <a>GitHub</a></h2>
                </figure>
                <div className={styles.barraBusca}>
                <input className={styles.campo} type="text" placeholder="Buscar usuário do github..."
                value={busca} 
                onChange={(e) => setBusca(e.target.value)}
                />
                 <button onClick={buscarUsuarios} className={styles.botaoBuscar}><img src="https://img.icons8.com/ios7/512/FFFFFF/search.png" width="20px"/></button>
                 </div>
            <div className={styles.listaUsuarios}>
            {resultados.map(user => (
             
                    <a key={user.id}
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.card}
                    >
                        <img src={user.avatar_url} alt={user.login} className={styles.avatar}/>
                        <h3>{user.login}</h3>
                        <p>{user.bio || "Sem bio disponível"}</p>
                    </a>
                ))}

                {semResultados && <p>Nenhum usuário encontrado</p>}
                </div>
            </section>
        </>
    );

}

export default EncontrarPerfil