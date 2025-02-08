export default {
    subject: 'Welcome to VuFi!',

    getHTMLBody(name, email, token) {
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank you for your purchase!</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
                    </style>
                </head>
                <body style="margin: 0; padding: 0; background-color: #e6e6e6; font-family: 'Roboto', Arial, sans-serif; color: #333;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e6e6e6; padding: 2rem 0;">
                        <tr>
                            <td align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: .5rem; overflow: hidden; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);">
                                    <tr style="box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);">
                                        <td style="padding: .5rem 1rem; text-align: left; font-size: 2rem; font-weight: 300; font-family: 'Roboto', Arial, sans-serif;">
                                            <span style="display: inline-block; vertical-align: middle;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="-20 0 540 500" xml:space="preserve">
                                                    <g transform="matrix(1.1260498114 0 0 1.1260497986 249.1473007277 251.0816884163)" id="e8hgDyjwIKMcUgWZ-pPu9">
                                                        <path style="stroke: #83af50; stroke-width: 3px; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform="translate(0, 0)" d="M -216.8175 -129.70275 C -150.45249 -129.70275 -173.83107 128.21579999999997 -92.38311 129.7241 C -19.41991 131.07527 -36.46667 -129.62418 32.05127999999999 -129.70275 C 100.56922999999999 -129.78131000000002 75.03770999999999 7.929869999999994 128.5822 9.438169999999985 C 182.12669 10.946469999999985 155.73152 -131.96519 216.81749000000002 -129.70275" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span style="display: inline-block; vertical-align: middle; font-size: 1.5rem; font-weight: 300;">VuFi</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 2rem; font-size: 1rem; line-height: 1.5; font-weight: 300; font-family: 'Roboto', Arial, sans-serif;">
                                            <p style="margin: 0 0 1rem;">Hello ${name},</p>
                                            <p style="margin: 0 0 1rem;">
                                                Welcome to VuFi! My name is Chris, the creator of the app. I'm so happy that you decided to give my app a try! Before you get started using VuFi, you'll have to verify your email address with the button below:
                                            </p>
                                            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 2rem auto;">
                                                <tr>
                                                    <td align="center" style="border-radius: .5rem;">
                                                        <a href="${process.env.VUFI_CLIENT}/verify-email?t=${token}&e=${email}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: .5rem 1rem; border-radius: .5rem; background-color: #83af50; font-family: 'Roboto', Arial, sans-serif; letter-spacing: 1.25px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);">
                                                            VERIFY EMAIL
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="margin: 0 0 1rem;">If you have any questions, feel free to reply to this email; it literally goes to my iPhone.</p>
                                            <p style="margin: 0;">Thanks,<br>Chris</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `
    },

    getTextBody(name, email, token) {
        return `
            Hello ${name},\n
            Welcome to VuFi! My name is Chris, the creator of the app. I'm so happy that you decided to give my app a try! Before you get started using VuFi, you'll have to verify your email address with the link below:\n
            \n
            ${process.env.VUFI_CLIENT}/verify-email?t=${token}&e=${email}\n
            \n
            Thanks,\n
            Chris
        `
    }
}
