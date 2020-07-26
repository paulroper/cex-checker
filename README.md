# CEX Checker

## About

A simple little Node stock checking app for the [CEX](https://uk.webuy.com) website. Useful if there's a rare game you're after!

## Usage

The app was developed using Node v14.6.0 but it should work fine on lower versions too as it uses TypeScript.

* Run `yarn install`

* Create a `config.json` based on the example if you want to set up your own check interval or to receive a back in stock email

* Start the app with `yarn start` along with the ID of the product you want to set up an alert for
  * E.g. `yarn start 1234567890 -c ./config.json`

* Leave the app running, the default check interval is 20 minutes and a sound effect'll play once the product is back in stock

## Acknowledgements
* [Andy Rhode](https://www.freesound.org/people/rhodesmas/) for the success sound effect
