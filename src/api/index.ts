import { AuthServices } from './auth-services';
import { CommonServices } from './common-services';

export class ApiServices {

    auth = new AuthServices();

    common = new CommonServices();
}
