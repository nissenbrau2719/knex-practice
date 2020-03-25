require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// Get all items that contain text
// Write a functtion that takes one parameter for searchTerm which will be any string
// The function will query the shopping_list table using Knex methods and select the 
// rows which have a name that contains the searchTerm using a case insensitive match.
function searchByItemName(searchTerm) {

}

// Get all items paginated
// Write a function that takes one parameter for pageNumber which will be a number
// The function will query the shopping_list table using Knex methods and select the
// pageNumber page of rows paginated to 6 items per page.
function getAllFromPage(pageNum) {

}

// Get all items added after date
// Write a function that takes one parameter for daysAgo which will be a number
// representing a number of days.
// This function will query the shopping_list table using Knex methods and select
// the rows which have a date_added that is greater than the daysAgo.
function getItemsAddedWithin(daysAgo) {

}

// Get the total cost for each category
// Write a function that takes no parameters
// The function will query the shopping_list table using Knex methods and select
// the rows grouped by their category and showing the total price for each category.
function getTotalCostPerCategory() {
  
}