const baseURL = "http://localhost:3000/animes";

async function findAllAnimes() {
  const response = await fetch(`${baseURL}/all-animes`);

  const animes = await response.json();

  animes.forEach(function (anime) {
    document.querySelector(".AnimeLista").insertAdjacentHTML(
      "beforeend",
      `
      <div class="AnimeListaItem" id="AnimeListaItem_${anime._id}">
          <div>
              <div class="AnimeListaItem-name">${anime.name}</div>
              <div class="AnimeListaItem-type"><i> ${anime.type}</i></div>
              <div class="AnimeListaItem-description">Descrição: ${anime.description}</div>
              <div class="AnimeListaItem-episodes"> ${anime.episodes} Episódios.</div>
  
              <div class="AnimeListaItem-acoes Acoes">
                <button class="Acoes-editar btn" onclick="abrirModal('${anime._id}')">Editar</button> 
                <button class="Acoes-apagar btn" onclick="abrirModalDelete('${anime._id}')">Apagar</button> 
              </div>
          </div>
          
          <img class="AnimeListaItem-image" src="${anime.image}" alt="O anime é ${anime.name}" />
  
          
      </div>
      `
    );
  });
}

async function findByIdAnimes() {
  const id = document.querySelector("#idAnime").value;

  const response = await fetch(`${baseURL}/one-anime/${id}`);
  const anime = await response.json();
 

  document.querySelector(".list-all").style.display = "block"
 document.querySelector(".AnimeLista").style.display = "none"
 document.querySelector("#cadastro-anime").style.display = "none"


  const animeEscolhidoDiv = document.querySelector("#AnimeEscolhido");

  animeEscolhidoDiv.innerHTML = `
    <div class="AnimeCardItem" id="AnimeListaItem_${anime._id}">
    <div>
        <div class="AnimeCardItem-name">${anime.name}</div>
        <div class="AnimeCardItem-type"> ${anime.type}</div>
        <div class="AnimeCardItem-descreption">${anime.description}</div>
        <div class="AnimeListaItem-episodes">${anime.episodes}</div>
        
        
    </div>
    <img class="AnimeCardItem-image" src="${anime.image}" alt="O anime é ${anime.name}" />
  </div>`;
}

findAllAnimes();

async function abrirModal(id = "") {  
  if (id != "") {
    document.querySelector("#title-header-modal").innerHTML =
      "Atualizar um Anime";
    document.querySelector("#button-form-modal").innerHTML = "Atualizar";

    const response = await fetch(`${baseURL}/one-anime/${id}`);
    const anime = await response.json();
    document.querySelector("#name").value = anime.name;
    document.querySelector("#type").value = anime.type;
    document.querySelector("#description").value = anime.description;
    document.querySelector("#image").value = anime.image;
    document.querySelector("#episodes").value = anime.episodes;
    document.querySelector("#id").value = anime._id;
  } else {
    document.querySelector("#title-header-modal").innerHTML = "Cadastrar um Anime";
    document.querySelector("#button-form-modal").innerHTML = "Cadastrar";
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
  const episodes = document.querySelector("#episodes").value
  
  const anime = {
    id,
    name,
    type,
    description,
    image,
    episodes,
  };

  const modoEdicaoAtivado = id != "";
  const endpoint =
    baseURL + (modoEdicaoAtivado ? `/update-anime/${id}` : `/create-anime`);

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(anime),
  });

  const novaAnime = await response.json();

  const html = `
    <div class="AnimeListaItem" id="AnimeListaItem_${anime._id}">
      <div>
          <div class="AnimeListaItem-name">${novaAnime.name}</div>
          <div class="AnimeListaItem-type"> ${novaAnime.type}</div>
          <div class="AnimeListaItem-description">${novaAnime.description}</div>
          <div class="AnimeListaItem-episodes">${anime.episodes}</div>
  
          <div class="AnimeListaItem-acoes Acoes">
            <button class="Acoes-editar btn" onclick="abrirModal('${anime._id}')">Editar</button> 
            <button class="Acoes-apagar btn" onclick="abrirModalDelete('${anime._id}')">Apagar</button> 
          </div>
      </div>
      <img class="AnimeListaItem-image" src="${novaAnime.image}" alt="O anime é ${novaAnime.name}" />
    </div>`;

  if (modoEdicaoAtivado) {
    document.querySelector(`#AnimeListaItem_${id}`).outerHTML = html;
  } else {
    document.querySelector(".AnimeLista").insertAdjacentHTML("beforeend", html);
  }
  document.location.reload(true);
  fecharModal();
}


function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn-delete-yes");

  btnSim.addEventListener("click", function () {
    deleteAnime(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function deleteAnime(id) {
  const response = await fetch(`${baseURL}/delete-anime/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById(".AnimeLista").innerHTML = "";

  fecharModalDelete();
  findAllAnimes();
}
