import * as dotenv from 'dotenv'
dotenv.config()

export class AppSettings {
    public static readonly Port: number = process.env.DEFAULT_SERVER_PORT || 3000;

    public static Stripe = {
        apiKey: process.env.STRIPE_SECRET_KEY,
        cancel_url: process.env.CANCEL_URL,
        success_url: process.env.SUCCESS_URL,
    }
}
