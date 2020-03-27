const ShoppingListService = require('../src/shopping-list-service');
const pg = require('pg');
pg.types.setTypeParser(1700, 'text', parseFloat);
const knex = require('knex');

// describe test suite
describe(`Shopping list service object`, function() {
  let db
  
  // prepare mock data to insert into test table
  let testItems = [
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
        .insert(testItems)
        .into('shopping_list')
    });

    // get all items
    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
          return ShoppingListService.getAllItems(db)
            .then(actual => {
              expect(actual).to.eql(testItems);
            });
    });
    
    // get an item by id
    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const thirdId = 3
      const thirdTestItem = testItems[thirdId - 1]
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            checked: thirdTestItem.checked,
            date_added: thirdTestItem.date_added,
            category: thirdTestItem.category
          })
        })
    })
    
    // delete an item
    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const itemId = 3
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test items array without the removed item
          const expected = testItems.filter(item => item.id !== itemId)
          expect(allItems).to.eql(expected)
        })
    })
      
    // update an item
    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3
      const itemToUpdate = testItems[idOfItemToUpdate -1]
      const newItemData = {
        name: 'dozen eggs',
        price: 2.00, 
        category: 'Breakfast', 
        checked: true,
        date_added: new Date('1919-12-22T16:28:32.615Z') 
        }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData
          })
        })
    })
  })

  // write tests for context: given table has no data
  context(`Given 'shopping_list' has no data`, () => {

    // get empty array of data
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        })
    })

    // insert a new row of data
    it(`insertItem() inserts a new item and resolvees the new item with an 'id'`, () => {
      const newItem = {
        name: 'box of golden grahams',
        price: 3999.99, 
        category: 'Breakfast', 
        checked: false,
        date_added: new Date('1919-12-22T16:28:32.615Z') 
      }

      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            ...newItem
          })
        })
    })
  })

})
  