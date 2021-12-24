import { Notify } from 'quasar';
import { errorsService } from '../services/errors.service';
const showError = (message: any) => {
  Notify.create({
    message: errorsService.getError(message),
    color: 'red',
    position: 'top-right',
    icon: 'error',
    timeout: 5000
  });
};

const showInfo = (message: string) => {
  Notify.create({
    message: message,
    type: 'positive',
    position: 'top-right',
    color: 'green',
    icon: 'info',
    timeout: 2000
  });
};

const showWarning = (message: string) => {
  Notify.create({
    message: message,
    color: 'orange',
    position: 'top-right',
    icon: 'warning',
    timeout: 5000
  });
};

export { showError, showInfo, showWarning };
