
const loginDataValidator = (data) => {
   let loginDataError = '';
   
   if(loginDataIsInvalid(data)) {
      loginDataError = 'Logindata must contain email and password with string value';
   }

   return loginDataError;
};

const loginDataIsInvalid = (data) => {
   return !data.email || !data.password || typeof data.email !== 'string' || typeof data.password !== 'string' ? true : false;
};

//* ------------------------------------------------------------------------------------------------------------

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
   loginDataValidator,

   orderValidator,
   customerValidator
};