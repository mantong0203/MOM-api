const express = require('express');
const AgendasService = require('./agendas-service');
const agendasRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const xss = require('xss');
const path = require('path');
const jsonParser = express.json();

const AgendaTemp = agenda => ({
    id: agenda.id,
    title: agenda.title,
    content: xss(agenda.content),
    date_created: agenda.date_created,
    active: agenda.active,
    user_id: agenda.user_id,
    claim_user: agenda.claim_user,
})

agendasRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        AgendasService.getAllAgendas(req.app.get('db'))
            .then(agendas => {
                res.json(agendas.map(AgendaTemp))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { title, content, user_id } = req.body
        const newAgenda = { title, content, user_id }

        AgendasService.insertAgenda(knexInstance, newAgenda)
            .then(agenda => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${agenda.id}`))
                    .json(AgendaTemp(agenda))
            })
            .catch(next)
    })

agendasRouter
    .route('/:agenda_id')
    .all(checkAgendaExists)
    .get((req, res) => {
        res.send(AgendaTemp(res.agenda))
    })
    .delete((req, res, next) => {
        AgendasService.deleteAgenda(
            req.app.get('db'),
            req.params.agenda_id
        )
            .then(row => {
                res.status(204).end();
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { active, claim_user } = req.body;
        const updatedAgenda = { active, claim_user };
        AgendasService.updateAgenda(
            req.app.get('db'),
            req.params.agenda_id,
            updatedAgenda
        )
            .then(row => {
                res.status(204).end()
            })
            .catch(next)
    })


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
