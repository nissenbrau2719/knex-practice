require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const columns = ['id', 'name', 'price', 'date_added', 'checked', 'category'];

// Get all items that contain text
// Write a functtion that takes one parameter for searchTerm which will be any string
// The function will query the shopping_list table using Knex methods and select the 
// rows which have a name that contains the searchTerm using a case insensitive match.
function searchByItemName(searchTerm) {
  knexInstance
    .select(...columns)
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    });
}

// searchByItemName('steak');

// Get all items paginated
// Write a function that takes one parameter for pageNumber which will be a number
// The function will query the shopping_list table using Knex methods and select the
// pageNumber page of rows paginated to 6 items per page.
function getAllFromPage(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber -1);
  knexInstance
    .select(...columns)
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    });
}

// getAllFromPage(2)

// Get all items added after date
// Write a function that takes one parameter for daysAgo which will be a number
// representing a number of days.
// This function will query the shopping_list table using Knex methods and select
// the rows which have a date_added that is greater than the daysAgo.
function getItemsAddedWithin(daysAgo) {
  knexInstance
    .select(...columns)
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    });
}

// getItemsAddedWithin(2);

// Get the total cost for each category
// Write a function that takes no parameters
// The function will query the shopping_list table using Knex methods and select
// the rows grouped by their category and showing the total price for each category.
function getTotalCostPerCategory() {
  knexInstance
    .select('category')
    .sum('price AS total_cost')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result)
    });
}

// getTotalCostPerCategory();