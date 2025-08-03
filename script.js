document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const marcaSelect = document.getElementById('marca');
  const distanciaInput = document.getElementById('distanciaFocal');
  const resultadoDiv = document.getElementById('resultado');
  const imagemCameraDiv = document.getElementById('imagemCamera');
  const botaoLimpar = document.getElementById('limpar');

  // Função para trocar a imagem da câmera
  function atualizarImagem(marca) {
    let imagemHTML = '';

    if (marca === 'nikon') {
      imagemHTML = `
        <img src="images/Nikon_D3100.webp" width="70%" alt="Nikon D3100" />
      `;
    } else if (marca === 'canon') {
      imagemHTML = `
        <img src="images/Canon_T3i.webp" width="70%" alt="Canon T3i" />
      `;
    }

    imagemCameraDiv.innerHTML = imagemHTML;
  }

  // Atualiza imagem ao mudar a marca
  marcaSelect.addEventListener('change', () => {
    atualizarImagem(marcaSelect.value);
  });

  // Atualiza ao carregar a página também
  atualizarImagem(marcaSelect.value);

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const marca = marcaSelect.value;
    const distanciaFocal = parseFloat(distanciaInput.value);

    if (isNaN(distanciaFocal) || distanciaFocal <= 0) {
      resultadoDiv.innerHTML = `<span style="color:red;">Por favor, insira uma distância focal válida.</span>`;
      return;
    }

    const fatorCorte = marca === 'nikon' ? 1.5 : 1.6;
    const equivalente = (distanciaFocal * fatorCorte).toFixed(1);

    let classificacao = '';
    if (equivalente < 35) {
      classificacao = 'Grande Angular';
    } else if (equivalente >= 35 && equivalente <= 70) {
      classificacao = 'Normal';
    } else {
      classificacao = 'Teleobjetiva';
    }

    resultadoDiv.innerHTML = `
      <strong>Marca:</strong> ${marca === 'nikon' ? 'Nikon D3100' : 'Canon T3i'}<br>
      <strong>Distância focal informada:</strong> ${distanciaFocal} mm<br>
      <strong>Distância focal real é:</strong> ${equivalente} mm (equivalente em full frame)<br>
      <strong>Classificação:</strong> ${classificacao}
    `;
  });

  // Evento para o botão Limpar — faz reset geral
  botaoLimpar.addEventListener('click', () => {
    formulario.reset(); // Limpa os campos
    resultadoDiv.innerHTML = ''; // Limpa o resultado
    imagemCameraDiv.innerHTML = ''; // Remove imagem da câmera
  });
});
