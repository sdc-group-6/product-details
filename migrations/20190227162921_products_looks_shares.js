
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', (table) => {
      table.string('id', 15).primary();
      table.string('type', 8);
      table.string('name', 40);
      table.string('img_url', 100);
      table.string('short_desc', 100);
      table.string('long_desc', 600);
      table.string('category', 15);
      table.integer('price');
      table.decimal('rating', 3, 1);
      table.integer('review_count');
      table.string('details', 200);
    }),
    knex.schema.createTable('looks', (table) => {
      table.string('shoe_id', 15).references('id').inTable('products');
      table.string('shirt_id', 15).references('id').inTable('products');
      table.string('pant_id', 15).references('id').inTable('products');
      table.string('jacket_id', 15).references('id').inTable('products');
    }),
    knex.schema.createTable('shares', (table) => {
      table.string('user', 40);
      table.string('img', 100);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('looks'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('shares')
  ]);
};

/*
CLI Commands (after creating empty databases):
knex migrate:latest (this uses dev)
knex migrate:latest --env test

knex migrate:rollback
knex migrate:rollback --env test
*/
