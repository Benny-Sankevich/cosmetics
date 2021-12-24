class FunctionsService {
  fixNumber(num: number) {
    return +num.toFixed(2);
  }
  calculateTotalPriceArray(arr: Array<any>) {
    return this.fixNumber(
      arr.reduce((sum, current) => sum + current.totalPrice, 0)
    );
  }
  findIndex(arr: Array<any>, id: string) {
    return arr.findIndex((x) => x._id === id);
  }
}
export const functionsService = new FunctionsService();
