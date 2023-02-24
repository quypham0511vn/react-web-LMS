
import { ApiService } from './base-service';
import { API_CONFIG } from './constants';

export class CommonServices extends ApiService {

    checkAppState = async () => this.api().post(API_CONFIG.APP_STATE);
}

