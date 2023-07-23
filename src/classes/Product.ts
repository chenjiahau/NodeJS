import { IProduct } from "../interface";

class Product<T extends IProduct> {
  constructor(private data: T[]) {}
}

export default Product;
