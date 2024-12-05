import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "./EditarPersonagem.css";

const EditarPersonagem = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:8080/api/characters/${id}`)
      .then((response) => response.json())
      .then((data) => setPersonagem(data))
      .catch((error) => console.error("Erro ao carregar personagem:", error));
  }, [id]);

  const atualizarPersonagem = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/characters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personagem),
    })
      .then((response) => {
        if (response.ok) {
          alert("Personagem atualizado com sucesso!");
          navigate("/listar"); 
        } else {
          alert("Erro ao atualizar personagem.");
        }
      })
      .catch((error) => console.error("Erro ao atualizar personagem:", error));
  };

  if (!personagem) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Editar Personagem</h1>
      <form onSubmit={atualizarPersonagem}>
        <label>
          Nome:
          <input
            type="text"
            value={personagem.nome}
            onChange={(e) =>
              setPersonagem({ ...personagem, nome: e.target.value })
            }
          />
        </label>
        <label>
          Idade:
          <input
            type="number"
            value={personagem.birthYear}
            onChange={(e) =>
              setPersonagem({ ...personagem, birthYear: e.target.value })
            }
          />
        </label>
        <label>
          Gênero:
          <select
            value={personagem.gender}
            onChange={(e) =>
              setPersonagem({ ...personagem, gender: e.target.value })
            }
          >
            <option value="0">Masculino</option>
            <option value="1">Feminino</option>
          </select>
        </label>
        <label>
          Planeta:
          <input
            type="text"
            value={personagem.planet}
            onChange={(e) =>
              setPersonagem({ ...personagem, planet: e.target.value })
            }
          />
        </label>
        <label>
          Raça:
          <input
            type="text"
            value={personagem.race}
            onChange={(e) =>
              setPersonagem({ ...personagem, race: e.target.value })
            }
          />
        </label>
        <button type="submit">Atualizar Personagem</button>
      </form>
    </div>
  );
};

export default EditarPersonagem;
