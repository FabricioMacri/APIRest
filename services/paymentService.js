const axios = require("axios");

class PaymentService {
  async createPayment(req) {
    console.log(req.body.total);
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_1177595471@testuser.com",
      items: [
        {
          title: "Elemento 1",
          description: "Descripcion del elemento 1",
          picture_url: "https://drive.google.com/file/d/1PLSph6gfKNwwkKwxnpbCf_rVAW8-CBJ7/view?usp=drive_link",
          category_id: "Categoria 1",
          quantity: 1,
          unit_price: parseInt(req.body.total)
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }
}

module.exports = PaymentService;