$(document).ready(() => {
  $(".pads-container")
    .children()
    .each(function () {
      $(this).on("click", function () {
        const audio = $(this).children(".clip")[0];
        $("#display").text($(audio).data("identifier"));
        audio.currentTime = 0;
        audio.play();
      });
    });

  $(document).on("keydown", function () {
    const audio = $(".pads-container").find("#" + event.key.toUpperCase())[0];
    if (audio) {
        $("#display").text($(audio).data("identifier"));
      audio.currentTime = 0;
      audio.play();
    }
  });
});
