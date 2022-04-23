"use strict";

var baseURL = "http://localhost:3000/animes";

function findAllAnimes() {
  var response, animes;
  return regeneratorRuntime.async(function findAllAnimes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(baseURL, "/all-animes")));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          animes = _context.sent;
          animes.forEach(function (anime) {
            document.querySelector("#animeList").insertAdjacentHTML("beforeend", "\n      <div class=\"AnimeListaItem\" id=\"AnimeListaItem_".concat(anime._id, "\">\n          <div>\n              <div class=\"AnimeListaItem__name\">").concat(anime.name, "</div>\n              <div class=\"AnimeListaItem__type\">R$ ").concat(anime.type, "</div>\n              <div class=\"AnimeListaItem__description\">Descri\xE7\xE3o: ").concat(anime.description, "</div>\n              <div class=\"AnimeListaItem__episodes\">Epis\xF3dios: ").concat(anime.episodes, "</div>\n  \n              <div class=\"AnimeListaItem__acoes Acoes\">\n                <button class=\"Acoes__editar btn\" onclick=\"abrirModal(").concat(anime._id, ")\">Editar</button> \n                <button class=\"Acoes__apagar btn\" onclick=\"abrirModalDelete(").concat(anime._id, ")\">Apagar</button> \n              </div>\n          </div>\n          \n          <img class=\"PaletaListaItem__image\" src=\"").concat(anime.image, "\" alt=\"Paleta de ").concat(anime.name, "\" />\n  \n          \n      </div>\n      "));
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function findByIdAnimes() {
  var id, response, anime, paletaEscolhidaDiv;
  return regeneratorRuntime.async(function findByIdAnimes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = document.querySelector("#idAnime").value;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(baseURL, "/one-anime/").concat(id)));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          anime = _context2.sent;
          paletaEscolhidaDiv = document.querySelector("#AnimeEscolhido");
          paletaEscolhidaDiv.innerHTML = "\n    <div class=\"AnimeCardItem\" id=\"AnimeListaItem_".concat(anime._id, "\">\n    <div>\n        <div class=\"AnimeCardItem__name\">").concat(anime.name, "</div>\n        <div class=\"AnimeCardItem__type\">R$ ").concat(anime.type, "</div>\n        <div class=\"AnimeCardItem__description\">").concat(anime.description, "</div>\n        <div class=\"AnimeListaItem__episodes\">").concat(anime.episodes, "</div>\n        \n        <div class=\"AnimeListaItem__acoes Acoes\">\n            <button class=\"Acoes__editar btn\" onclick=\"abrirModal(").concat(anime._id, ")\">Editar</button> \n            <button class=\"Acoes__apagar btn\" onclick=\"abrirModalDelete(").concat(anime._id, ")\">Apagar</button> \n        </div>\n    </div>\n    <img class=\"AnimeCardItem__image\" src=\"").concat(anime.image, "\" alt=\"Paleta de ").concat(anime.name, "\" />\n  </div>");

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}

findAllAnimes();

function abrirModal() {
  var id,
      response,
      anime,
      _args3 = arguments;
  return regeneratorRuntime.async(function abrirModal$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;

          if (!(id != null)) {
            _context3.next = 18;
            break;
          }

          document.querySelector("#title-header-modal").innerText = "Atualizar um Anime";
          document.querySelector("#button-form-modal").innerText = "Atualizar";
          _context3.next = 6;
          return regeneratorRuntime.awrap(fetch("".concat(baseURL, "/anime/").concat(id)));

        case 6:
          response = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          anime = _context3.sent;
          document.querySelector("#name").value = anime.name;
          document.querySelector("#type").value = anime.type;
          document.querySelector("#description").value = anime.description;
          document.querySelector("#image").value = anime.image;
          document.querySelector("#episodes").value = anime.episodes;
          document.querySelector("#id").value = anime.id;
          _context3.next = 20;
          break;

        case 18:
          document.querySelector("#title-header-modal").innerText = "Cadastrar um Anime";
          document.querySelector("#button-form-modal").innerText = "Cadastrar";

        case 20:
          document.querySelector("#overlay").style.display = "flex";

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#name").value = "";
  document.querySelector("#type").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#image").value = "";
  document.querySelector("#episodes").value = 0;
}

function createAnime() {
  var id, name, type, description, image, episodes, anime, modoEdicaoAtivado, endpoint, response, novaAnime, html;
  return regeneratorRuntime.async(function createAnime$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = document.querySelector("#id").value;
          name = document.querySelector("#name").value;
          type = document.querySelector("#type").value;
          description = document.querySelector("#description").value;
          image = document.querySelector("#image").value;
          episodes = document.querySelector("#episodes").value;
          anime = {
            id: id,
            name: name,
            type: type,
            description: description,
            image: image,
            episodes: episodes
          };
          modoEdicaoAtivado = id > 0;
          endpoint = baseURL + (modoEdicaoAtivado ? "/update-anime/".concat(id) : "/create-anime");
          _context4.next = 11;
          return regeneratorRuntime.awrap(fetch(endpoint, {
            method: modoEdicaoAtivado ? "put" : "post",
            headers: {
              "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(paleta)
          }));

        case 11:
          response = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          novaAnime = _context4.sent;
          html = "\n    <div class=\"AnimeListaItem\" id=\"PaletaListaItem_".concat(anime._id, "\">\n      <div>\n          <div class=\"AnimeListaItem__name\">").concat(novaAnime.name, "</div>\n          <div class=\"AnimeListaItem__type\">R$ ").concat(novaAnime.type, "</div>\n          <div class=\"AnimeListaItem__description\">").concat(novaAnime.description, "</div>\n          <div class=\"AnimeListaItem__episodes\">").concat(anime.episodes, "</div>\n  \n          <div class=\"AnimeListaItem__acoes Acoes\">\n            <button class=\"Acoes__editar btn\" onclick=\"abrirModal(").concat(anime._id, ")\">Editar</button> \n            <button class=\"Acoes__apagar btn\" onclick=\"abrirModalDelete(").concat(anime._id, ")\">Apagar</button> \n          </div>\n      </div>\n      <img class=\"AnimeListaItem__image\" src=\"").concat(novaAnime.image, "\" alt=\"Paleta de ").concat(novaAnime.name, "\" />\n    </div>");

          if (modoEdicaoAtivado) {
            document.querySelector("#AnimeListaItem_".concat(id)).outerHTML = html;
          } else {
            document.querySelector("#animeList").insertAdjacentHTML("beforeend", html);
          }

          fecharModal();

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";
  var btnSim = document.querySelector(".btn_delete_yes");
  btnSim.addEventListener("click", function () {
    deleteAnime(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

function deletePaleta(id) {
  var response, result;
  return regeneratorRuntime.async(function deletePaleta$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(baseURL, "/delete-anime/").concat(id), {
            method: "delete",
            headers: {
              "Content-Type": "application/json"
            },
            mode: "cors"
          }));

        case 2:
          response = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context5.sent;
          alert(result.message);
          document.getElementById("animeList").innerHTML = "";
          fecharModalDelete();
          findAllAnimes();

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}