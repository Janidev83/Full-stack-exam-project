
const orderValidator = (order) => {
   let errorMessage = '';
   if(!order.deliveryAddress || !order.paidAmount) {
    errorMessage = 'Body must contain delivery address and paid amount!';
   }
   return errorMessage;
}

module.exports = {
   orderValidator
};