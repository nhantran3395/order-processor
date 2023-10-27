const EventEmitter = require('node:events');

const stocks = require('./stock-list.json');
const { OrderItemsEmptyError, ItemInvalidError, ItemOutOfStockError } = require('./errors');

const ORDER_PROCESSING_EVENTS = {
    'processingStarted': 'PROCESSING_STARTED',
    'processingFailed': 'PROCESSING_FAILED',
    'processingSuccess': 'PROCESSING_SUCCESS'
}

class OrderProcessor extends EventEmitter {
    #stocks

    constructor() {
        super();
        this.#stocks = stocks;
    }

    placeOrder(order) {
        const { orderNumber } = order;

        this.emit(ORDER_PROCESSING_EVENTS.processingStarted, orderNumber);

        try {
            this.#process(order);
            this.emit(ORDER_PROCESSING_EVENTS.processingSuccess, orderNumber);
        } catch (error) {
            this.emit(ORDER_PROCESSING_EVENTS.processingFailed, error);
        }
    }

    #process(order) {
        const { orderNumber, lineItems } = order;

        if (!lineItems || lineItems.length === 0) {
            throw new OrderItemsEmptyError(orderNumber);
        }

        for (let item of lineItems){
            const { itemId, quantity } = item;
            const stockIdx = this.#stocks.findIndex(item => item.id === itemId);

            if (stockIdx === -1) {
                throw new ItemInvalidError(orderNumber, itemId);
            }

            const { stock } = this.#stocks[stockIdx];
            if (stock < quantity) {
                throw new ItemOutOfStockError(orderNumber, itemId);
            }
        }
    }
}

module.exports = OrderProcessor;