/* ==========================================================
   1. MENU MOBILE
   ========================================================== */
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  });
});

/* ==========================================================
   2. EFEITO DE DIGITAÇÃO
   Troque as palavras abaixo pelas suas.
   ========================================================== */
const palavras = ["Estudante", "Dados & Analytics", "DataViz", "Automação de Processos", "Gen AI"];
const alvo = document.getElementById("typewriter");

let indicePalavra = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {
  const palavra = palavras[indicePalavra];

  if (!apagando) {
    indiceLetra++;
    alvo.textContent = palavra.slice(0, indiceLetra);
    if (indiceLetra === palavra.length) {
      apagando = true;
      return setTimeout(digitar, 1400); // pausa com a palavra completa
    }
  } else {
    indiceLetra--;
    alvo.textContent = palavra.slice(0, indiceLetra);
    if (indiceLetra === 0) {
      apagando = false;
      indicePalavra = (indicePalavra + 1) % palavras.length;
    }
  }
  setTimeout(digitar, apagando ? 50 : 100);
}
digitar();

/* ==========================================================
   3. ABAS (Experiências / Formação)
   ========================================================== */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

/* ==========================================================
   4. FILTRO DE HABILIDADES
   ========================================================== */
const filterBtns = document.querySelectorAll(".filter-btn");
const skills = document.querySelectorAll(".skill");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filtro = btn.dataset.filter;
    skills.forEach((skill) => {
      const categorias = skill.dataset.category.split(" ");
      const mostrar = filtro === "all" || categorias.includes(filtro);
      skill.classList.toggle("hidden", !mostrar);
    });
  });
});

/* ==========================================================
   5. ANIMAÇÃO AO ROLAR A PÁGINA
   ========================================================== */
const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observer.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ==========================================================
   6. LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
   ========================================================== */
const secoes = document.querySelectorAll("main section");
const links = document.querySelectorAll("#nav a");

window.addEventListener("scroll", () => {
  let atual = "";
  secoes.forEach((secao) => {
    if (window.scrollY >= secao.offsetTop - 120) atual = secao.id;
  });
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + atual);
  });
});

/* ==========================================================
   7. COPIAR E-MAIL
   ========================================================== */
const copyBtn = document.getElementById("copy-email");

copyBtn.addEventListener("click", async () => {
  const texto = copyBtn.querySelector("span");
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    texto.textContent = "Copiado!";
  } catch {
    texto.textContent = "Não foi possível copiar";
  }
  setTimeout(() => (texto.textContent = "Copiar E-mail"), 2000);
});

/* ==========================================================
   8. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================== */
document.getElementById("year").textContent = new Date().getFullYear();
