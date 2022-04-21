require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

async function createCheckout(req, res) {
    const { line_items } = req.body;
    console.log(line_items);

    try{

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.DOMAIN_FRONT}/checkout/success`,
            cancel_url: `${process.env.DOMAIN_FRONT}/checkout/cancel`,
        });
        return res.status(200).json({ stripeURL: session.url});
    }catch (e) {
        return res.status(500).json({error: error})
    }
}
module.exports = {
    createCheckout
};
