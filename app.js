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

const converToCSV = (jsonObj) => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(jsonObj);
}

const outputFile = (filename, content) => {
  fs.writeFileSync(path.join(__dirname, 'files', filename), content);
}

// Product
// const categoryList = [];
// const productList = [];
// const sellingLogList = [];

// const createCategoryListCSV = () => {
//   while (categoryList.length < 10) {
//     const categoryName = faker.commerce.product();
//     const categoryNameList = categoryList.map(category => category.name);

//     if (categoryNameList.indexOf(categoryName) === -1) {
//       categoryList.push({
//         category_id: categoryList.length + 1,
//         name: categoryName,
//         add_date: dayjs.between('2020-01-01', '2021-12-31').format('YYYY-MM-DD'),
//         update_date: null
//       });
//     }
//   }

//   outputFile('categories.csv', converToCSV(categoryList));
// }

// const createProductListCSV = () => {
//   while (productList.length < 100) {
//     const productName = faker.commerce.productName();
//     const productNameList = productList.map(product => product.name);

//     if (productNameList.indexOf(productName) === -1) {
//       const price = Math.floor(Math.random() * 1000);
//       const discountPrice = price - Math.floor(Math.random() * 100);
//       productList.push({
//         product_id: productList.length + 1,
//         name: productName,
//         category_id: Math.floor(Math.random() * 9) + 1,
//         price,
//         discount_price: discountPrice,
//         is_online: Math.floor(Math.random() * 10) % 2 === 0 ? 'y' : 'n',
//         add_date: dayjs.between('2022-01-01', '2022-12-31').format('YYYY-MM-DD'),
//         update_date: Math.floor(Math.random() * 10) % 2 === 0 ? dayjs.between('2023-01-01', '2023-12-31').format('YYYY-MM-DD') : null,
//       });
//     }
//   }

//   outputFile('products.csv', converToCSV(productList));
// }

// const createSellingLogCSV = () => {
//   while (sellingLogList.length < 1000) {
//     sellingLogList.push({
//       log_id: sellingLogList.length + 1,
//       product_id: Math.floor(Math.random() * 99) + 1,
//       count: Math.floor(Math.random() * 99) + 1,
//       is_canceled: Math.floor(Math.random() * 10) % 2 === 0 ? 'y' : 'n',
//       add_date: dayjs.between('2023-01-01', '2023-12-31').format('YYYY-MM-DD')
//     });
//   }

//   outputFile('selling-logs.csv', converToCSV(sellingLogList));
// }


// createCategoryListCSV();
// createProductListCSV();
// createSellingLogCSV();

// Photo
const userList = [];
const photoList = [];
const commentList = [];

const createUserCSV = () => {
  while (userList.length < 10) {
    const name = faker.internet.userName();
    const userNameList = userList.map(user => user.name);

    if (userNameList.indexOf(name) === -1) {
      userList.push({
        id: userList.length + 1,
        name
      });
    }
  }

  outputFile('user.csv', converToCSV(userList));
}

const createPhotoListCSV = () => {
  while (photoList.length < 10) {
    const photoUrl = faker.image.image();
    const photoUrlList = photoList.map(photo => photo.photoUrl);

    if (photoUrlList.indexOf(photoUrl) === -1) {
      photoList.push({
        id: photoList.length + 1,
        photo_url: photoUrl,
        file_size: Math.floor(Math.random() * 10000),
        user_id: Math.floor(Math.random() * 9) + 1
      });
    }
  }

  outputFile('photo.csv', converToCSV(photoList));
}

const createCommentListCSV = () => {
  while (commentList.length < 1000) {
    const commentText = faker.lorem.words(Math.floor(Math.random() * 5) + 3);
    const photoId = Math.floor(Math.random() * 9) + 1;
    const photo = photoList[photoId];

    commentList.push({
      id: commentList.length + 1,
      comment: commentText,
      photo_id: photoId,
      good: Math.floor(Math.random() * 1000),
      bad: Math.floor(Math.random() * 1000),
      user_id: photo.user_id,
    });
  }

  outputFile('comment.csv', converToCSV(commentList));
}

createUserCSV();
createPhotoListCSV();
createCommentListCSV();