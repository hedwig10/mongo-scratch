
$(document).on("click", "#scraperButton", function (event) {
  event.preventDefault();
  console.log("Press here")
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function (data) {
    console.log("got'em")
  })
})
