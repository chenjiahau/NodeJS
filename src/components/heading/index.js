import "./index.scss";

class Heading {
  render(pagename) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.innerHTML = "Webpack is awesome!" + pagename;
    body.appendChild(h1);
  }
}

export default Heading;
