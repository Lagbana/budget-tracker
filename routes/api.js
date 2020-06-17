// Import dependencies
const router = require('express').Router()
const Transaction = require('../models/transaction.js')

// Route handler that creates a new single transaction document
// and saves the document object in the Transactions database
router.post('/api/transaction', ({ body }, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// Route handler that passes and creates an array of documents
// and saves the array of document objects in the Transaction database
router.post('/api/transaction/bulk', ({ body }, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// Route handler to get all transaction documents from database
// The transactions are displayed and sorted on the home page
// by date in descending order
router.get('/api/transaction', (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

module.exports = router
