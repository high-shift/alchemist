export default {
    SECRET: process.env.SECRET || 'avocado',
    PORT: parseInt(process.env.PORT) || 7070,
    RABBITMQ_URL: process.env.RABBITMQ_URL
};
