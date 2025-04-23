async function connectUSB() {
  try {
    // Demander à l'utilisateur de choisir un appareil USB
    const device = await navigator.usb.requestDevice({ filters: [{}] });

    // Afficher les informations sur l'appareil
    document.getElementById("device-name").textContent = "Nom de l'appareil: " + device.productName;
    document.getElementById("device-manufacturer").textContent = "Fabricant: " + device.manufacturerName;
    document.getElementById("device-serial").textContent = "Numéro de série: " + device.serialNumber;
    document.getElementById("device-id").textContent = "ID produit: " + device.productId;

    // Vérification si l'appareil peut être flashé (exemple simplifié basé sur l'ID produit)
    let flashable = false;

    // Simule un contrôle d'ID produit pour déterminer si l'appareil est flashable
    if (device.productId === 1234) { // Remplace avec un ID réel si nécessaire
      flashable = true;
    }

    // Afficher le statut de l'appareil (flashable ou bloqué)
    const statusElement = document.getElementById("device-status");
    if (flashable) {
      statusElement.textContent = "Cet appareil peut être flashé.";
      statusElement.classList.add("flashable");
      statusElement.classList.remove("blocked");
    } else {
      statusElement.textContent = "Cet appareil est bloqué.";
      statusElement.classList.add("blocked");
      statusElement.classList.remove("flashable");
    }

    // Afficher les informations de l'appareil avec animation
    document.getElementById("device-info").style.display = "block";

  } catch (error) {
    alert("Erreur ou annulation : " + error.message);
  }
}
