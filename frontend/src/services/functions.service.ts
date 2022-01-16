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
    for (let i = currentYear; i >= minYear; i--) {
      yearOptions.push(i);
    }
    return yearOptions;
  }
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  copyStoreData(storeData: any): any {
    return JSON.parse(JSON.stringify(storeData));
  }
}
export const functionsService = new FunctionsService();
