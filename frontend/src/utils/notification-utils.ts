import { Notify } from 'quasar';
import { errorsService } from '../services/errors.service';
const showError = (message: any): void => {
  Notify.create({
    message: errorsService.getError(message),
    color: 'negative',
    position: 'top-right',
    icon: 'warning',
    timeout: 5000,
  });
};

const showInfo = (message: string): void => {
  Notify.create({
    message: message,
    type: 'positive',
    position: 'top-right',
    color: 'green',
    icon: 'info',
    timeout: 2000,
  });
};

const showWarning = (message: string): void => {
  Notify.create({
    message: message,
    color: 'orange',
    position: 'top-right',
    icon: 'warning',
    timeout: 5000,
  });
};

export { showError, showInfo, showWarning };
