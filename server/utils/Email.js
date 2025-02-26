import Welcome from '../email-templates/welcome.js'
import PasswordReset from '../email-templates/password-reset.js'
import PurchaseConfirmation from '../email-templates/purchase-confirmation.js'
import Postmark from 'postmark'

const client = process.env.POSTMARK_API_KEY ? new Postmark.ServerClient(process.env.POSTMARK_API_KEY) : null

const from = "bluprint Support <support@vufi.app>"
const color = '#085292'

export default {
    validate(email) {
        return email.match(/^\S+@\S+.\S+$/)
    },

    sendEmailVerification(name, email, token) {
        client.sendEmail({
            "From": from,
            "To": email,
            "Subject": Welcome.subject,
            "HtmlBody": Welcome.getHTMLBody(name, email, token, color),
            "TextBody": Welcome.getTextBody(name, email, token),
            "MessageStream": "outbound"
        })
    },

    sendPasswordReset(name, email, token) {
        client.sendEmail({
            "From": from,
            "To": email,
            "Subject": PasswordReset.subject,
            "HtmlBody": PasswordReset.getHTMLBody(name, token, color),
            "TextBody": PasswordReset.getTextBody(name, token),
            "MessageStream": "outbound"
        })
    },

    sendPurchaseConfirmation(name, email) {
        client.sendEmail({
            "From": from,
            "To": email,
            "Subject": PurchaseConfirmation.subject,
            "HtmlBody": PurchaseConfirmation.getHTMLBody(name, color),
            "TextBody": PurchaseConfirmation.getTextBody(name),
            "MessageStream": "outbound"
        })
    }
}
