const xss = require('xss')

const AgendasService = {
  getById(db, id) {
    return db
      .from('mom_agendas AS comm')
      .select(
        'comm.id',
        'comm.title',
        'comm.date_created',
        'comm.content',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.nickname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'mom_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first()
  },

  insertAgenda(db, newAgenda) {
    return db
      .insert(newAgenda)
      .into('mom_agendas')
      .returning('*')
      .then(([agenda]) => agenda)
      .then(agenda =>
        AgendasService.getById(db, agenda.id)
      )
  },

  serializeAgenda(agenda) {
    const { user } = agenda
    return {
      id: agenda.id,
      title: xss(agenda.title),
      content: agenda.content,
      date_created: new Date(agenda.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = AgendasService
