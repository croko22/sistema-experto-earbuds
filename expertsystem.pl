:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).

:- dynamic conocido/1.

:- http_handler(root(recomendar), recomendar, []).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

recomendar(Request) :-
    catch(
        (   http_parameters(Request, [
                tipo(Tipo, [string]),
                respuesta(Respuesta, [optional(true), default('')])
            ]),
            (   Respuesta == ''
            ->  iniciar_diagnostico(Tipo, Pregunta),
                reply_json(json{pregunta: Pregunta})
            ;   procesar_respuesta(Tipo, Respuesta, Pregunta, Diagnostico),
                (   Diagnostico \= ''
                ->  reply_json(json{diagnostico: Diagnostico})
                ;   reply_json(json{pregunta: Pregunta})
                )
            )
        ),
        E,
        (   format('Content-type: text/plain~n~n'),
            format('Error: ~w', [E])
        )
    ).

iniciar_diagnostico(Tipo, Pregunta) :-
    clean_scratchpad,
    obten_hipotesis_y_sintomas(Tipo, Sintomas),
    siguiente_pregunta(Sintomas, Pregunta).

procesar_respuesta(Tipo, Respuesta, Pregunta, Diagnostico) :-
    asserta(conocido(Respuesta)),
    (   haz_diagnostico(Diagnostico)
    ->  Pregunta = ''
    ;   obten_hipotesis_y_sintomas(Tipo, Sintomas),
        siguiente_pregunta(Sintomas, Pregunta),
        Diagnostico = ''
    ).

haz_diagnostico(Diagnostico) :-
    conocimiento(Diagnostico, Sintomas),
    prueba_presencia_de(Diagnostico, Sintomas).

obten_hipotesis_y_sintomas(Tipo, Sintomas) :-
    conocimiento(Tipo, Sintomas).

prueba_presencia_de(_, []).
prueba_presencia_de(Diagnostico, [Sintoma | Tail]) :-
    conocido(Sintoma),
    prueba_presencia_de(Diagnostico, Tail).
prueba_presencia_de(Diagnostico, [Sintoma | Tail]) :-
    \+ conocido(is_false(Sintoma)),
    siguiente_pregunta([Sintoma | Tail], Sintoma).

siguiente_pregunta([Sintoma | _], Sintoma) :-
    \+ conocido(Sintoma),
    \+ conocido(is_false(Sintoma)), !.
siguiente_pregunta([_ | Tail], Pregunta) :-
    siguiente_pregunta(Tail, Pregunta).
siguiente_pregunta([], '').

clean_scratchpad :-
    retractall(conocido(_)).

conocido(_) :- fail.

not(X) :- X, !, fail.
not(_).

% Ejemplo de base de conocimientos
conocimiento('True Wireless', ['Inalambrico', 'Compacto']).
conocimiento('Over-ear', ['Grande', 'Comodo']).

conocimiento('Inalambrico', ['SoundPEATS Air3', 'QCY T13']).
conocimiento('Compacto', ['Anker Soundcore Life P3', 'JBL Live Pro+ TWS']).
conocimiento('Grande', ['Sony WH-1000XM4', 'Bose QC35']).
conocimiento('Comodo', ['Sony WH-1000XM4', 'Jabra Elite 85t']).
