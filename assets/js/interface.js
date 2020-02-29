const modal = document.querySelectorAll(".modal");

$(".show_modal")[0].onclick = function() {
  modal[0].style.display = "block";
};

$(".show_modal")[1].onclick = function() {
  generateBigEdit();
  modal[1].style.display = "block";
};

$(".close_modal_window").on("click", function() {
  modal[0].style.display = "none";
  modal[1].style.display = "none";
});

function closemodal() {
  alert("Done!");
  modal[0].style.display = "none";
  modal[1].style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal[0] || event.target == modal[1]) {
    modal[0].style.display = "none";
    modal[1].style.display = "none";
  }
};
