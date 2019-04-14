$(document).ready(function () {
  $("#spinner").hide();
  $('#scrape-articles').hide();

  // Get Single Article Notes
  $(document).on("click", ".add-note", function () {
    const articleID = $(this).attr("data-id");
    $('#add-note-modal').modal('toggle');
    $('#submit-note').attr("data-id", articleID);
  })

  // Unsave Article
  $(".remove-article").on("click", function () { // Arrow Functions WILL NOT WORK!!!
    event.preventDefault(); // turn off default submit button behavior
    let articleId = {
      id: $(this).attr("data-id") // get selected Article ID
    } 

    // use post method to unsave article
    $.ajax("/api/unsave",
      {
        type: "PUT",
        data: articleId
      }).then(
        function () {
          // change button
          location.reload();
        }
      );

  });

  // Add Note to article
  $("#submit-note").on("click", function () { // Arrow Functions WILL NOT WORK!!!
    event.preventDefault(); // turn off default submit button behavior
    let noteObj = {
      id: $(this).attr("data-id"),
      note: $("#note-message").val() // get selected Article ID
    } 

    // use post method to unsave article
    $.ajax("/api/addnote",
      {
        type: "PUT",
        data: noteObj
      }).then(
        function () {
          // change button
          location.reload();
        }
      );

  });

}) // end jQuery file