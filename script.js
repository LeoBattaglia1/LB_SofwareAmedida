const escena = document.getElementById("escena");
const portada = document.getElementById("portada");
const abrirLogin = document.getElementById("abrirLogin");
const login = document.getElementById("login");
const cerrarLogin = document.getElementById("cerrarLogin");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const particulas = document.getElementById("particulas");

let transicionEnCurso = false;
let intervaloParticulas;

function crearParticula() {
  if (!particulas) return;

  const particula = document.createElement("span");
  particula.className = "particula";
  particula.style.left = `${Math.random() * 100}%`;
  particula.style.setProperty("--deriva", `${Math.random() * 140 - 70}px`);
  particula.style.animationDuration = `${5 + Math.random() * 7}s`;
  particula.style.opacity = `${0.2 + Math.random() * 0.55}`;
  particulas.appendChild(particula);

  setTimeout(() => particula.remove(), 12500);
}

for (let i = 0; i < 22; i++) {
  setTimeout(crearParticula, i * 180);
}
intervaloParticulas = setInterval(crearParticula, 500);

abrirLogin.addEventListener("click", () => {
  if (transicionEnCurso || login.classList.contains("visible")) return;
  transicionEnCurso = true;

  escena.classList.add("deshaciendo");
  abrirLogin.disabled = true;

  setTimeout(() => {
    portada.hidden = true;
    login.classList.add("visible");
    login.setAttribute("aria-hidden", "false");
    escena.classList.remove("deshaciendo");
    transicionEnCurso = false;
    document.getElementById("usuario").focus({ preventScroll: true });
  }, 720);
});

cerrarLogin.addEventListener("click", () => {
  if (transicionEnCurso) return;
  transicionEnCurso = true;

  login.classList.remove("visible");
  login.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    portada.hidden = false;
    abrirLogin.disabled = false;
    escena.classList.add("deshaciendo");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        escena.classList.remove("deshaciendo");
        transicionEnCurso = false;
      });
    });
    mensaje.textContent = "";
    formulario.reset();
  }, 450);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  mensaje.textContent = "La puerta aún no reconoce tus credenciales...";
});

// Mantiene la tormenta y las partículas activas durante toda la escena.
escena.classList.add("tormenta-activa");
