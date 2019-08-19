const AgendaService = {
  getAllAgendas(knex) {
    return knex
      .select('*')
      .from('mom_agendas');
  },
  getById(knex, id) {
    return knex
      .from('mom_agendas')
      .select('*')
      .where('id', id)
      .first();
  },
  insertAgenda(knex, newAgenda) {
    return knex
      .insert(newAgenda)
      .into('mom_agendas')
      .returning('*')
      .then(row => {
        return row[0];
      });
  },
  deleteAgenda(knex, id) {
    return knex('mom_agendas')
      .where({ id })
      .delete();
  },
  updateAgenda(knex, id, newAgendaFeilds) {
    return knex('mom_agendas')
      .where({ id })
      .update(newAgendaFeilds);
  },
};

module.exports = AgendaService;
