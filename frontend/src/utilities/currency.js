import Store from './store'

export default {
    convert(value, fromCurrency) {
        return parseFloat(value) * Store.currencyRates[Store.currency] / Store.currencyRates[fromCurrency]
    },

    format(value) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: Store.currency,
            minimumFractionDigits: Store.currency == 'BTC' ? 8 : 2
        })
        return formatter.format(value);
    }
}
