const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

// describe test suite
describe(`Shopping list service object`, function() {
  let db
  
  // prepare mock data to insert into test table
  let listItems = [
    {
      id: 1,
      name: 'dog food',
      price: 30.00, 
      category: 'Main', 
      checked: true,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'gold bears',
      price: 1.25, 
      category: 'Snack', 
      checked: false,
      date_added: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      id: 3,
      name: 'dozen eggs',
      price: 2.00, 
      category: 'Breakfast', 
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z')
    },
  ]

  // create knex instance before and add test table connection path to .env file
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  // write before/afterEach code for tests to start with empty table and clean up test data after
  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  // write after code to disconnect from database when finished
  after(() => db.destroy());

  // write tests for context: given table has existing data
  context(`Given 'shopping_list' table contains data`, () => {
     // populate table with test data  
    beforeEach(() => {
      return db 
        .insert(listItems)
        .into('shopping_list')
    });

    // get all items
    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
          return ShoppingListService.getAllItems(db)
            .then(actual => {
              expect(actual).to.eql(listItems);
            });
    });


    
  })

   
    
    // get an item by id

    // delete an item

  // write tests for context: given table has no data

    // get empty array of data

    // insert a row of data

})
  