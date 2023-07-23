import { IProduct } from "./interface";
import Operation from "./classes/Operation";

fetch("  http://localhost:3000/product")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
