import car from "./img/car.jpg";
import imgText from "./img-text.txt";

function addImage() {
  const img = document.createElement("img");
  img.alt = imgText;
  img.width = 300;
  img.src = car;

  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;
