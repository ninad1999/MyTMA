let fab1 = document.getElementById('fab1');
let innerFabs = document.getElementsByClassName('inner-fabs')[0];

fab1.addEventListener('click', function () {
  innerFabs.classList.toggle('show');
});

$(document).ready(function(){
  $('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });
});

// const url = 'http://35.186.168.61/mytma.php'
// const form = document.querySelector('form')
//
// form.addEventListener('submit', e => {
//   e.preventDefault()
//
//   const files = document.querySelector('[type=file]').files
//   const formData = new FormData()
//
//   for (let i = 0; i < files.length; i++) {
//     let file = files[i]
//
//     formData.append('files[]', file)
//   }
//
//   fetch(url, {
//     method: 'POST',
//     body: formData,
//   }).then(response => {
//     console.log(response)
//   })
// })

$("document").ready(function() {

  $('input[type=file]').on("change", function() {

    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // Begin file upload
      console.log("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = 'd9329d0db2f41bc';

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
        var obj = JSON.parse(response);
        console.log(obj.data.link)
        var lk = obj.data.link
        $.ajax({
           type : "GET",
           url : "http://35.186.168.61?val=" + lk,
           success : function(result) {
               console.log(result)
               
           },
           error : function(result) {
             console.log(result)
           }
         });

      });

    }
  });
});
