$(document).ready(() => {

  // data will be loaded from html_controller.js

  // Get Single Article
  $(document).on("click", ".save-article", () => {
    event.preventDefault(); // turn off default submit button behavior
    const articleId = $(this).attr("data-id"); // get selected Article ID
    const url = "/api/save/" + articleId;

    // use AJAX to get the single Article info
    $.ajax({
      method: "GET",
      url: url
    })
      .then(
        function () {
          console.log("Get values from form");


        }
      );

    // TODO Alert Modal OPTION
    // $('#alertModal').modal('show');

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