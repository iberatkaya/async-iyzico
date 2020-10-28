# AsyncIyzico

[Iyzico](https://iyzico.com) is a useful service to make payments, but its Node.js implementation does not include TypeScript types and Promises. This causes the [Callback Hell](http://callbackhell.com/) problem in JavaScript. While I was using Iyzico in a Node.js server written with TypeScript, I added TypeScript types and promisified Iyzico's callback functions. I hope it helps!

```
//Create the AsyncIyzico instance with the API information.
let asyncIyizco = new AsyncIyzico(iyzicoAPIKeyInfo);
//Make a payment with a Payment Form.
let res = await asyncIyizco.iyzipayPaymentForm(params);
//Check the result status.
if(res.status === "success") return res;
else throw "Error";
```

## Authors

👤 **Ibrahim Berat Kaya**

- Github: [@iberatkaya](https://github.com/iberatkaya)
- LinkedIn: [@linkedin.com/in/ibrahim-berat-kaya/](https://linkedin.com/in/ibrahim-berat-kaya/)

## 🤝 Contributing

Contributions are welcome!<br />Feel free to check [issues page](https://github.com/iberatkaya/iyzico-node-types/issues).
