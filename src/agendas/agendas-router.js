const express = require('express')
const AgendasService = require('./agendas-service')
const { requireAuth } = require('../middleware/jwt-auth')
const agendasRouter = express.Router()

agendasRouter
  .route('/')
  .get((req, res, next) => {
    AgendasService.getAllAgendas(req.app.get('db'))
      .then(agendas => {
        res.json(AgendasService.serializeAgendas(agendas))
      })
      .catch(next)
  })

agendasRouter
  .route('/:agenda_id')
  .all(requireAuth)
  .all(checkAgendaExists)
  .get((req, res) => {
    res.json(AgendasService.serializeAgenda(res.agenda))
  })

// agendasRouter.route('/:agenda_id/reviews/')
//   .all(requireAuth)  
//   .all(checkAgendaExists)
//   .get((req, res, next) => {
//     AgendasService.getReviewsForAgenda(
//       req.app.get('db'),
//       req.params.agenda_id
//     )
//       .then(reviews => {
//         res.json(AgendasService.serializeAgendaReviews(reviews))
//       })
//       .catch(next)
//   })

/* async/await syntax for promises */
async function checkAgendaExists(req, res, next) {
  try {
    const agenda = await AgendasService.getById(
      req.app.get('db'),
      req.params.agenda_id
    )

    if (!agenda)
      return res.status(404).json({
        error: `Agenda doesn't exist`
      })

    res.agenda = agenda
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = agendasRouter
