# Admin

This admin panel was custom built for the customer support team so they could perform actions that previously required developer involvement. The product itself no longer exists and this project is out of date.

Local url:
```
http://localhost:7000/webpack-dev-server/
```

#### Generator:
https://github.com/react-webpack-generators/generator-react-webpack#readme

#### Starting Bootstrap Template:
https://startbootstrap.com/template-overviews/sb-admin-2/

This has been heavily modified as the template doesn't handle navigation through pages. Used purely for design inspiration and quick set up of general site structure.

#### React Bootstrap:
https://react-bootstrap.github.io/components.html

#### Bootstrap dist:
http://getbootstrap.com/css/

#### Development
To run dev:
```
npm run start
```

To create a new component in /components:
```
yo react-webpack:component namename
```
This will:
```
create src/styles/Namename.css
create src/components/NamenameComponent.js
create test/components/NamenameComponentTest.js
```
This generator isn't great and I don't like how it adds "Component" to the end of each component name. I manually change the names and when I have time, I'll consider moving away from it. It set up all the webpack stuff for me though which was helpful.

Moment-Timezone needs a JSON loader to work with webpack (Both solutions from this stack overflow question are implemented but the second answer is the one that worked)
https://stackoverflow.com/questions/29548386/how-should-i-use-moment-timezone-with-webpack

##### For local development
Have API running and add it.only to
test/integration/api-service/bookings-test.js
```
it.only('should succeed (paid meeting, pay with credits) [LIVE test: Apple IAP API]', () => {
```
This will create a test user with
```
userId: 1
email: fan@example.com
password: validpassword
```
And populate the database with a booking, a social profile and some credit transactions

Then in terminal window that is in API folder (only persists per terminal window session or add to bash config file)
```
export FEATURE_USER_ADMIN_USER=1
```
This will make you an admin that will allow you to actually make API calls to admin features

#### Production

To create production dist:
```
npm run dist
```
Then connect to S3 bucket and replace assets folder (app.js and app.js.map)

Docker automation coming soon

#### Future nice to haves

Analytics and charts on home screen
http://www.reactd3.org/get_start/