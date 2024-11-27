$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const estadoId = params.get("estadoId");

  if (estadoId) {
    $.ajax({
      url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`,
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
        res.forEach(function (cidade) {
          $("#cidadesTable").append(
            `<div class="item" cidade="${cidade.id}">${cidade.nome}</div>`
          );
        });
      },
    });
  }
});
