/* Carga los datos desde links.json y construye la página.
   Editar el contenido = editar links.json (no hace falta tocar este archivo). */

(async function () {
  const $ = (sel) => document.querySelector(sel);

  let data;
  try {
    const res = await fetch("links.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    data = await res.json();
  } catch (err) {
    console.error("No se pudo cargar links.json:", err);
    $("#links").innerHTML =
      '<p style="color:var(--txt-2);text-align:center;font-size:13px">No se pudieron cargar los enlaces.</p>';
    return;
  }

  const { profile = {}, links = [], socials = [] } = data;

  // --- Perfil ---
  if (profile.accent) {
    document.documentElement.style.setProperty("--acc", profile.accent);
  }
  if (profile.handle) {
    $("#handle").textContent = profile.handle;
    document.title = profile.handle + " — Enlaces";
  }
  if (profile.name) $("#name").textContent = profile.name;
  if (profile.bio) $("#bio").textContent = profile.bio;

  // --- Enlaces ---
  const linksEl = $("#links");
  linksEl.innerHTML = "";
  links.forEach((link) => {
    const a = document.createElement("a");
    a.className = "link" + (link.cta ? " cta" : "");
    a.href = link.url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const parts = [];
    if (!link.cta) parts.push('<span class="sq" aria-hidden="true"></span>');
    parts.push('<span class="body">');
    if (link.tag) parts.push('<span class="tag">' + esc(link.tag) + "</span>");
    parts.push('<span class="title">' + esc(link.title || "") + "</span>");
    if (link.subtitle)
      parts.push('<span class="subtitle">' + esc(link.subtitle) + "</span>");
    parts.push("</span>");
    if (!link.cta) parts.push('<span class="arrow" aria-hidden="true">&rarr;</span>');

    a.innerHTML = parts.join("");
    linksEl.appendChild(a);
  });

  // --- Redes ---
  const socialsEl = $("#socials");
  socialsEl.innerHTML = "";
  socials.forEach((s) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.url || "#";
    a.textContent = s.label || "";
    if (!(s.url || "").startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    li.appendChild(a);
    socialsEl.appendChild(li);
  });

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
})();
