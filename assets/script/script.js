const baseURL = "http://localhost:3000/animes";


async function findAllAnimes() {
    const response = await fetch(`${baseURL}/all-animes`);
  
    const animes = await response.json();
  
    animes.forEach(function (anime) {
      document.querySelector("#animeList").insertAdjacentHTML(
        "beforeend",
        `
      <div class="AnimeListaItem" id="AnimeListaItem_${anime._id}">
          <div>
              <div class="AnimeListaItem__name">${anime.name}</div>
              <div class="AnimeListaItem__type">R$ ${anime.type}</div>
              <div class="AnimeListaItem__description">Descrição: ${anime.description}</div>
              <div class="AnimeListaItem__episodes">Episódios: ${anime.episodes}</div>
  
              <div class="AnimeListaItem__acoes Acoes">
                <button class="Acoes__editar btn" onclick="abrirModal(${anime._id})">Editar</button> 
                <button class="Acoes__apagar btn" onclick="abrirModalDelete(${anime._id})">Apagar</button> 
              </div>
          </div>
          
          <img class="PaletaListaItem__image" src="${anime.image}" alt="Paleta de ${anime.name}" />
  
          
      </div>
      `
      );
    });
  }
  
  async function findByIdAnimes() {
    const id = document.querySelector("#idAnime").value;
  
    const response = await fetch(`${baseURL}/one-anime/${id}`);
    const anime = await response.json();
  
    const paletaEscolhidaDiv = document.querySelector("#AnimeEscolhido");
  
    paletaEscolhidaDiv.innerHTML = `
    <div class="AnimeCardItem" id="AnimeListaItem_${anime._id}">
    <div>
        <div class="AnimeCardItem__name">${anime.name}</div>
        <div class="AnimeCardItem__type">R$ ${anime.type}</div>
        <div class="AnimeCardItem__description">${anime.description}</div>
        <div class="AnimeListaItem__episodes">${anime.episodes}</div>
        
        <div class="AnimeListaItem__acoes Acoes">
            <button class="Acoes__editar btn" onclick="abrirModal(${anime._id})">Editar</button> 
            <button class="Acoes__apagar btn" onclick="abrirModalDelete(${anime._id})">Apagar</button> 
        </div>
    </div>
    <img class="AnimeCardItem__image" src="${anime.image}" alt="Paleta de ${anime.name}" />
  </div>`;
  }
  
  findAllAnimes();
  
  async function abrirModal(id = null) {
    if (id != null) {
      document.querySelector("#title-header-modal").innerText =
        "Atualizar um Anime";
      document.querySelector("#button-form-modal").innerText = "Atualizar";
  
      const response = await fetch(`${baseURL}/anime/${id}`);
      const anime = await response.json();
  
      document.querySelector("#name").value = anime.name;
      document.querySelector("#type").value = anime.type;
      document.querySelector("#description").value = anime.description;
      document.querySelector("#image").value = anime.image;
      document.querySelector("#episodes").value = anime.episodes;
      document.querySelector("#id").value = anime.id;
    } else {
      document.querySelector("#title-header-modal").innerText =
        "Cadastrar um Anime";
      document.querySelector("#button-form-modal").innerText = "Cadastrar";
    }
  
    document.querySelector("#overlay").style.display = "flex";
  }
  
  function fecharModal() {
    document.querySelector(".modal-overlay").style.display = "none";
  
    document.querySelector("#name").value = "";
    document.querySelector("#type").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#image").value = "";
    document.querySelector("#episodes").value = 0;

  }
  
  async function createAnime() {
    const id = document.querySelector("#id").value;
    const name = document.querySelector("#name").value;
    const type = document.querySelector("#type").value;
    const description = document.querySelector("#description").value;
    const image = document.querySelector("#image").value;
    const episodes = document.querySelector("#episodes").value;
  
    const anime = {
      id,
      name,
      type,
      description,
      image,
      episodes,
    };
  
    const modoEdicaoAtivado = id > 0;
  
    const endpoint = baseURL + (modoEdicaoAtivado ? `/update-anime/${id}` : `/create-anime`);
  
    const response = await fetch(endpoint, {
      method: modoEdicaoAtivado ? "put" : "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(paleta),
    });
  
    const novaAnime = await response.json();
  
    const html = `
    <div class="AnimeListaItem" id="PaletaListaItem_${anime._id}">
      <div>
          <div class="AnimeListaItem__name">${novaAnime.name}</div>
          <div class="AnimeListaItem__type">R$ ${novaAnime.type}</div>
          <div class="AnimeListaItem__description">${novaAnime.description}</div>
          <div class="AnimeListaItem__episodes">${anime.episodes}</div>
  
          <div class="AnimeListaItem__acoes Acoes">
            <button class="Acoes__editar btn" onclick="abrirModal(${anime._id})">Editar</button> 
            <button class="Acoes__apagar btn" onclick="abrirModalDelete(${anime._id})">Apagar</button> 
          </div>
      </div>
      <img class="AnimeListaItem__image" src="${novaAnime.image}" alt="Paleta de ${novaAnime.name}" />
    </div>`;
  
    if (modoEdicaoAtivado) {
      document.querySelector(`#AnimeListaItem_${id}`).outerHTML = html;
    } else {
      document.querySelector("#animeList").insertAdjacentHTML("beforeend", html);
    }
  
    fecharModal();
  }
  
  function abrirModalDelete(id) {
    document.querySelector("#overlay-delete").style.display = "flex";
  
    const btnSim = document.querySelector(".btn_delete_yes")
  
    btnSim.addEventListener("click", function() {
      deleteAnime(id);
    })
  }
  
  function fecharModalDelete() {
    document.querySelector("#overlay-delete").style.display = "none";
  }
  
  async function deletePaleta(id) {
    const response = await fetch(`${baseURL}/delete-anime/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  
    const result = await response.json();
    alert(result.message);
  
    document.getElementById("animeList").innerHTML = ""
  
    fecharModalDelete();
    findAllAnimes();
  }
