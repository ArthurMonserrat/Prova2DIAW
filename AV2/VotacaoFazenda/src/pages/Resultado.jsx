import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService.js';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  // Total e placar são derivados do estado atual, sem estados duplicados.
  const totalVotos = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerarVotacao() {
    const confirmou = window.confirm(
      'Tem certeza de que deseja zerar todos os votos? Essa ação não pode ser desfeita.',
    );

    if (confirmou) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina pagina-resultado">
      <section className="pagina-cabecalho">
        <h1>Parcial da eliminação</h1>
        <p className="total-votos">
          <strong>{totalVotos.toLocaleString('pt-BR')}</strong>{' '}
          {totalVotos === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </section>

      {totalVotos === 0 ? (
        <section className="resultado-vazio">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link className="botao botao-principal" to="/votacao">
            Ir para votação
          </Link>
        </section>
      ) : (
        <section className="placar" aria-label="Resultado parcial da votação">
          {resultado.map((participante, indice) => (
            <article
              key={participante.id}
              className={`placar-item${indice === 0 ? ' placar-lider' : ''}`}
            >
              <img
                className="placar-foto"
                src={participante.foto}
                alt={participante.nome}
                loading="lazy"
              />

              <div className="placar-conteudo">
                <div className="placar-titulo">
                  <h2>{participante.nome}</h2>
                  {indice === 0 && (
                    <span className="selo-lider">Sairia hoje</span>
                  )}
                </div>

                <div
                  className="barra"
                  role="progressbar"
                  aria-label={`Percentual de votos de ${participante.nome}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Number(participante.percentual.toFixed(1))}
                >
                  <div
                    className="barra-preenchida"
                    style={{ width: `${participante.percentual}%` }}
                  />
                </div>

                <p className="placar-estatistica">
                  <strong>
                    {participante.percentual.toLocaleString('pt-BR', {
                      maximumFractionDigits: 1,
                    })}%
                  </strong>{' '}
                  ({participante.votos.toLocaleString('pt-BR')}{' '}
                  {participante.votos === 1 ? 'voto' : 'votos'})
                </p>
              </div>
            </article>
          ))}
        </section>
      )}

      {totalVotos > 0 && (
        <div className="resultado-acoes">
          <button
            className="botao botao-secundario botao-zerar"
            type="button"
            onClick={handleZerarVotacao}
          >
            Zerar votação
          </button>
        </div>
      )}
    </main>
  );
}

export default Resultado;
