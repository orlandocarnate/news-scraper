$(document).ready(() => {

  // CREATE NOTE
  $(".create-burger-form").on("submit", () => {
    event.preventDefault(); // turn off default submit button behavior
    if (($("#burger_name").val().trim()).length > 0) {
      let newBurger = {
        burger_name: $("#burger_name").val().trim()
      }
      // use AJAX to send Post Request using form data
      $.ajax("/api/newburger", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("Created a new burger and with default true");
          // Reload the page to get the updated list
          location.reload();
        }
      );

    } else {
    //   $('#alertModal').modal({
    //     backdrop: 'static',
    //     keyboard: false
    // });
    $('#alertModal').modal('show');
    }
  });

  // Consume Burger
  $(".btn-burger").on("click", function () {
    let selectedID = {
      id: $(this).data("id")
    }

    $.ajax("/api/update", {
      type: "PUT",
      data: selectedID
    }).then(
      function () {
        console.log("Updated burger by setting devoured to True");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  })




  // end jQuery file
})