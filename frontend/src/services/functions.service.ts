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
  getCurrentYear(): number {
    return new Date().getFullYear();
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
}
export const functionsService = new FunctionsService();
