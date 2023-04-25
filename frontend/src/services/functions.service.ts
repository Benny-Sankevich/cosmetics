import { ColorInterface } from './../models/general-models';
import { User } from '../store/users/models';

class FunctionsService {
  fixNumber(num: number): number {
    return +num.toFixed(2);
  }

  calculateTotalPriceArray(arr: Array<any>): number {
    return this.fixNumber(
      arr.reduce((sum, current) => sum + current.totalPrice, 0)
    );
  }

  findIndex(arr: Array<any>, id: string): number {
    return arr.findIndex((x) => x._id === id);
  }

  getYearsList(): Array<number> {
    const currentYear = new Date().getFullYear();
    const minYear = 2020;
    const yearOptions = [];
    for (let year = currentYear; year >= minYear; year--) {
      yearOptions.push(year);
    }
    return yearOptions;
  }

  getMonthsList(): Array<number> {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getCurrentMonth(): number {
    const date = new Date();
    return date.getMonth() + 1;
  }

  copyStoreData(storeData: any): any {
    return JSON.parse(JSON.stringify(storeData));
  }

  getUsersSearchResult(search: string, usersArray: User[]): User[] {
    return usersArray.filter(
      (s) =>
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase())
    );
  }

  getColorsSearchResult(
    search: string,
    colorsArray: Array<ColorInterface>
  ): Array<ColorInterface> {
    return colorsArray.filter((s) =>
      s.color.toLowerCase().includes(search.toLowerCase())
    );
  }

  getDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    return `${functionsService.checkNumber(date.getDate()) + date.getDate()}-${
      functionsService.checkNumber(month) + month
    }-${date.getFullYear()}`;
  };

  getTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${
      functionsService.checkNumber(date.getHours()) + date.getHours()
    }:${functionsService.checkNumber(date.getMinutes()) + date.getMinutes()}`;
  };

  checkNumber = (num: number): string => {
    return num < 10 ? '0' : '';
  };
}

export const functionsService = new FunctionsService();
