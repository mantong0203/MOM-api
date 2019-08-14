const express = require('express');
const path = require('path');
const AgendasService = require('./agendas-service');
const { requireAuth } = require('../middleware/jwt-auth');
const agendasRouter = express.Router();
const jsonBodyParser = express.json();

agendasRouter
  .route('/')
  .get((req, res, next) => {
    AgendasService.getAllAgendas(req.app.get('db'))
      .then(agendas => {
        res.json(AgendasService.serializeAgendas(agendas));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, content} = req.body;
    const newAgenda = { title, content};

    for (const [key, value] of Object.entries(newAgenda))
      if (value === null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        }); 
    newAgenda.user_id = req.user.id;    
    
    AgendasService.insertAgenda(
      req.app.get('db'),
      newAgenda
    )
      .then(agenda => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${agenda.id}`))
          .json(AgendasService.serializeAgenda(agenda));
      })
      .catch(next);
  });

// agendasRouter
//   .route('/:agenda_id')
//   .all(requireAuth)
//   //.all(checkAgendaExists)
//   .get((req, res) => {
//     res.json(AgendasService.serializeAgenda(res.agenda));
//   });

/* async/await syntax for promises */
// async function checkAgendaExists(req, res, next) {
//   try {
//     const agenda = await AgendasService.getById(
//       req.app.get('db'),
//       req.params.agenda_id
//     )

//     if (!agenda)
//       return res.status(404).json({
//         error: `Agenda doesn't exist`
//       })

//     res.agenda = agenda
//     next()
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = agendasRouter;
