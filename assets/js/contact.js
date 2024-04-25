function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$("#contactForm").on("submit", function (event) {
  event.preventDefault();

  var formData = {
    name: $("#contactForm [name=name]").val(),
    email: $("#contactForm [name=email]").val(),
    message: $("#contactForm [name=comments]").val(),
  };

  console.log(formData)

  var valid = true;
  if (!formData.name) {
    $("#contactForm [name=name]").focus();
    valid = false;
  }

  if (!(formData.email && validateEmail(formData.email))) {
    $("#contactForm [name=email]").focus();
    valid = false;
  }

  if (!formData.message) {
    $("#contactForm [name=comments]").focus();
    valid = false;
  }

  if (valid == false) {
    return;
  }

  console.log(formData)

  $("#contactForm [type=submit]").text("Sending...");
  $.ajax({
    type: $("#contactForm").attr("method"),
    url: $("#contactForm").attr("action"),
    data: formData,
  }).done(function (data) {
    $("#contactForm")[0].reset();
    $("#contactForm [type=submit]").text(data);
    setTimeout(function () {
      $("#contactForm [type=submit]").text("Invia");
    }, 4000);
  });
});
