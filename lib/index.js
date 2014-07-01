/**
*
*	STREAM: read
*
*
*	DESCRIPTION:
*		- Thin wrapper around graceful-fs file read stream to provide a consistent API with flow streams.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/05/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] graceful-fs
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Drop-in replacement for filesystem module:
		fs = require( 'graceful-fs' );
		

	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {stream} Stream instance
	*/
	function Stream() {
		this._path = null;
		return this;
	} // end FUNCTION stream()

	/**
	* METHOD: path( path )
	*	Setter and getter for the file path. If a path is provided, sets the file path. If no path is provided, returns the file path.
	*
	* @param {string} path - file path
	* @returns {object|string} instance object or file path
	*/
	Stream.prototype.path = function( path ) {
		if ( !arguments.length ) {
			return this._path;
		}
		if ( typeof path !== 'string' ) {
			throw new Error( 'path()::invalid input argument. Input argument must be a string.' );
		}
		if ( !fs.existsSync( path ) ) {
			throw new Error( 'path()::invalid input argument. File does not exist.' );
		}
		this._path = path;
		return this;
	}; // end METHOD path()

	/**
	* METHOD: stream( clbk )
	*	Returns a readable stream which reads from a file.
	*
	* @param {function} clbk - (optional) callback to invoke after finishing reading a file. Function should take one input argument: [ error ]. If no errors, error is null.
	* @returns {stream} readable stream
	*/
	Stream.prototype.stream = function( clbk ) {
		if ( !this._path ) {
			throw new Error( 'stream()::stream not initialized. Must set a file path before generating the read stream.' );
		}
		var stream = fs.createReadStream( this._path );
		stream.on( 'error', function onError( error ) {
			if ( clbk ) {
				clbk( error );
				return;
			}
			console.error( error.stack );
		});
		stream.on( 'close', function onEnd() {
			if ( clbk ) {
				clbk();
			}
		});
		return stream;
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();