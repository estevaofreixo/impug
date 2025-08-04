document.getElementById("enviarPDF").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Injetar código na aba para capturar o conteúdo do PDF
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      const response = await fetch(window.location.href);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("arquivo", blob, "documento.pdf");

      // Envia para o servidor Flask
      await fetch("http://localhost:5000/enviar_pdf", {
        method: "POST",
        body: formData,
      }).then(() => alert("PDF enviado com sucesso!"));
    }
  });
});
