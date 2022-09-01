
import hostnames from '@core/constants/hostnames.json';

export abstract class ApiHandlerService {

  getHostName = (_window: any): string => _window?.location?.hostname;

  getURL = (key: string): string => {
    if (hostnames.ROUTES.hasOwnProperty(key) === true) {
      let hostname: string = this.getHostName(window);
      return hostnames.HOSTNAMES[hostname] + hostnames.ROUTES[key];
    }
    else {
      return hostnames.localJSON.BASE + hostnames.localJSON[key];
    }
  };

}
