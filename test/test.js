
// MODULES //

var // Path module:
	path = require( 'path' ),

	// Expectation library:
	chai = require( 'chai' ),

	// Stream spec:
	spec = require( 'stream-spec' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	fStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'file/read', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( fStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to get the file path', function test() {
		var stream = fStream();
		expect( stream.path ).to.be.a( 'function' );
	});

	it( 'should provide a method to set the file path', function test() {
		var stream = fStream(),
			filepath = path.resolve( __dirname, 'utils/file.txt' );
		stream.path( filepath );
		assert.strictEqual( stream.path(), filepath );
	});

	it( 'should not allow the path to anything other than a string', function test() {
		var stream = fStream();
		
		expect( badValue( function(){} ) ).to.throw( Error );
		expect( badValue( 5 ) ).to.throw( Error );
		expect( badValue( [] ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				stream.path( value );
			};
		}
	});

	it( 'should throw an error if the file path does not exist', function test() {
		var stream = fStream(),
			filepath = path.join( __dirname, 'file/does/not/exist.txt' );

		expect( badValue( filepath ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				stream.path( value );
			};
		}
	});

	it( 'should throw an error if a file path is not set', function test() {
		var stream = fStream();

		expect( stream.stream ).to.throw( Error );
	});

	it( 'should read a file', function test( done ){
		var filepath, rStream, s;

		// Specify the filepath:
		filepath = path.join( __dirname, 'utils/file.txt' );

		// Create a file read stream:
		rStream = fStream()
			.path( filepath )
			.stream( onError );

		// Create the stream spec:
		s = spec( rStream )
			.readable();

		// Mock reading from the stream:
		utils.readStream( rStream, onFinish );

		// Validate the stream when the stream closes:
		rStream.on( 'close', s.validate );

		return;

		/**
		* FUNCTION: onError( error )
		*	Error handler. Error should not exist.
		*/
		function onError( error ) {
			expect( error ).to.not.exist;
		} // end FUNCTION onError()

		/**
		* FUNCTION: onFinish( error, actual )
		*	Finish event handler. Checks for errors and ensures that the streamed data equals the expected data.
		*/
		function onFinish( error, actual ) {
			expect( error ).to.not.exist;
			actual = actual[ 0 ].toString();
			assert.equal( actual, '1234' );
			done();
		} // end FUNCTION onFinish()
	});

	it( 'should execute a callback when stream finishes', function test( done ) {
		var filepath, rStream;

		// Specify the filepath:
		filepath = path.join( __dirname, 'utils/file.txt' );

		// Create a file read stream:
		rStream = fStream()
			.path( filepath )
			.stream( onFinish );

		// Mock reading from the stream:
		utils.readStream( rStream, onError );

		return;

		/**
		* FUNCTION: onError( error )
		*	Error handler. Expect error to not exist.
		*/
		function onError( error ) {
			expect( error ).to.not.exist;
		} // end FUNCTION onError()

		/**
		* FUNCTION: onFinish( error )
		*	Finish event handler. Checks for errors. Confirms that callback was invoked.
		*/
		function onFinish( error ) {
			expect( error ).to.not.exist;
			assert.ok( true, 'callback invoked' );
			done();
		} // end FUNCTION onFinish()
	});

});