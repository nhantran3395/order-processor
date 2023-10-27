const ERROR_MESSAGE = 'Item is not valid';
const ERROR_REASON = 'ITEM_INVALID';

class ItemInvalidError extends Error {
    constructor(orderNumber, itemId) {
        super(ERROR_MESSAGE);
        this.reason = ERROR_REASON;
        this.orderNumber = orderNumber;
        this.itemId = itemId;
    }
}

module.exports = ItemInvalidError;