$(document).ready(function () {
  let menuVisible = false;
  let navItem = $("#nav");

  $(".nav-responsive").click(function (e) {
    e.preventDefault();
    toggleMenu();
  });

  $("#nav a").click(function () {
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
          alertify.set("notifier", "position", "top-right");
          alertify.success(
            "Mensaje enviado correctamente",
            "position",
            "top-right"
          );
          nombre = $("#nombre").val("");
          telefono = $("#telefono").val("");
          email = $("#email").val("");
          mensaje = $("#mensaje").val("");
          // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito al usuario
        },
        function (error) {
          alertify.set("notifier", "position", "top-right");
          alertify.error(
            "El mensaje no pudo ser enviado",
            "position",
            "top-right"
          );
          // Pue
        }
      );
  });
});
