$(document).ready(function () {
  $("#spinner").hide();
  $('#scrape-articles').hide();

  // render notes in modal
  const listNotes = function (articleID, arr) {
    $("#modal-notes").empty();
    $.ajax("/api/listnotes",
      {
        type: "POST",
        data: { note: arr }
      }).then(
        function (resultArray) {
          resultArray.forEach(result => {
            const noteItem = `<div class="d-flex justify-content-between mb-2">${result.body} 
              <button class="remove-note btn btn-warning mr-2" data-articleid=${articleID.id} data-id=${result._id}>
                <i class="fas fa-trash"></i>
              </button>
              </div>
              `
            $("#modal-notes").append(noteItem);

          });
          $('#submit-note').attr("data-id", articleID.id);
        }
      )
      .catch(function (err) {
        console.log(err)
      });
  }

  // get array of notes linked to article id
  const getNotes = function (articleID, callback) {
    $.ajax("/api/notes",
      {
        type: "POST",
        data: articleID
      }).then(
        function (noteObjects) {
          $("#modal-article-name").text(noteObjects.title);
          $("#modal-id").text(noteObjects._id);
          const noteArray = noteObjects.note.map(item => item._id);
          console.log(noteArray);
          callback(articleID, noteArray); // call listNotes function
        }
      )
      .catch(function (err) {
        console.log(err)
      });
  }

  // Get Article's Notes
  $(document).on("click", ".notes", function () {
    const articleID = {
      id: $(this).attr("data-id")
    }
    $('#add-note-modal').modal('toggle');

    getNotes(articleID, listNotes);
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

    // use PUT method to add note
    $.ajax("/api/addnote",
      {
        type: "PUT",
        data: noteObj
      }).then(
        function () {
          // change button
          $("#note-message").val("");
          getNotes(noteObj, listNotes);
        }
      );

  });


    // remove Note
    $(document).on("click", ".remove-note", function () { // Arrow Functions WILL NOT WORK!!!
      event.preventDefault(); // turn off default submit button behavior
      console.log("Delete Note");
      let noteObj = {
        id: $(this).attr("data-id") // get selected Article ID
      }
      let articleObj = {
        id: $(this).attr("data-articleid")
      }
  
      // use DELETE method to unsave article
      $.ajax("/api/remove-note",
        {
          type: "DELETE",
          data: noteObj
        }).then(
          function () {
            // clear modal notes list and rerender them
            getNotes(articleObj, listNotes);
          }
        );
  
    });

}) // end jQuery file