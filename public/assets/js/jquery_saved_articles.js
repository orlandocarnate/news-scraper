$(document).ready(function () {
  $("#spinner").hide();
  $('#scrape-articles').hide();

  let noteList = function (arr) {
    $.ajax("/api/listnotes",
      {
        type: "POST",
        data: { note: arr }
      }).then(
        function (resultArray) {
          resultArray.forEach(result => {
            const noteItem = `<div class="d-flex justify-content-between mb-2">${result.body} 
              <button class="remove-note btn btn-warning mr-2" data-id=${result._id}>
                <i class="fas fa-trash"></i>
              </button>
              </div>
              `
            $("#modal-notes").append(noteItem);

          })
        }
      )
      .catch(function (err) {
        console.log(err)
      });
  }

  // Get Article's Notes
  $(document).on("click", ".notes", function () {
    $("#modal-notes").empty();
    const articleID = {
      id: $(this).attr("data-id")
    }
    $('#add-note-modal').modal('toggle');
    $.ajax("/api/notes",
      {
        type: "POST",
        data: articleID
      }).then(
        function (noteDataList) {
          $("#modal-article-name").text(noteDataList.title);
          $("#modal-id").text(noteDataList._id);
          const noteArray = noteDataList.note.map(item => item._id);
          console.log(noteArray);
          noteList(noteArray);
        }
      )
      .catch(function (err) {
        console.log(err)
      });

    $('#submit-note').attr("data-id", articleID.id);
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
      body: $("#note-message").val() // get selected Article ID
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