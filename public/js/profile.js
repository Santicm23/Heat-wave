/!Funcion para cambiar entre los diferentes Grids !/
function changeSection(activeSectionId) {
  var sections = document.querySelectorAll(".section-content");

  sections.forEach(function(section) {
    if (section.id === activeSectionId) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

document.getElementById("post-btn").addEventListener("click", function() {
  changeSection("post");
  
});
document.getElementById("playlist-btn").addEventListener("click", function() {
  changeSection("playlist");
});
document.getElementById("favorities-btn").addEventListener("click", function() {
  changeSection("favorities");
});

// Muestra la sección de publicaciones al cargar la página
changeSection("post");
/!Funcion para revisar si esta vacio, y en caso de que lo este poner la advertencia!/
function checkEmptyGrid() {
  var sections = document.querySelectorAll(".section-content");

  sections.forEach(function (section) {
    var grid = section.querySelector(".grid");

    if (grid && grid.children.length === 0) {
      grid.innerHTML = `
        <img src="assets/imgs/blanco.jpg" alt="post" />
        <img src="assets/imgs/noPublicacion.jpg" alt="post" />
        <img src="assets/imgs/blanco.jpg" alt="post" />
      `;
    }
  });
}

checkEmptyGrid();


