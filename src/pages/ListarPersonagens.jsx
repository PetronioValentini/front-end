import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // useNavigate é a forma correta no React Router v6
import "./ListarPersonagens.css";

const ListarPersonagens = () => {
  const [personagens, setPersonagens] = useState([]);
  const [mensagemErro, setMensagemErro] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);
  const navigate = useNavigate(); // useNavigate hook para navegação

  useEffect(() => {
    fetch("http://localhost:8080/api/characters")
      .then((response) => response.json())
      .then((data) => setPersonagens(data))
      .catch((error) => console.error("Erro ao buscar personagens:", error));
  }, []);

  const traduzirGenero = (gender) => {
    return gender === 1 ? "Feminino" : "Masculino";
  };

  const deletarPersonagem = (id) => {
    fetch(`http://localhost:8080/api/characters/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPersonagens(
            personagens.filter((personagem) => personagem.id !== id)
          );
          setMensagemErro(null);
          setMensagemSucesso("Personagem deletado com sucesso!");
          setTimeout(() => {
            setMensagemSucesso(null);
          }, 3000);
        } else {
          throw new Error("Falha ao deletar personagem");
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar personagem:", error);
        setMensagemSucesso(null);
        setMensagemErro("Erro ao tentar deletar o personagem.");
      });
  };

  const editarPersonagem = (id) => {
    // Usando o navigate para redirecionar para a página de edição
    navigate(`/editar/${id}`);
  };

  return (
    <div>
      <h1>Lista de Personagens</h1>

      {mensagemErro && <div className="erro">{mensagemErro}</div>}
      {mensagemSucesso && <div className="sucesso">{mensagemSucesso}</div>}

      <ul className="lista-personagens">
        {personagens.map((personagem) => (
          <li key={personagem.id} className="personagem-item">
            <div className="avatar">
              <img
                src={
                  personagem.foto ||
                  "https://pics.craiyon.com/2024-09-09/dK09IL9lRnuVjo53ep6yaA.webp"
                }
                alt={personagem.nome}
                className="personagem-foto"
              />
            </div>
            <p>Nome: {personagem.nome}</p>
            <p>Idade: {personagem.birthYear}</p>
            <p>Gênero: {traduzirGenero(personagem.gender)}</p>
            <p>Planeta: {personagem.planet}</p>
            <p>Raça: {personagem.race}</p>

            <div className="botoes-actions">
              <button
                className="btn-editar"
                onClick={() => editarPersonagem(personagem.id)}
              >
                <FaEdit />
                Editar
              </button>
              <button
                className="btn-deletar"
                onClick={() => deletarPersonagem(personagem.id)}
              >
                <FaTrash />
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarPersonagens;
