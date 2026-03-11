/* ================================================
   SIMULADOR DE DADOS RPG — Lógica JavaScript
   ================================================ */

'use strict';

// ============================================================
// 1. CONFIGURAÇÃO DOS DADOS
// ============================================================
const DADOS = [
  { id: 'd6',  faces: 6,  label: 'D6'  },
  { id: 'd8',  faces: 8,  label: 'D8'  },
  { id: 'd20', faces: 20, label: 'D20' },
];

// Histórico de cada dado (últimas 5 jogadas)
const historico = { d6: [], d8: [], d20: [] };
const MAX_HIST = 5;

// Resultado atual de cada dado
const resultados = { d6: null, d8: null, d20: null };

// ============================================================
// 2. GERAR NÚMERO ALEATÓRIO
// ============================================================

/**
 * Retorna um inteiro aleatório entre 1 e `faces` (inclusive).
 * @param {number} faces - Número de faces do dado.
 * @returns {number}
 */
function rolarDado(faces) {
  return Math.floor(Math.random() * faces) + 1;
}

// ============================================================
// 3. ATUALIZAR INTERFACE DE UM DADO
// ============================================================

/**
 * Atualiza o resultado visual de um dado específico.
 * @param {string} id    - 'd6', 'd8' ou 'd20'
 * @param {number} valor - Resultado obtido
 */
function atualizarDado(id, valor) {
  // Atualiza o número SVG
  const elNum = document.getElementById(`num-${id}`);
  if (elNum) {
    elNum.textContent = valor;
    // Dispara a animação de flash
    elNum.classList.remove('novo');
    void elNum.offsetWidth; // reflow para reiniciar a animação
    elNum.classList.add('novo');
  }

  // Anima o SVG girando
  const wrap = document.getElementById(`wrap-${id}`);
  if (wrap) {
    wrap.classList.remove('rolando');
    void wrap.offsetWidth;
    wrap.classList.add('rolando');
    wrap.addEventListener('animationend', () => wrap.classList.remove('rolando'), { once: true });
  }

  // Adiciona ao histórico (máximo MAX_HIST itens)
  historico[id].unshift(valor);
  if (historico[id].length > MAX_HIST) historico[id].pop();

  // Atualiza a lista de histórico na tela
  const elHist = document.getElementById(`hist-${id}`);
  if (elHist) {
    elHist.innerHTML = historico[id]
      .map((v, i) => `<span class="hist-item" title="Rolagem ${i + 1}">${v}</span>`)
      .join('');
  }
}

// ============================================================
// 4. ATUALIZAR PAINEL DE TOTAL
// ============================================================
function atualizarTotal() {
  const vals = Object.values(resultados).filter(v => v !== null);
  const total = vals.reduce((acc, v) => acc + v, 0);

  const elTotal = document.getElementById('total-valor');
  const elBreak = document.getElementById('total-breakdown');

  if (elTotal) {
    elTotal.textContent = total;
    elTotal.classList.remove('animando');
    void elTotal.offsetWidth;
    elTotal.classList.add('animando');
  }

  if (elBreak) {
    const r = resultados;
    elBreak.textContent =
      `D6: ${r.d6 ?? '—'}  +  D8: ${r.d8 ?? '—'}  +  D20: ${r.d20 ?? '—'}`;
  }
}

// ============================================================
// 5. GIRAR TODOS OS DADOS
// ============================================================

/**
 * Rola os três dados com um pequeno atraso entre cada um
 * para criar efeito sequencial de animação.
 */
function girarTodos() {
  const btn = document.getElementById('btn-girar');
  btn.disabled = true;

  const delays = [0, 120, 240]; // ms de atraso para cada dado

  DADOS.forEach((dado, i) => {
    setTimeout(() => {
      const valor = rolarDado(dado.faces);
      resultados[dado.id] = valor;
      atualizarDado(dado.id, valor);

      // Atualiza o total após o último dado ser rolado
      if (i === DADOS.length - 1) {
        setTimeout(() => {
          atualizarTotal();
          btn.disabled = false;
        }, 300);
      }
    }, delays[i]);
  });
}

// ============================================================
// 6. EVENTO DO BOTÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-girar');
  btn.addEventListener('click', girarTodos);

  // Atalho de teclado: espaço ou Enter também gira os dados
  document.addEventListener('keydown', e => {
    if ((e.code === 'Space' || e.code === 'Enter') && !btn.disabled) {
      e.preventDefault();
      girarTodos();
    }
  });
});