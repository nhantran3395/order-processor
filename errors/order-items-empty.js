const ERROR_MESSAGE = 'Order items must not be empty';
const ERROR_REASON = 'LINEITEMS_EMPTY';

class OrderItemsEmptyError extends Error {
    constructor(orderNumber) {
        super(ERROR_MESSAGE);
        this.reason = ERROR_REASON;
        this.orderNumber = orderNumber;
    }
}

module.exports = OrderItemsEmptyError;