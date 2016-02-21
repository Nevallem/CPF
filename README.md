# CPF
Gera, valida e formata CPF

## Como Usar
Neste repositório estão disponíveis as versões em C++ e JavaScript desta biblioteca.

### Gerar
O método de gerar CPFs recebe dois argumentos, ambos opcionais. O primeiro indica se você quer que o CPF gerado já saia formatado e o segundo, indica a região fiscal do CPF.

```cpp
// Os argumentos devem ser obrigatoriamente do tipo booleano e número, respectivamente
CPF::generate( true ); // C++
CPF.generate( false, 5 ); // JavaScript
```

O primeiro exemplo gerará um CPF já formatado (ex: 123.456.789-09). Já o segundo gerará um CPF sem formatação porém com a região fiscal 5 (Bahia e Sergipe) definida, logo, o nono dígito do CPF será sempre 5 (ex: 12345678577).

Abaixo a lista com as regiões fiscais:

```
1 = Centro-Oeste e Tocantins
2 = Norte menos o Tocantins
3 = Maranhão, Piauí e Ceará
4 = Rio Grande do Norte, Pernambuco e Paraíba
5 = Bahia e Sergipe
6 = Minas Gerais
7 = Rio de Janeiro e Espírito Santo
8 = São Paulo
9 = Paraná e Santa Catarina
0 ou 10 = Rio Grande do Sul
```

### Validar
O método de validação só recebe um argumento obrigatório (do tipo string), que é o CPF a ser validado.

```cpp
CPF::validate( "12345678577" ); // C++
CPF.validate( '12345678577' ); // JavaScript
```

### Formatar
Igual ao método de validação, só recebe um argumento (string), que é o próprio CPF a ser formatado.

```cpp
CPF::format( "12345678909" ); // C++
CPF.format( '12345678909' ); // JavaScript
```
