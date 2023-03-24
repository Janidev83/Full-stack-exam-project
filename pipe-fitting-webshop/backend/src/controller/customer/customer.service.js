const customerDataHandler = require('./customer.repository');
const { customerValidator } = require('../../utils/validators');
const { isRegistered } = require('../../utils/exam.customers');

const customerService = {};

customerService.update = async (req, res) => {
    const customerError = customerValidator(req.body);
    const isDbContains = isRegistered(req.body);
    if(customerError) {
        // hibakezelés - valamelyik mezője hiányzik a frissítendő customernek
        return
    }
    if(isDbContains) {
        // hibakezelés - nem tartalmazza az adatbázis
        return
    }
    try {
        await customerDataHandler.updateCustomer(req.body);
        res.status(200).json({confirm: 'Customer updated!'});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Szerver oldali hiba!'});
    }
}

module.exports = customerService;