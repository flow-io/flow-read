flow-read
=========

Thin wrapper for [graceful-fs](https://github.com/isaacs/node-graceful-fs) file read stream.


## Installation

``` bash
$ npm install flow-read
```

## API

To create a readStream factory,

``` javascript
var readStream = flow.read();
```

### readStream.path( [filepath] )

This method is a setter/getter. If no `filepath` is provided, returns the `filepath`. You configure the stream factory by specifying a `filepath`:

``` javascript
readStream.path( 'path/to/file' );
```

### readStream.stream( [clbk] )

Provided a `filepath` has been specified, to create a new readStream:

``` javascript
var stream = readStream.stream( clbk );
```

Where the optional `clbk` is invoked upon stream `end` and has an `error` as its first argument. If no read errors, `error` is `null`.


## Usage

Methods are chainable:

``` javascript
flow.read()
	.path( 'path/to/file' )
	.stream( clbk )
	.pipe( process.stdout );
``` 


## Examples

``` javascript
// File read stream generator:
var readStream = require( 'flow-read' );

// Create a new stream, passing along an optional error handler:
var stream = readStream()
	.path( __dirname + '/path/to/file.json' )
	.stream( onError );

// Pipe the stream:
stream.pipe( process.stdout );

// Error handler:
function onError( error ) {
	if ( error ) {
		console.error( error.stack );
		throw new Error( 'Error!!!' );
	}
	console.log( 'Finished!' );
}
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

