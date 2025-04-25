async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "Inconnu";
  }
}

function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("fingerprint-test", 2, 2);
  return canvas.toDataURL();
}

function getWebGLInfo() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    return {
      vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),
      renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL),
    };
  } catch {
    return { vendor: "Inconnu", renderer: "Inconnu" };
  }
}

async function getBatteryInfo() {
  try {
    const battery = await navigator.getBattery();
    return `${Math.round(battery.level * 100)}% ${battery.charging ? "(en charge)" : ""}`;
  } catch {
    return "Inconnu";
  }
}

function detectAdblock() {
  const bait = document.createElement("div");
  bait.className = "adsbox";
  bait.style.height = "1px";
  document.body.appendChild(bait);
  const blocked = bait.offsetHeight === 0;
  bait.remove();
  return blocked ? "Détecté" : "Non détecté";
}

function isIncognito(callback) {
  const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  if (!fs) return callback("Inconnu");
  fs(window.TEMPORARY, 100, () => callback("Non"), () => callback("Oui"));
}

function getFonts() {
  const fontList = ["Arial", "Courier", "Georgia", "Tahoma", "Times", "Verdana"];
  const base = "monospace";
  const testSpan = document.createElement("span");
  testSpan.innerHTML = "abcdefghi0123456789";
  testSpan.style.fontSize = "72px";
  testSpan.style.visibility = "hidden";
  document.body.appendChild(testSpan);

  const baseWidth = (() => {
    testSpan.style.fontFamily = base;
    return testSpan.offsetWidth;
  })();

  return fontList.filter(f => {
    testSpan.style.fontFamily = `${f},${base}`;
    return testSpan.offsetWidth !== baseWidth;
  });
}

function hashFingerprint(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  return crypto.subtle.digest("SHA-256", encoded).then(hash => {
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

async function showFingerprint() {
  const ip = await getIP();
  const battery = await getBatteryInfo();
  const webgl = getWebGLInfo();

  const baseData = {
    "Adresse IP": ip,
    "User Agent": navigator.userAgent,
    "Langue": navigator.language,
    "Résolution": `${screen.width} x ${screen.height}`,
    "Orientation écran": screen.orientation?.type || "Inconnu",
    "Fuseau horaire": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "Plateforme": navigator.platform,
    "Touches tactiles": navigator.maxTouchPoints,
    "RAM dispo": navigator.deviceMemory ? `${navigator.deviceMemory} Go` : "Inconnu",
    "CPU logiques": navigator.hardwareConcurrency || "Inconnu",
    "Do Not Track": navigator.doNotTrack,
    "Cookies activés": navigator.cookieEnabled,
    "Local Storage": !!window.localStorage,
    "Session Storage": !!window.sessionStorage,
    "IndexedDB": !!window.indexedDB,
    "WebGL Vendor": webgl.vendor,
    "WebGL Renderer": webgl.renderer,
    "Canvas fingerprint": getCanvasFingerprint().substring(100, 120),
    "Batterie": battery,
    "AdBlock": detectAdblock(),
    "Fonts détectées": getFonts().join(", ") || "Inconnu",
    "Tor (présumé)": window.innerWidth === screen.width ? "Non" : "Peut-être",
  };

  const rawString = Object.entries(baseData).map(([k, v]) => `${k}: ${v}`).join("\n");
  const container = document.getElementById("results");

  Object.entries(baseData).forEach(([k, v]) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${k} :</strong> ${v}`;
    container.appendChild(p);
  });

  isIncognito(mode => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>Navigation privée :</strong> ${mode}`;
    container.appendChild(p);
  });

  const hash = await hashFingerprint(rawString);
  const hashP = document.createElement("p");
  hashP.innerHTML = `<strong>Empreinte SHA-256 :</strong> ${hash}`;
  container.appendChild(hashP);
}

showFingerprint();
