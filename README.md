# [backand-card-seed](https://github.com/backand/angular-cart-seed/)

**Speed up your [AngularJS](http://angularjs.org) development for e-commence apps**

### What I get ###

Example app (starter) for e-commence app with the following functionality:

* Example for cart (client)
* Show items for cart included images
* Bootstrap UI infrastructure
* Sign in and Sign up to Backand
* Sign up includes a use of captcha
* Connect to Back& with CRUD (Create, Read, Update and Delete)
* Checkout process using Stripe in the server side
* Client checkout using PayPal
* Admin section that allow adding new Items (coming next: Show grid, select, add and delete)


### Getting started

Install **node.js**. Then **gulp** and **bower** if you haven't yet.

    $ npm -g install gulp bower

After that, install backand-card-seed

    $ git clone https://github.com/backand/angular-cart-seed.git
    $ cd angular-cart-seed
    
Install bower and npm dependencies, and run the application in development mode.

    $ npm install
    $ bower install
    $ gulp serve

You are now ready to go, your application is available at **http://127.0.0.1:3000**.

**Every file you add, edit or delete into the `/client` folder will be handled by the build system**.

When you are ready to build a production release there is a task for that:

    $ gulp serve:dist

### Contributing

PR and issues reporting are always welcome :)

### License

See LICENSE file
