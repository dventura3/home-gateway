# Home-Gateway

Home Gateway represents a middleware between Everyday Objects and Smart-EDIFICE Platform.
Its tasks:
* save the objects basic knowledge in the database
* menage the triggers that can be of three types:
  + time dependent
  + user-location dependent
  + object-status dependent
* execute a `plan` according to the correct ordered.

## Usage

After having cloned the repository, you have to install the Node.js modules with `npm install`.
Now you can run the server through `node index.js`. The default host is `127.0.0.1` and the default port is `3301`. You can change this configuration, setting the two environment variables `HOST` and `PORT`.

## Testing

Using `npm test` you can run the tests.
