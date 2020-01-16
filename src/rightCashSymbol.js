import getSymbolFromCurrency from 'currency-symbol-map';
import numeral from 'numeral';

export const rightCashSymbol = (typeCurrecy, currency) =>
  `${getSymbolFromCurrency(typeCurrecy)} ${numeral(currency).format('0,00')}`;
