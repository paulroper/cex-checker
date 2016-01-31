## CEX Checker
### About
A simple little Node stock checking app for the [CEX](https://uk.webuy.com) website. Useful if there's a rare game you're after!

### Usage
* Run `npm install`
* Create a `config.json` based on the example if you want to set up your own check interval or to receive a back in stock email
* Start the app with `npm start` along with the SKU of the product you want to set up an alert for
  * E.g. `npm start 1234567890`
* Leave the app running, the default check interval is 30 seconds and a sound effect'll play once the product is back in stock

### Acknowledgements
* [Andy Rhode](https://www.freesound.org/people/rhodesmas/) for the success sound effect
