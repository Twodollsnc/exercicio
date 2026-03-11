/* ================================================
   JOGO DA FORCA — Lógica JavaScript
   ================================================ */

'use strict';

// ============================================================
// 1. BANCO DE PALAVRAS (com categorias)
// ============================================================
const BANCO = [
  { palavra: 'javascript',   categoria: 'Programação'  },
  { palavra: 'programador',  categoria: 'Profissão'    },
  { palavra: 'navegador',    categoria: 'Tecnologia'   },
  { palavra: 'algoritmo',    categoria: 'Computação'   },
  { palavra: 'variavel',     categoria: 'Programação'  },
  { palavra: 'teclado',      categoria: 'Hardware'     },
  { palavra: 'resolucao',    categoria: 'Tecnologia'   },
  { palavra: 'depuracao',    categoria: 'Programação'  },
  { palavra: 'servidor',     categoria: 'Redes'        },
  { palavra: 'protocolo',    categoria: 'Redes'        },
  { palavra: 'compilador',   categoria: 'Computação'   },
  { palavra: 'interface',    categoria: 'Design'       },
  { palavra: 'biblioteca',   categoria: 'Programação'  },
  { palavra: 'repositorio',  categoria: 'Ferramentas'  },
  { palavra: 'forca',        categoria: 'Jogo'         },
];

// ============================================================
// 2. ESTADO DO JOGO
// ============================================================
let palavraAtual      = '';
let categoriaAtual    = '';
let letrasCorretas    = [];
let letrasErradas     = [];
let tentativasRestantes = 6;
let jogoAtivo         = false;
let palavraCustom     = false;

// Partes do boneco na ordem de exibição
const PARTES_FORCA = [
  'cabeca', 'corpo', 'braco-esq', 'braco-dir', 'perna-esq', 'perna-dir'
];

// ============================================================
// 3. REFERÊNCIAS AO DOM
// ============================================================
const elPalavra        = document.getElementById('palavra-display');
const elErradas        = document.getElementById('letras-erradas');
const elMensagem       = document.getElementById('mensagem');
const elErroContador   = document.getElementById('erro-contador-num');
const elCategoria      = document.getElementById('categoria-texto');
const elLetraInput     = document.getElementById('letra-input');
const elBtnEnviar      = document.getElementById('btn-enviar');
const elTeclado        = document.getElementById('teclado');
const modalOverlay     = document.getElementById('modal-overlay');
const elCustomInput    = document.getElementById('custom-input');
const elModalErro      = document.getElementById('modal-erro');

// ============================================================
// 4. TECLADO VIRTUAL — geração dinâmica
// ============================================================
const ALFABETO = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ESPECIAIS = ['á','é','í','ó','ú','â','ê','î','ô','û','ã','õ','ç'];

function gerarTeclado() {
  elTeclado.innerHTML = '';
  [...ALFABETO, ...ESPECIAIS].forEach(letra => {
    const btn = document.createElement('button');
    btn.textContent = letra.toUpperCase();
    btn.className   = 'tecla';
    btn.dataset.letra = letra;
    btn.addEventListener('click', () => processarLetra(letra));
    elTeclado.appendChild(btn);
  });
}

// ============================================================
// 5. ESCOLHER PALAVRA
// ============================================================
function escolherPalavra(customPalavra = null, customCategoria = null) {
  if (customPalavra) {
    palavraAtual   = customPalavra.toLowerCase().trim();
    categoriaAtual = customCategoria || 'Personalizada';
    palavraCustom  = true;
  } else {
    const item     = BANCO[Math.floor(Math.random() * BANCO.length)];
    palavraAtual   = item.palavra;
    categoriaAtual = item.categoria;
    palavraCustom  = false;
  }

  letrasCorretas      = [];
  letrasErradas       = [];
  tentativasRestantes = 6;
  jogoAtivo           = true;

  resetarPartesForca();
  resetarTeclado();
  atualizarTela();
  elLetraInput.disabled = false;
  elLetraInput.focus();
}

// ============================================================
// 6. PROCESSAR LETRA
// ============================================================
function processarLetra(letra) {
  if (!jogoAtivo) return;
  letra = letra.toLowerCase();

  // Validação
  if (!letra || !/^[a-záéíóúâêîôûãõç]$/i.test(letra)) return;

  // Já usada (sem penalidade)
  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    piscarInput();
    return;
  }

  if (palavraAtual.includes(letra)) {
    letrasCorretas.push(letra);
    marcarTecla(letra, 'correta');
    tocarSom('acerto');
  } else {
    letrasErradas.push(letra);
    tentativasRestantes--;
    marcarTecla(letra, 'errada');
    mostrarParteForca(6 - tentativasRestantes);
    tocarSom('erro');
  }

  atualizarTela();
  verificarFimDeJogo();
}

// ============================================================
// 7. ATUALIZAR TELA
// ============================================================
function atualizarTela() {
  // Palavra com traços
  const displayLetras = palavraAtual
    .split('')
    .map(l => letrasCorretas.includes(l)
      ? `<span class="letra-reveal">${l.toUpperCase()}</span>`
      : '_')
    .join(' ');

  elPalavra.innerHTML = displayLetras;
  elPalavra.className = '';

  // Erradas
  elErradas.innerHTML = letrasErradas
    .map(l => `<span class="letra-badge">${l.toUpperCase()}</span>`)
    .join('');

  // Contador
  elErroContador.textContent = `${letrasErradas.length}/6`;
  elErroContador.className = tentativasRestantes <= 2 ? 'perigo' : '';

  // Categoria
  elCategoria.textContent = categoriaAtual;

  // Mensagem
  elMensagem.textContent = '';
  elMensagem.className   = '';
}

// ============================================================
// 8. VERIFICAR FIM DE JOGO
// ============================================================
function verificarFimDeJogo() {
  const venceu = palavraAtual
    .split('')
    .every(l => letrasCorretas.includes(l));

  if (venceu) {
    jogoAtivo = false;
    elMensagem.textContent = '🎉 Você acertou! Parabéns!';
    elMensagem.className   = 'vitoria';
    elPalavra.classList.add('acertou');
    desativarJogo();
    tocarSom('vitoria');
    return;
  }

  if (tentativasRestantes === 0) {
    jogoAtivo = false;
    elMensagem.textContent = `💀 Fim de jogo! A palavra era: ${palavraAtual.toUpperCase()}`;
    elMensagem.className   = 'derrota';
    elPalavra.innerHTML    = palavraAtual.toUpperCase().split('').join(' ');
    elPalavra.classList.add('errou');
    desativarJogo();
    tocarSom('derrota');
  }
}

// ============================================================
// 9. FORCA SVG — partes do boneco
// ============================================================
function mostrarParteForca(numErros) {
  if (numErros < 1 || numErros > 6) return;
  const parteId = PARTES_FORCA[numErros - 1];
  const el = document.getElementById(parteId);
  if (el) el.classList.add('visivel');
}

function resetarPartesForca() {
  PARTES_FORCA.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visivel');
  });
}

// ============================================================
// 10. TECLADO VIRTUAL — estados
// ============================================================
function marcarTecla(letra, estado) {
  const btn = elTeclado.querySelector(`[data-letra="${letra}"]`);
  if (btn) {
    btn.classList.add(estado);
    btn.disabled = true;
  }
}

function resetarTeclado() {
  elTeclado.querySelectorAll('.tecla').forEach(btn => {
    btn.className = 'tecla';
    btn.disabled  = false;
  });
}

// ============================================================
// 11. DESATIVAR / REATIVAR
// ============================================================
function desativarJogo() {
  elLetraInput.disabled = true;
  elBtnEnviar.disabled  = true;
  elTeclado.querySelectorAll('.tecla').forEach(b => b.disabled = true);
}

function piscarInput() {
  elLetraInput.style.borderColor = 'var(--accent-dim)';
  setTimeout(() => elLetraInput.style.borderColor = '', 300);
}

// ============================================================
// 12. SOM (Web Audio API — sem arquivos externos)
// ============================================================
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function tocarSom(tipo) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (tipo) {
      case 'acerto':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(680, ctx.currentTime + .12);
        gain.gain.setValueAtTime(.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .2);
        osc.start();
        osc.stop(ctx.currentTime + .2);
        break;
      case 'erro':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + .18);
        gain.gain.setValueAtTime(.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .25);
        osc.start();
        osc.stop(ctx.currentTime + .25);
        break;
      case 'vitoria':
        [440, 550, 660, 880].forEach((freq, i) => {
          const o2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          o2.connect(g2); g2.connect(ctx.destination);
          o2.type = 'sine';
          o2.frequency.value = freq;
          g2.gain.setValueAtTime(.12, ctx.currentTime + i * .1);
          g2.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + i * .1 + .25);
          o2.start(ctx.currentTime + i * .1);
          o2.stop(ctx.currentTime + i * .1 + .25);
        });
        break;
      case 'derrota':
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + .6);
        gain.gain.setValueAtTime(.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .7);
        osc.start();
        osc.stop(ctx.currentTime + .7);
        break;
    }
  } catch (_) {
    // Silencia erros de autoplay
  }
}

// ============================================================
// 13. MODAL PALAVRA PERSONALIZADA
// ============================================================
function abrirModal() {
  elCustomInput.value = '';
  elModalErro.textContent = '';
  modalOverlay.classList.add('aberto');
  setTimeout(() => elCustomInput.focus(), 50);
}

function fecharModal() {
  modalOverlay.classList.remove('aberto');
}

function confirmarPalavraCustom() {
  const val = elCustomInput.value.trim();
  if (!val) {
    elModalErro.textContent = '⚠ Digite uma palavra.';
    return;
  }
  if (val.length < 2) {
    elModalErro.textContent = '⚠ A palavra deve ter ao menos 2 letras.';
    return;
  }
  if (!/^[a-záéíóúâêîôûãõç\s]+$/i.test(val)) {
    elModalErro.textContent = '⚠ Use apenas letras e acentos.';
    return;
  }
  fecharModal();
  escolherPalavra(val.replace(/\s/g, ''), 'Personalizada');
}

// ============================================================
// 14. EVENTOS
// ============================================================

// Botão enviar
elBtnEnviar.addEventListener('click', () => {
  const letra = elLetraInput.value.trim();
  processarLetra(letra);
  elLetraInput.value = '';
  elLetraInput.focus();
});

// Enter no input
elLetraInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') elBtnEnviar.click();
});

// Limitar input a 1 char
elLetraInput.addEventListener('input', () => {
  if (elLetraInput.value.length > 1) {
    elLetraInput.value = elLetraInput.value.slice(-1);
  }
});

// Teclado físico (qualquer tecla)
document.addEventListener('keydown', e => {
  if (!jogoAtivo) return;
  if (document.activeElement === elLetraInput) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (modalOverlay.classList.contains('aberto')) return;

  const letra = e.key.toLowerCase();
  if (/^[a-záéíóúâêîôûãõç]$/.test(letra)) {
    processarLetra(letra);
  }
});

// Novo jogo
document.getElementById('btn-novo-jogo').addEventListener('click', () => {
  escolherPalavra();
});

// Palavra personalizada
document.getElementById('btn-palavra-custom').addEventListener('click', abrirModal);
document.getElementById('btn-cancelar-modal').addEventListener('click', fecharModal);
document.getElementById('btn-confirmar-modal').addEventListener('click', confirmarPalavraCustom);

elCustomInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmarPalavraCustom();
  if (e.key === 'Escape') fecharModal();
});

// Fechar modal clicando fora
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) fecharModal();
});

// ============================================================
// 15. INICIAR
// ============================================================
gerarTeclado();
escolherPalavra();