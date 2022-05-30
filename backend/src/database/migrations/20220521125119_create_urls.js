/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('urls', function (table){
    table.string('id').primary();
    table.string('urlOriginal').notNullable();
    table.string('urlEncurtada');
    table.date('dataHora');

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('urls');
};
