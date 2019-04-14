$(document).ready(() => {
  $("#spinner").hide();

  // data will be loaded from html_controller.js

  // Save Article
  $(".save-article").on("click", function () {
    event.preventDefault(); // turn off default submit button behavior
    let articleId = {
      id: $(this).attr("data-id")
    } // get selected Article ID

    // alert(articleId);

    // use post method to save article
    $.ajax("/api/save",
      {
        type: "PUT",
        data: articleId
      }).then(
        function () {
          // change button
          location.reload();
        }
      );


    // TODO Alert Modal OPTION
    // $('#alertModal').modal('show');

  });

  // Scrape Modal
  $(document).on("click", "#scrape-articles", function () {
    $('#scrape-modal').modal('toggle');
  });

  // Confirm Scrape Articles
  $(document).on("click", "#scrape-button", () => {
    // $.get("/api/scrape", () => {
    //   $('#scrape-modal').modal('toggle');
    //   location.reload()
    // })

    // Add Spinner
    $('#scrape-articles').hide();
    $('#spinner').show();
    $('#scrape-modal').modal('toggle');
    $.ajax({
      type: "GET",
      url: "/api/scrape",
      success: function () {
        $('#spinner').hide();
        $('#scrape-articles').show();
        location.reload();
      },
      error: function (response) {
        //Handle error
        $("#spinner").hide();

      }
    });
  });

  // Save Article
  $(document).on("click", ".add-note-form", () => {

  });

  // UnSave Article
  $(document).on("click", ".add-note-form", () => {

  });

  // Add Note
  $(document).on("click", ".add-note-form", () => {

  });

  // Delete Note
  $(document).on("click", ".add-note-form", () => {

  });

}) // end jQuery file