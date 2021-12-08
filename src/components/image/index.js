import car from "../../img/car.jpg";

class Image {
  render() {
    const img = document.createElement("img");
    const body = document.querySelector("body");
    img.src = car;
    body.appendChild(img);
  }
}

export default Image;
