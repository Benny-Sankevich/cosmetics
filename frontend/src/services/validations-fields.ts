import { apiService, i18n } from '../core/Export';

const capitalLetterReg = /^[A-Zא-ת].*$/;
const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const phoneReg = /^\d{10}$/;

export const nameRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => val.length > 2 || i18n.global.t('msgMustBeMinimum3chars'),
  (val) => val.length < 21 || i18n.global.t('msgCantExceed20Chars'),
  (val) =>
    capitalLetterReg.test(val) ||
    i18n.global.t('msgMustStartWithCapitalLetter'),
];
export const phoneNumberRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => phoneReg.test(val) || i18n.global.t('msgMustBe10Digits'),
];
export const emailRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => emailReg.test(val) || i18n.global.t('msgShouldBeEmailSyntax'),
];
export const emailRegisterRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => emailReg.test(val) || i18n.global.t('msgShouldBeEmailSyntax'),
  async (val) =>
    (await apiService.checkEmailNotExist(val)) ||
    i18n.global.t('msgEmailExists'),
];
export const priceRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => (val && val >= 0) || i18n.global.t('msgCantBeNegative'),
];

export const passwordRules = [
  (val) => !!val || i18n.global.t('msgRequired'),
  (val) => val.length > 7 || i18n.global.t('msgMustBeMinimum8Digits'),
  (val) => val.length < 5001 || i18n.global.t('msgCantExceed5000Chars'),
];
export const requiredRules = [
  (val) => val !== null || i18n.global.t('msgRequired'),
];
