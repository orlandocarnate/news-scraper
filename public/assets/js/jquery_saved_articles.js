$(document).ready(() => {
  // Get All articles
  function loadArticles() {
    // AJAX call to /api/articles
  }

  

  // Get Single Article
  $(document).on("click", ".add-note-form", () => {
    event.preventDefault(); // turn off default submit button behavior
    // get selected Article ID
    const articleId = $(this).attr("data-id");


    const url = "/api/article/" + articleId;
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

}) // end jQuery file