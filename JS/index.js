$(document).ready(function () {
  let menuVisible = false;
  let navItem = $("#nav");

  $(".nav-responsive").click(function (e) {
    e.preventDefault();
    toggleMenu();
  });

  $(".nav-responsive a").click(function () {
    toggleMenu();
  });

  function toggleMenu() {
    menuVisible = !menuVisible;

    if (menuVisible) {
      navItem.addClass("responsive");
      setTimeout(() => {
        navItem.find("ul").css("opacity", 1);
      }, 10);
    } else {
      navItem.find("ul").css("opacity", 0);
      setTimeout(() => {
        navItem.removeClass("responsive");
      }, 300);
    }
  }

  $("#contact-form").submit(function (event) {
    // Evita que el formulario se envíe de manera predeterminada
    event.preventDefault();

    // Muestra la pantalla de carga
    $("#loading-overlay").show();
    $("#submit").hide();
    // Obtiene los valores de los campos del formulario
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var email = $("#email").val();
    var mensaje = $("#mensaje").val();

    // Envia el formulario a través de EmailJS
    emailjs
      .send("service_s36ze4n", "template_13fle9o", {
        nombre: nombre,
        telefono: telefono,
        email: email,
        mensaje: mensaje,
      })
      .then(
        function (response) {
          // Oculta la pantalla de carga
          $("#loading-overlay").hide();
          $("#submit").show();
          // Muestra el mensaje de éxito
          alertify.set("notifier", "position", "top-right");
          alertify.success("Mensaje enviado correctamente", "position", "top-right");

          // Limpia los campos del formulario
          $("#nombre").val("");
          $("#telefono").val("");
          $("#email").val("");
          $("#mensaje").val("");
        },
        function (error) {
          // Oculta la pantalla de carga en caso de error
          $("#loading-overlay").hide();

          // Muestra el mensaje de error
          alertify.set("notifier", "position", "top-right");
          alertify.error("El mensaje no pudo ser enviado", "position", "top-right");
        }
      );
  });
});
