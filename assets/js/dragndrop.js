var dataTV = document.querySelector(".data_tv");
var littleClone = document.querySelector(".little_clone");

dataTV.onmousedown = function(event) {
  let shiftX = event.clientX - dataTV.getBoundingClientRect().left;
  let shiftY = event.clientY - dataTV.getBoundingClientRect().top;

  littleClone.innerHTML = "Drop here to clone!";
  dataTV.style.position = "absolute";
  dataTV.style.zIndex = 1000;
  document.body.append(dataTV);

  function moveAt(pageX, pageY) {
    dataTV.style.left = pageX - shiftX + "px";
    dataTV.style.top = pageY - shiftY + "px";
  }

  let currentDroppable = null;

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    dataTV.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    dataTV.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest(".little_clone");

    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        littleClone.innerHTML = dataTV.innerHTML;
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);

  dataTV.onmouseup = function() {
    dataTV.style.position = "static";
    document.querySelector(".data_tv_wrapper").prepend(dataTV);

    document.removeEventListener("mousemove", onMouseMove);
    dataTV.onmouseup = null;
  };
};

dataTV.ondragstart = function() {
  return false;
};
