import { Dialog } from 'quasar';
import { i18n } from '../core/Export';

const areYouSureDialog = () => {
  return Dialog.create({
    title: `${i18n.global.t('confirm')}`,
    message: `${i18n.global.t('msgAreYouSure?')}`,
    color: 'negative',
    ok: `${i18n.global.t('msgYesImSure')}`,
    cancel: true,
    focus: 'cancel',
  });
};
export { areYouSureDialog };
