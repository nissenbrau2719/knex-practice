const ShoppingListService = {
  // get all items
  getAllItems(knex) {
    return knex.select('*').from('shopping_list')
  },
  // get item by id
  getById(knex, id) {
    return knex('shopping_list')
      .select('*')
      .where({ id })
      .first()
  },

  // insert item
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0])
  },

  // update item
  updateItem(knex, id, updatedItemFields) {
    return knex('shopping_list')
      .where({ id })
      .update(updatedItemFields)
  },

  // delete item
  deleteItem(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete()
  },
}

module.exports = ShoppingListService;