import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import { faker } from '@faker-js/faker';
import { Parser } from 'json2csv';

dayjs.extend(dayjsRandom);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoryList = [];
const productList = [];
const sellingLogList = [];

const converToCSV = (jsonObj) => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(jsonObj);
}

const outputFile = (filename, content) => {
  fs.writeFileSync(path.join(__dirname, 'files', filename), content);
}

const createCategoryListCSV = () => {
  while (categoryList.length < 10) {
    const categoryName = faker.commerce.product();
    const categoryNameList = categoryList.map(category => category.name);

    if (categoryNameList.indexOf(categoryName) === -1) {
      categoryList.push({
        category_id: categoryList.length + 1,
        name: categoryName,
        add_date: dayjs.between('2020-01-01', '2021-12-31').format('YYYY-MM-DD'),
        update_date: null
      });
    }
  }

  outputFile('categories.csv', converToCSV(categoryList));
}

const createProductListCSV = () => {
  while (productList.length < 100) {
    const productName = faker.commerce.productName();
    const productNameList = productList.map(product => product.name);

    if (productNameList.indexOf(productName) === -1) {
      const price = Math.floor(Math.random() * 1000);
      const discountPrice = price - Math.floor(Math.random() * 100);
      productList.push({
        product_id: productList.length + 1,
        name: productName,
        category_id: Math.floor(Math.random() * 9) + 1,
        price,
        discount_price: discountPrice,
        is_online: Math.floor(Math.random() * 10) % 2 === 0 ? 'y' : 'n',
        add_date: dayjs.between('2022-01-01', '2022-12-31').format('YYYY-MM-DD'),
        update_date: Math.floor(Math.random() * 10) % 2 === 0 ? dayjs.between('2023-01-01', '2023-12-31').format('YYYY-MM-DD') : null,
      });
    }
  }

  outputFile('products.csv', converToCSV(productList));
}

const createSellingLogCSV = () => {
  while (sellingLogList.length < 1000) {
    sellingLogList.push({
      log_id: sellingLogList.length + 1,
      product_id: Math.floor(Math.random() * 99) + 1,
      count: Math.floor(Math.random() * 99) + 1,
      is_canceled: Math.floor(Math.random() * 10) % 2 === 0 ? 'y' : 'n',
      add_date: dayjs.between('2023-01-01', '2023-12-31').format('YYYY-MM-DD')
    });
  }

  outputFile('selling-logs.csv', converToCSV(sellingLogList));
}


createCategoryListCSV();
createProductListCSV();
createSellingLogCSV();
