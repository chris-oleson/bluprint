import { reactive, watch } from 'vue'
import Currency from './currency'
import HTTP from './http'

const defaultState = {
    name: '',
    isLoggedIn: false,
    subscriptionStatus: 'Free',
    allowEmails: false,
    theme: 'system',
    itemsPerPage: 5,
    currency: 'USD',
    privacy: false,

    notification: {
        text: '',
        color: ''
    },

    allItems: [],
    allItemHistory: [],

    currencyRates: {},
    activeTheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    showSidebar: false,

    tableData: [
        {
            id: 1,
            name: 'Apples',
            type: 'Fruit',
            quantity: 4
        },
        {
            id: 2,
            name: 'Bananas',
            type: 'Fruit',
            quantity: 23
        },
        {
            id: 7,
            name: 'Pancakes',
            type: 'Pastry',
            quantity: 14
        },
        {
            id: 4,
            name: 'Onions',
            type: 'Vegetable',
            quantity: 7
        },
    ]
}

const state = Object.assign({}, defaultState, JSON.parse(localStorage.getItem('store')))

const store = reactive({
    ...state,

    totalAssetValue() {
        let total = 0
        for (let item of this.allItems) {
            if (!item.is_deleted && !item.hidden && item.type == "asset") {
                total += Currency.convert(item.value, item.currency)
            }
        }
        return total
    },

    totalDebtValue() {
        let total = 0
        for (let item of this.allItems) {
            if (!item.is_deleted && !item.hidden && item.type == "debt") {
                total += Currency.convert(item.value, item.currency)
            }
        }
        return total
    },

    totalIncome() {
        let total = 0
        for (let income of this.incomeData) {
            total += Currency.convert(income.value, income.currency)
        }
        return total
    },

    totalExpenses() {
        let total = 0
        for (let expense of this.expenseData) {
            total += Currency.convert(expense.value, expense.currency)
        }
        return total
    },

    async logOut(router, redirect) {
        await HTTP.post('/auth/logout')
        router.push(redirect)
        this.clear()
    },

    clear() {
        Object.assign(this, defaultState)
    },

    async getAllAssetData() {
        let [
            itemResponse,
            itemHistoryResponse,
            currencyValueResponse,
        ] = await Promise.all([
            HTTP.get('/items'),
            HTTP.get('/items/history'),
            HTTP.get('/currencies/rates'),
        ])

        this.allItems = itemResponse
        this.allItemHistory = itemHistoryResponse
        this.currencyRates = currencyValueResponse
    }
})

watch(store, (newState) => { localStorage.setItem('store', JSON.stringify(newState)) }, { deep: true })

export default store
