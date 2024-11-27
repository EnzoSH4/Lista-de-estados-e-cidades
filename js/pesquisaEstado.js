$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pesquisa = urlParams.get("pesquisa");

  if (pesquisa) {
    $.ajax({
      url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      method: "GET",
      success: function (res) {
 
        res.sort(function (i, s) {
          if (i.nome < s.nome) {
            return -1;
          }
          if (i.nome > s.nome) {
            return 1;
          }
          return 0;
        });

        res.forEach(function (estado) {
          if (estado.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(pesquisa.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
            $("#estadosTable").append(
              `<div class="item" estado="${estado.id}">${estado.nome}</div>`
            );
          }
        });

        $(".item").click(function () {
          const estadoId = $(this).attr("estado");
          window.location.href = `cidades.html?estadoId=${estadoId}`;
        });
      }
    });
  }
});
