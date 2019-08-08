const xss = require('xss')
const Treeize = require('treeize')

const AgendasService = {
  getAllAgendas(db) {
    return db
      .from('mom_agendas AS thg')
      .select(
        'thg.id',
        'thg.title',
        'thg.date_created',
        'thg.content',
        
        ...userFields,
      )
      .leftJoin(
        'mom_users AS usr',
        'thg.user_id',
        'usr.id',
      )
      .groupBy('thg.id', 'usr.id')
  },

  getById(db, id) {
    return AgendasService.getAllAgendas(db)
      .where('thg.id', id)
      .first()
  },


  serializeAgendas(agendas) {
    return agendas.map(this.serializeAgenda)
  },

  serializeAgenda(agenda) {
    const agendaTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const agendaData = agendaTree.grow([ agenda ]).getData()[0]

    return {
      id: agendaData.id,
      title: xss(agendaData.title),
      content: xss(agendaData.content),
      date_created: agendaData.date_created,
      user: agendaData.user || {},
      //number_of_reviews: Number(agendaData.number_of_reviews) || 0,
      //average_review_rating: Math.round(agendaData.average_review_rating) || 0,
    }
  },

}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = AgendasService
