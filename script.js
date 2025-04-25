async function getIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (e) {
    return 'Inconnu';
  }
}

function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Fingerprint test', 2, 2);
  return canvas.toDataURL();
}

async function showFingerprint() {
  const ip = await getIP();
  const results = {
    'Adresse IP': ip,
    'User Agent': navigator.userAgent,
    'Langue': navigator.language,
    'Résolution': `${screen.width} x ${screen.height}`,
    'Fuseau horaire': Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Plateforme': navigator.platform,
    'Do Not Track': navigator.doNotTrack,
    'Cookies activés': navigator.cookieEnabled,
    'Local Storage': !!window.localStorage,
    'Session Storage': !!window.sessionStorage,
    'Canvas fingerprint (hash)': getCanvasFingerprint().substring(100, 120)
  };

  const container = document.getElementById('results');
  Object.entries(results).forEach(([key, value]) => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${key} :</strong> ${value}`;
    container.appendChild(p);
  });
}

showFingerprint();
