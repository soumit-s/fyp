import { de, faker } from '@faker-js/faker';

// Function to generate a single product data
const generateData1 = () => {
  // Generate a random rating between 1 and 5 with 1 decimal place
  const rating = (Math.floor((Math.random() * 4 + 1) * 10) / 10).toFixed(1);
  const specs = Array.from({ length: 10 }, () => faker.commerce.productDescription()).join(' ');
  const price = faker.commerce.price({ min: 100, max: 1000, dec: 2 }); 
  
  return {
    // id: faker.datatype.uuid(),  // Correct method for generating UUID
    imgUrl:  ['/demo.jpg' ,'/demo1.jpg' , '/demo2.jpg' ] ,   // Array.from({ length: 3 }, () => faker.image.url()),  // Array of 3 image URLs
    name: faker.commerce.productName(),
    rating: rating,  // Rating is a string with one decimal place
    specs:specs,  // Product specifications`
	price: price,  // Price is a string with two decimal places
  };
};

const generateData2 = () => {
  const duration = Math.ceil(Math.random()*(50-0)+0 ); 
  return{
    name : faker.commerce.productName(),
    price : faker.commerce.price({ min: 100, max: 1000 }),
    imgUrl : '/demo1.jpg', // Array of 3 image URLs, 
    duration : duration.toString()  ,
    rating: faker.number.int({ min: 0, max: 10 }) / 2,
    numRatings: faker.number.int({ min: 0, max: 100 })
  }
}

const generateData2Array = ()=>{
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push(generateData2());
  }
  return data;
}
// Generate and export obj1 (an array of 10 objects)
const obj1 = generateData1();
const similarItem = generateData2Array() ; 



export default {obj1 , similarItem } ;
