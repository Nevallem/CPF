/**
 * Create, validate and format CPFs
 *
 * @author Roger Lima (rogerlima@outlook.com)
 * @date 05/jan/2012
 * @update 21/feb/2015
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
 * @param {string} seed Group of nine numbers randoms
 * @return {number}
 */
function getVerifier( seed ) {
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
 * @param {boolean} format Format or not the CPF
 * @param {string|number} [region] Tax Region. If empty, random region is setted;
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
	var firstVerifier,
		seed = ( ( ( Math.random() * 9e8 ) >> 0 ) + '' );

	while ( seed.length != 9 )
		seed = "0" + seed;

	if ( typeof region !== 'undefined' && region !== '' ) {
		if ( region >= 0 && region <= 10 )
			seed = seed.substr( 0, 8 ) + ( region == 10 ? 0 : region );
		else
			throw 'CPF.generate: the "region" range need be between 0 and 10';
	}

	firstVerifier = getVerifier( seed );

	return ( format
		? seed.replace( /(\d{3})(?=\d{3})/g, '$1.' ) + '-'
		: seed
	) + firstVerifier + getVerifier( seed + firstVerifier );
};

/**
 * Validate a CPF
 *
 * @param {string} cpf CPF to validate
 * @return {boolean}
 */
CPF.validate = function( cpf ) {
	var i, sameNumbers, firstVerifier;

	if ( typeof cpf === 'undefined' )
		throw 'CPF.validate: missing "cpf" argument';
	else if ( typeof cpf !== 'string' )
		throw 'CPF.validate: "cpf" argument need be a string';

	cpf = cpf.replace( /[^\d]/g, '' ); // Removes all characters that aren't numbers
	firstVerifier = getVerifier( cpf.substr( 0, 9 ) );

	for ( i = 0, sameNumbers = 0; i < cpf.length; ( cpf[ i++ ] === cpf[ i ] ) && sameNumbers++ );

	return sameNumbers < 10
		&& cpf.length === 11
		&& cpf[ cpf.length - 2 ] == firstVerifier
		&& cpf[ cpf.length - 1 ] == getVerifier( cpf.substr( 0, 9 ) + firstVerifier );
};

window.CPF = CPF;

}( window ) );