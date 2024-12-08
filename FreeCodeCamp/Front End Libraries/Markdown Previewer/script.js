$(document).ready(() => {
  marked.use({
    breaks: true
  });

  $("#preview").html(marked.parse($("#editor").val()));

  $("#editor").on("input", () => {
    $("#preview").html(marked.parse($("#editor").val()));
  });
});
