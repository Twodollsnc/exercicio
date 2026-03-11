/* ============================================
   NATURA LENS — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Ano atual no rodapé ----
  const year = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach(el => el.textContent = year);

  // ---- Nav link ativo ----
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    }
  });

  // ---- Formulário de cadastro ----
  const form = document.getElementById('cadastroForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nome  = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const check = form.querySelector('#aceite').checked;
      if (!nome || !email || !check) {
        alert('Por favor, preencha todos os campos e aceite os termos.');
        return;
      }
      form.innerHTML = `
        <p style="text-align:center;color:var(--accent);font-family:var(--font-head);font-size:1.1rem;padding:1.5rem 0;">
          ✓ Cadastro realizado com sucesso, ${nome}!
        </p>`;
    });
  }

  // ---- Fade-in ao rolar (IntersectionObserver) ----
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});