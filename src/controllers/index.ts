
/** Services */
import utils from '../utils';
import repository from '../repository';
import schema from '../schema';

/** Controllers */
import MainController from './main-controller';
import UserController from './user-controller';

/** Singletons */
const mainController = new MainController();
const userController = new UserController(
    schema.userSchema,
    repository.userRepository,
    utils.encrypter,
    utils.token
);

export {
    mainController,
    userController
};
