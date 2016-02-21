/**
 * Create and validate CPFs
 *
 * @author Roger Lima (rogerlima@outlook.com)
 * @date 18/feb/2014
 * @upadte 21/feb/2015
*/
#pragma once
#include <random>
#include <regex>

class CPF {
private:
	// Get the verifier digit
	// @param {string} Numbers
	// @see http://www.gerardocumentos.com.br/?pg=entenda-a-formula-do-cpf
	static int get_verifier( std::string );
public:
	// Format a CPF
	// @param {string} CPF to format
	static std::string format( std::string );

	// Generate a valid CPF
	// @param [{bool=false}] Formatting
	// @param [{string|number}] Tax Region. If empty, random region is setted;
	// Tax region possibly values
	//	1 (Centro-Oeste, Tocantins)
	//	2 (Norte -Tocantins)
	//	3 (Maranhão, Piauí, Ceará)
	//	4 (Rio Grande do Norte, Pernambuco, Paraíba)
	//	5 (Bahia, Sergipe)
	//	6 (Minas Gerais)
	//	7 (Rio de Janeiro, Espírito Santo)
	//	8 (São Paulo)
	//	9 (Paraná, Santa Catarina)
	//	0 or 10 (Rio Grande do Sul)
	static std::string generate( bool = false, int = -1 );

	// Validates a CPF
	// @param {string} CPF to validate
	static bool validate( std::string );
};