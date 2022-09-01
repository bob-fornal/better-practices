
import hostnames from '@core/constants/hostnames.json';

export abstract class ApiHandlerService {

  hostnames: any = hostnames;
  
  getHostName = (_window: any): string => _window?.location?.hostname;

  getURL = (key: string): string => {
    if (this.hostnames.online.hasOwnProperty(key) === true) {
      let hostname: string = this.getHostName(window);
      return this.hostnames.HOSTNAMES[hostname] + this.hostnames.online[key];
    }
    else {
      return this.hostnames.offline.BASE + this.hostnames.offline[key];
    }
  };

}
