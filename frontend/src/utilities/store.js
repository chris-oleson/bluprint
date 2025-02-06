import { reactive, watch } from 'vue'
import Currency from './currency'
import HTTP from './http'

const defaultState = {
    name: '',
    isLoggedIn: false,
    subscriptionStatus: 'Free',
    allowEmails: false,
    reauthenticate: false,
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

    incomeData: [
        {
            name: 'Salary',
            value: 60000,
            currency: 'USD'
        },
        {
            name: 'Side Business',
            value: 10000,
            currency: 'USD'
        },
    ],
    expenseData: [
        {
            name: 'Federal Income Tax',
            value: 12300,
            currency: 'USD'
        },
        {
            name: 'State Income Tax',
            value: 900,
            currency: 'USD'
        },
        {
            name: 'Rent',
            value: 2000,
            currency: 'USD'
        },
        {
            name: 'Utilities',
            value: 100,
            currency: 'USD'
        },
        {
            name: 'Groceries',
            value: 500,
            currency: 'USD'
        },
        {
            name: 'Ammo',
            value: 500,
            currency: 'USD'
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
