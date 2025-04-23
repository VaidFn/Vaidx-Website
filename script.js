async function connectUSB() {
  try {
    const device = await navigator.usb.requestDevice({ filters: [{}] });
    alert(`Appareil sélectionné :\nNom : ${device.productName}\nFabricant : ${device.manufacturerName}`);
  } catch (error) {
    alert("Erreur ou annulation : " + error.message);
  }
}
