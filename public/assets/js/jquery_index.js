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

  // Scrape New Articles
  $(document).on("click", "#scrape-articles", () => {
    // Add Spinner
    $('#scrape-articles').hide();
    $('#spinner').show();
    $.ajax({
      type: "GET",
      url: "/api/scrape",
      done: function () {
      },
      complete: function () {
        $('#spinner').hide();
        $('#scrape-articles').show();
        // location.reload();

      },
      error: function (response) {
        //Handle error
        $("#spinner").hide();

      }
    }).then(function () {
      location.reload();
    });
  });

  // Show Clear Modal on Clear Scraped Articles link
  $(document).on("click", "#clear-articles", function () {
    $('#clear-modal').modal('toggle');
  });

  // Clear Scraped Articles
  $(document).on("click", "#clear-submit", function () {
    $('#clear-modal').modal('toggle');

    $.ajax({
      type: "POST",
      url: "/api/clear",
      complete: function () {
        location.reload();
      },
      error: function (response) {
        //Handle error
        $("#spinner").hide();

      }
    });


  })

  // Save Article
  $(document).on("click", ".add-note-form", () => {

  });

  // UnSave Article
  $(document).on("click", ".add-note-form", () => {
    $.ajax({
      type: "GET",
      url: "/api/scrape",
      success: function () {
      },
      complete: function () {
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

  // Add Note
  $(document).on("click", ".add-note-form", () => {

  });

  // Delete Note
  $(document).on("click", ".add-note-form", () => {

  });

}) // end jQuery file