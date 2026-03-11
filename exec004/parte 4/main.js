/* ================================================
   HERANÇA: Animal → Cachorro
   + Dados JSON das raças
   + Lógica da página
   ================================================ */

'use strict';

// ============================================================
// 1. SUPERCLASSE: Animal
// ============================================================
class Animal {
  /**
   * @param {number} patas  - Número de patas do animal
   * @param {number} olhos  - Número de olhos do animal
   */
  constructor(patas, olhos) {
    this.patas = patas;
    this.olhos = olhos;
  }

  /** Descrição genérica do animal */
  descrever() {
    return `Animal com ${this.patas} patas e ${this.olhos} olhos.`;
  }
}

// ============================================================
// 2. CLASSE FILHA: Cachorro (herda de Animal)
// ============================================================
class Cachorro extends Animal {
  /**
   * @param {string} raca  - Raça do cachorro
   * @param {string} cor   - Cor da pelagem
   */
  constructor(raca, cor) {
    // Cachorros têm 4 patas e 2 olhos (fixo na superclasse)
    super(4, 2);
    this.raca = raca;
    this.cor  = cor;
  }

  /** Descrição completa do cachorro */
  descrever() {
    return (
      `Cachorro da raça ${this.raca}, pelagem ${this.cor}. ` +
      super.descrever()
    );
  }

  /** Retorna objeto simples para exibição */
  toJSON() {
    return {
      raca:  this.raca,
      cor:   this.cor,
      patas: this.patas,
      olhos: this.olhos,
    };
  }
}

// ============================================================
// 3. OBJETO JSON COM 4 RAÇAS E SEUS ATRIBUTOS
// ============================================================
const racasDB = [
  {
    id: 'golden',
    nome: 'Golden Retriever',
    patas: 4,
    olhos: 2,
    cores: ['Dourado', 'Creme', 'Caramelo'],
    porte: 'Grande',
    peso: '25–34 kg',
    expectativa: '10–12 anos',
    temperamento: 'Amigável, Confiável, Confiante',
    descricao:
      'O Golden Retriever é uma das raças mais populares do mundo. ' +
      'Inteligente, dócil e extremamente afetivo, é excelente para famílias com crianças. ' +
      'Adora brincar e é facilmente treinável, sendo muito usado como cão-guia e de resgate.',
    foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    fotos: {
      'Dourado':   'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
      'Creme':     'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
      'Caramelo':  'https://images.unsplash.com/photo-1612450656709-2d91b0b97b22?w=600&q=80',
    },
  },
  {
    id: 'husky',
    nome: 'Husky Siberiano',
    patas: 4,
    olhos: 2,
    cores: ['Preto e Branco', 'Cinza e Branco', 'Vermelho e Branco'],
    porte: 'Médio',
    peso: '16–27 kg',
    expectativa: '12–15 anos',
    temperamento: 'Extrovertido, Amistoso, Vigilante',
    descricao:
      'O Husky Siberiano é conhecido pelos olhos azuis marcantes e pelagem densa. ' +
      'Originalmente criado para puxar trenós no gelo, é energético e precisa de muito exercício. ' +
      'Altamente inteligente e vocal, comunica-se com uivos característicos.',
    foto: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80',
    fotos: {
      'Preto e Branco':   'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80',
      'Cinza e Branco':   'https://images.unsplash.com/photo-1617895153857-82fe0c43621b?w=600&q=80',
      'Vermelho e Branco':'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    },
  },
  {
    id: 'bulldog',
    nome: 'Bulldog Francês',
    patas: 4,
    olhos: 2,
    cores: ['Fulvo', 'Malhado', 'Branco'],
    porte: 'Pequeno',
    peso: '8–14 kg',
    expectativa: '10–12 anos',
    temperamento: 'Brincalhão, Vivaz, Alerta',
    descricao:
      'O Bulldog Francês é compacto, musculoso e de personalidade marcante. ' +
      'Adaptado a apartamentos, adora atenção e é extremamente sociável. ' +
      'Com suas orelhas de morcego e focinho achatado, conquista todos com seu charme único.',
    foto: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80',
    fotos: {
      'Fulvo':   'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80',
      'Malhado': 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&q=80',
      'Branco':  'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=600&q=80',
    },
  },
  {
    id: 'dalmata',
    nome: 'Dálmata',
    patas: 4,
    olhos: 2,
    cores: ['Branco e Preto', 'Branco e Marrom'],
    porte: 'Grande',
    peso: '23–32 kg',
    expectativa: '10–13 anos',
    temperamento: 'Ativo, Inteligente, Sensível',
    descricao:
      'O Dálmata é inconfundível com suas pintas características. ' +
      'Tem origem como cão de carruagem e possui resistência física impressionante. ' +
      'Enérgico e leal, precisa de exercícios diários e responde muito bem ao treinamento positivo.',
    foto: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=80',
    fotos: {
      'Branco e Preto':  'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=80',
      'Branco e Marrom': 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&q=80',
    },
  },
  {
    id: 'pastor',
    nome: 'Pastor Alemão',
    patas: 4,
    olhos: 2,
    cores: ['Preto e Marrom', 'Preto e Creme', 'Sable'],
    porte: 'Grande',
    peso: '22–40 kg',
    expectativa: '9–13 anos',
    temperamento: 'Corajoso, Curioso, Obediente',
    descricao:
      'O Pastor Alemão é uma das raças mais versáteis e inteligentes do mundo. ' +
      'Utilizado em operações policiais, militares e de resgate. ' +
      'Leal e protetor, forma vínculos fortíssimos com a família e se destaca em qualquer atividade que exija raciocínio.',
    foto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
    fotos: {
      'Preto e Marrom': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
      'Preto e Creme':  'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&q=80',
      'Sable':          'https://images.unsplash.com/photo-1553882809-a4f57e59501d?w=600&q=80',
    },
  },
];

// ============================================================
// 4. LÓGICA DA PÁGINA
// ============================================================

// Objeto Cachorro atual gerado
let cachorroAtual = null;

// Referências DOM
const selRaca     = document.getElementById('sel-raca');
const selCor      = document.getElementById('sel-cor');
const btnGerar    = document.getElementById('btn-gerar');
const cardResult  = document.getElementById('card-resultado');
const elFoto      = document.getElementById('dog-foto');
const elNome      = document.getElementById('dog-nome');
const elDescricao = document.getElementById('dog-descricao');
const elAtribs    = document.getElementById('dog-atributos');
const elJSON      = document.getElementById('dog-json');
const elConsole   = document.getElementById('console-log');

// ── Popular select de raças (a partir do JSON) ──────────────
function popularRacas() {
  racasDB.forEach(raca => {
    const opt = document.createElement('option');
    opt.value       = raca.id;
    opt.textContent = raca.nome;
    selRaca.appendChild(opt);
  });
}

// ── Atualizar select de cores conforme a raça ───────────────
function atualizarCores() {
  const racaId = selRaca.value;
  selCor.innerHTML = '<option value="">— Selecione uma cor —</option>';
  selCor.disabled  = true;

  if (!racaId) return;

  const raca = racasDB.find(r => r.id === racaId);
  if (!raca) return;

  raca.cores.forEach(cor => {
    const opt = document.createElement('option');
    opt.value       = cor;
    opt.textContent = cor;
    selCor.appendChild(opt);
  });

  selCor.disabled = false;
}

// ── Gerar objeto Cachorro e exibir na tela ──────────────────
function gerarCachorro() {
  const racaId = selRaca.value;
  const cor    = selCor.value;

  if (!racaId || !cor) {
    pulsarErro();
    return;
  }

  const racaData = racasDB.find(r => r.id === racaId);

  // Instancia o objeto usando as classes
  cachorroAtual = new Cachorro(racaData.nome, cor);

  // Foto específica da cor (ou padrão)
  const fotoURL = racaData.fotos[cor] || racaData.foto;

  // Renderiza o card
  exibirCard(cachorroAtual, racaData, fotoURL);

  // Log no console visual
  logConsole(cachorroAtual, racaData);
}

// ── Exibir card de resultado ────────────────────────────────
function exibirCard(cachorro, racaData, fotoURL) {
  // Foto
  elFoto.src = fotoURL;
  elFoto.alt = `${cachorro.raca} — ${cachorro.cor}`;

  // Nome
  elNome.textContent = `${cachorro.raca}`;

  // Descrição
  elDescricao.textContent = racaData.descricao;

  // Atributos da instância
  elAtribs.innerHTML = `
    <div class="atrib"><span class="atrib-label">Raça</span><span class="atrib-val">${cachorro.raca}</span></div>
    <div class="atrib"><span class="atrib-label">Cor</span><span class="atrib-val cor-badge">${cachorro.cor}</span></div>
    <div class="atrib"><span class="atrib-label">Patas</span><span class="atrib-val">${cachorro.patas}</span></div>
    <div class="atrib"><span class="atrib-label">Olhos</span><span class="atrib-val">${cachorro.olhos}</span></div>
    <div class="atrib"><span class="atrib-label">Porte</span><span class="atrib-val">${racaData.porte}</span></div>
    <div class="atrib"><span class="atrib-label">Peso</span><span class="atrib-val">${racaData.peso}</span></div>
    <div class="atrib"><span class="atrib-label">Expectativa</span><span class="atrib-val">${racaData.expectativa}</span></div>
    <div class="atrib atrib-full"><span class="atrib-label">Temperamento</span><span class="atrib-val">${racaData.temperamento}</span></div>
  `;

  // JSON do objeto
  const jsonObj = cachorro.toJSON();
  elJSON.innerHTML = highlightJSON(JSON.stringify(jsonObj, null, 2));

  // Mostra o card com animação
  cardResult.classList.remove('oculto');
  cardResult.classList.add('visivel');

  // Scroll suave até o card
  cardResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Console visual ──────────────────────────────────────────
function logConsole(cachorro, racaData) {
  const ts = new Date().toLocaleTimeString('pt-BR');
  const linha = document.createElement('div');
  linha.className = 'log-linha';
  linha.innerHTML =
    `<span class="log-ts">${ts}</span> ` +
    `<span class="log-new">new Cachorro</span>` +
    `(<span class="log-str">"${cachorro.raca}"</span>, ` +
    `<span class="log-str">"${cachorro.cor}"</span>) ` +
    `→ <span class="log-info">${cachorro.descrever()}</span>`;

  elConsole.appendChild(linha);
  elConsole.scrollTop = elConsole.scrollHeight;
}

// ── Highlight JSON ───────────────────────────────────────────
function highlightJSON(json) {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
      if (/^"/.test(m)) {
        return /:$/.test(m)
          ? `<span class="j-key">${m}</span>`
          : `<span class="j-str">${m}</span>`;
      }
      if (/true|false/.test(m)) return `<span class="j-bool">${m}</span>`;
      if (/null/.test(m))       return `<span class="j-null">${m}</span>`;
      return `<span class="j-num">${m}</span>`;
    });
}

// ── Pulsar erro nos selects ──────────────────────────────────
function pulsarErro() {
  [selRaca, selCor].forEach(el => {
    if (!el.value) {
      el.classList.add('erro');
      setTimeout(() => el.classList.remove('erro'), 600);
    }
  });
}

// ── Eventos ─────────────────────────────────────────────────
selRaca.addEventListener('change', atualizarCores);
btnGerar.addEventListener('click', gerarCachorro);

// ── Inicialização ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  popularRacas();
  console.log('racasDB (JSON):', JSON.stringify(racasDB, null, 2));
  console.log('Classes disponíveis: Animal, Cachorro');
  console.log('Exemplo: new Cachorro("Golden Retriever", "Dourado")');
});