import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard.jsx';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService.js';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((quantidadeAtual) => quantidadeAtual + 1);
  }

  return (
    <main className="pagina pagina-votacao">
      <section className="pagina-cabecalho">
        <h1>Quem você quer eliminar?</h1>
        <p>Cada clique conta um voto para tirar o peão da fazenda.</p>
      </section>

      {ultimoVoto !== null && (
        <section className="mensagem-voto" role="status" aria-live="polite">
          <div>
            <strong>Voto registrado!</strong>
            <p>
              Seu voto foi para <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
              <strong>
                {quantidadeVotos} {quantidadeVotos === 1 ? 'vez' : 'vezes'}
              </strong>{' '}
              nesta visita.
            </p>
          </div>
          <Link className="link-destaque" to="/resultado">
            Ver resultado parcial
          </Link>
        </section>
      )}

      <section aria-label="Participantes na roça">
        <div className="grade-roca">
          {naRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      <section className="secao-demais">
        <h2>Demais peões</h2>
        <p className="texto-secundario">
          Fora da roça nesta semana, não podem receber votos.
        </p>
        <div className="grade-demais">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
