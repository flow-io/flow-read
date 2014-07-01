flow-read
=========

Thin wrapper for [graceful-fs]() file read stream.


## Installation

``` bash
$ npm install flow-read
```


## Examples

``` javascript
// File read stream generator:
var readStream = require( 'flow-read' );

// Create a new stream:
var stream = readStream()
	.path( __dirname + '/path/to/file.json' )
	.stream();

// Pipe the stream:
stream.pipe( process.stdout );
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

