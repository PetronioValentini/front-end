import { useState } from "react";
import "./AdicionarPersonagens.css";

const AdicionarPersonagens = () => {
  const [nome, setNome] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState(0); // 0 = Masculino, 1 = Feminino
  const [planet, setPlanet] = useState("");
  const [race, setRace] = useState("");
  const [foto, setFoto] = useState("");
  const [mensagemErro, setMensagemErro] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoPersonagem = {
      nome,
      birthYear,
      gender,
      planet,
      race,
      foto,
    };

    fetch("http://localhost:8080/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoPersonagem),
    })
      .then((response) => {
        if (response.ok) {
          setMensagemErro(null);
          setMensagemSucesso("Personagem adicionado com sucesso!");
          setTimeout(() => setMensagemSucesso(null), 3000);
          setNome("");
          setBirthYear("");
          setGender(0);
          setPlanet("");
          setRace("");
          setFoto("");
        } else {
          throw new Error("Erro ao adicionar personagem");
        }
      })
      .catch((error) => {
        setMensagemSucesso(null);
        setMensagemErro("Erro ao adicionar o personagem.");
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Adicionar Personagem</h1>

      {mensagemErro && <div className="erro">{mensagemErro}</div>}
      {mensagemSucesso && <div className="sucesso">{mensagemSucesso}</div>}

      <form className="form-personagem" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthYear">Ano de Nascimento</label>
          <input
            type="number"
            id="birthYear"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gênero</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
            required
          >
            <option value={0}>Masculino</option>
            <option value={1}>Feminino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="planet">Planeta</label>
          <input
            type="text"
            id="planet"
            value={planet}
            onChange={(e) => setPlanet(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="race">Raça</label>
          <input
            type="text"
            id="race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto">URL da Foto</label>
          <input
            type="text"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-adicionar">
          Adicionar Personagem
        </button>
      </form>
    </div>
  );
};

export default AdicionarPersonagens;
