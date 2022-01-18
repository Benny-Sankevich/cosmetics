export class ErrorsService {
  public getError(err: any): any {
    if (typeof err === 'string') {
      return err;
    }
    if (typeof err.error === 'string') {
      return err.error;
    }
    if (Array.isArray(err.error)) {
      let allErrors = '';
      for (const item of err.error) {
        allErrors += item + '<br>';
      }
      return allErrors;
    }

    if (typeof err.message === 'string') {
      return err.message;
    }
  }
}

export const errorsService = new ErrorsService();
