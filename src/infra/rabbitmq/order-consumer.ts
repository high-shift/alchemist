import { rabbitMQClient } from '.';

const OrderConsumer =  ():void => {
    rabbitMQClient.consumer.consume('order.ifood', (msg) => {
        console.log(msg);
    });
};

export default OrderConsumer;
