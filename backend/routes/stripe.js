import express from 'express'
import { Router } from 'express'
import Stripe from 'stripe'
import Email from '../utilities/email.js'
import User from '../utilities/user.js'

const stripe = process.env.STRIPE_API_KEY ? Stripe(process.env.STRIPE_API_KEY) : null
const router = Router()

// Processing a payment from stripe
router.post('/webhooks', express.raw({ type: "*/*" }), async (req, res) => {
    const signature = req.headers['stripe-signature']
    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SIGNING_SECRET)
    }
    catch(err) {
        res.status(400).send(err.message)
        return
    }

    // Handle the event
    if (event.type == 'customer.subscription.created') {
        const customerSubscriptionCreated = event.data.object
        const customer = await stripe.customers.retrieve(customerSubscriptionCreated.customer)
        const user = await User.readWithEmail(customer.email, req.database)
        Email.sendPurchaseConfirmation(user.name, user.email)
        res.sendStatus(200)
    }
    else if (event.type == 'customer.subscription.updated') {
        const customerSubscriptionUpdated = event.data.object
        const customer = await stripe.customers.retrieve(customerSubscriptionUpdated.customer)
        await User.updateSubscriptionStatus(customer.email, customerSubscriptionUpdated.status, req.database)
        res.sendStatus(200)
    }
    else {
        console.log(`Unhandled event type ${event.type}`)
    }
})

export default router
