#include "CPF.hpp"

int CPF::get_verifier( std::string seed ) {
	size_t i = 0,
		verifier = 0;

	while ( i < seed.size() )
		verifier += atoi( std::string( 1, seed[ i ] ).c_str() ) * ( seed.size() - i++ + 1 );

	return ( verifier % 11 ) < 2 ? 0 : 11 - ( verifier % 11 );
};

std::string CPF::format( std::string cpf ) {
	return std::regex_replace(
		std::regex_replace( 	
			std::regex_replace( 
				cpf, 
				std::regex::basic_regex( "[^\\d]" ), "" ).substr( 0, 11 ), 
			std::regex::basic_regex( "(\\d{3})(?=\\d{3})" ), "$1." 
		),
		std::regex::basic_regex( "(\\d{2})$" ), "-$1" 
	);
};

std::string CPF::generate( bool format, int region ) {
	std::random_device rd;
	std::uniform_real_distribution< double > randomize( 0, 1 );

	std::string seed = std::to_string( long ( ( randomize( rd ) * 9e8 ) ) );

	while ( seed.size() != 9 )
		seed = "0" + seed;

	if ( region >= 0 && region <= 10 )
		seed = seed.substr( 0, 8 ) + ( region == 10 ? "0" : std::to_string( region ) );

	std::string first_verifier = std::to_string( get_verifier( seed ) );

	return ( format
		? std::regex_replace( seed, std::regex::basic_regex( "(\\d{3})(?=\\d{3})" ), "$1." ) + "-"
		: seed
	) + first_verifier + std::to_string( get_verifier( seed + first_verifier ) );
};

bool CPF::validate( std::string cpf ) {
	size_t i,
		same_numbers;

	cpf = std::regex_replace( cpf, std::regex::basic_regex( "[^\\d]" ), "" );

	std::string base_CPF = cpf.substr( 0, 9 );
	char first_verifier = std::to_string( get_verifier( base_CPF ) )[ 0 ],
		second_verifier = std::to_string( get_verifier( base_CPF + first_verifier ) )[ 0 ];

	// Prevents false positive (111.111.111-11, ...)
	for ( i = same_numbers = 0; i < cpf.size(); ( ( cpf[ i ] == cpf[ i + 1 ] ) && same_numbers++ ), i++ );

	return same_numbers < 10
		&& cpf.size() == 11 
		&& first_verifier == cpf[ cpf.size() - 2 ]
		&& second_verifier == cpf[ cpf.size() - 1 ];
};