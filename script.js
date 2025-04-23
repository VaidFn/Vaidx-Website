async function connectUSB() {
  try {
    const device = await navigator.usb.requestDevice({ filters: [{}] });

    // Mettre à jour l'interface utilisateur avec les infos de l'appareil
    document.getElementById('device-name').textContent = device.productName || "Inconnu";
    document.getElementById('device-manufacturer').textContent = device.manufacturerName || "Inconnu";
    document.getElementById('device-serial').textContent = device.serialNumber || "Inconnu";
    document.getElementById('device-vendor').textContent = device.vendorId || "Inconnu";
    document.getElementById('device-product').textContent = device.productId || "Inconnu";

    // Afficher le div avec les infos
    document.getElementById('device-info').classList.remove('hidden');

    alert(`Appareil sélectionné :\nNom : ${device.productName}\nFabricant : ${device.manufacturerName}`);
  } catch (error) {
    alert("Erreur ou annulation : " + error.message);
  }
}
