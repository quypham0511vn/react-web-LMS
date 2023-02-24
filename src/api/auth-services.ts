import { ApiService } from './base-service';
import { API_CONFIG } from './constants';

export class AuthServices extends ApiService {
    loginPhone = async (phone: string, password: string) =>
        this.api().post(
            API_CONFIG.LOGIN,
            this.buildFormData({
                phone,
                password
            })
        );
}
