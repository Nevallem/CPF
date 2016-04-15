/**
 * Create, validate and format CPFs
 *
 * @author Roger Lima (rogerlima@outlook.com)
 * @date 21/feb/2015
 * @update 15/apr/2016
 */
/* jshint laxbreak: true, bitwise: false */

( function( window ) {
'use strict';

/**
 * @object CPF
*/
var CPF = {};

/**
 * Gets the verifier of a given set of numbers
 *
 * @param {string} Group of nine random numbers
 * @return {number}
 */
function get_verifier( seed ) {
	for ( var i = 0, verifier = 0; i < seed.length; verifier += seed[ i ] * ( seed.length - i++ + 1 ) );

	return ( verifier % 11 ) < 2 ? 0 : 11 - ( verifier % 11 );
}

/**
 * Format a CPF
 *
 * @param {string} cpf CPF to format
 */
CPF.format = function( cpf ) {
	if ( typeof cpf !== 'string' )
		throw 'CPF.validate: "cpf" argument need be a string';

	return cpf.replace( /[^\d]/, '' ).substr( 0, 11 )
		.replace( /(\d{3})(?=\d{3})/g, '$1.' )
		.replace( /(\d{2})$/, "-$1" );
};


/**
 * Create a valid CPF
 *
 * @param {boolean} Format or not the CPF
 * @param [{string|number}] Tax Region. If empty, random region is setted;
 * Tax region possibly values
	1 (Centro-Oeste, Tocantins)
	2 (Norte -Tocantins)
	3 (Maranhão, Piauí, Ceará)
	4 (Rio Grande do Norte, Pernambuco, Paraíba)
	5 (Bahia, Sergipe)
	6 (Minas Gerais)
	7 (Rio de Janeiro, Espírito Santo)
	8 (São Paulo)
	9 (Paraná, Santa Catarina)
	0 or 10 (Rio Grande do Sul)
 *
 * @return {string}
 */
CPF.generate = function( format, region ) {
	var first_verifier,
		seed = ( ( ( Math.random() * 9e8 ) >> 0 ) + '' );

	while ( seed.length != 9 )
		seed = "0" + seed;

	if ( typeof region !== 'undefined' && region !== '' ) {
		if ( region >= 0 && region <= 10 )
			seed = seed.substr( 0, 8 ) + ( region == 10 ? 0 : region );
		else
			throw 'CPF.generate: the "region" range need be between 0 and 10';
	}

	first_verifier = get_verifier( seed );

	return ( format
		? seed.replace( /(\d{3})(?=\d{3})/g, '$1.' ) + '-'
		: seed
	) + first_verifier + get_verifier( seed + first_verifier );
};

/**
 * Validate a CPF
 *
 * @param {string} CPF to validate
 * @return {boolean}
 */
CPF.validate = function( cpf ) {
	var i, same_numbers, first_verifier;

	if ( typeof cpf === 'undefined' )
		throw 'CPF.validate: missing "cpf" argument';
	else if ( typeof cpf !== 'string' )
		throw 'CPF.validate: "cpf" argument need be a string';

	cpf = cpf.replace( /[^\d]/g, '' );
	first_verifier = get_verifier( cpf.substr( 0, 9 ) );

	// Prevents false positive (111.111.111-11, ...)
	for ( i = 0, same_numbers = 0; i < cpf.length; ( cpf[ i++ ] === cpf[ i ] ) && same_numbers++ );

	return same_numbers < 10
		&& cpf.length === 11
		&& cpf[ cpf.length - 2 ] == first_verifier
		&& cpf[ cpf.length - 1 ] == get_verifier( cpf.substr( 0, 9 ) + first_verifier );
};

window.CPF = CPF;

}( window ) );