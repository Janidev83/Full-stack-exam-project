
const orderValidator = (order) => {
   let orderError = '';
   if(!order.deliveryAddress || !order.paidAmount) {
      orderError = 'Body must contain delivery address and paid amount!';
   }
   return orderError;
}

const customerValidator = (customer) => {
   let customerError = '';
   if(!customer.lastName || !customer.firstName || !customer.address || !customer.email || !customer.password) {
      customerError = 'Body must contain lastname, firstname, address, email and password!';
   }
   return customerError;
}

module.exports = {
   orderValidator,
   customerValidator
};