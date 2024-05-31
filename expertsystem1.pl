:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).

:- dynamic conocido/1.
:- dynamic recomendado/1.
:- dynamic pregunta_actual/1.

:- http_handler(root(recomendar), recomendar, []).

server(Port) :-
   http_server(http_dispatch, [port(Port)]),
   asserta(pregunta_actual('')),
   clean_scratchpad.

recomendar(Request) :-
   http_parameters(Request, [tipo(Tipo, [string])]),
   recomendar_audífonos(Tipo, Recomendado),
   reply_json(json{recomendado: Recomendado}).

recomendar_audífonos(Tipo, Recomendado) :-
   (
      haz_diagnostico(Tipo, Recomendado) ->
         ;
      obten_hipótesis_y_síntomas(Tipo, Síntomas),
      siguiente_pregunta(Síntomas, Pregunta),
      asserta(pregunta_actual(Pregunta)),
      reply_json(json{pregunta: Pregunta}),
      receive_answer(Respuesta),
      asserta(conocido(Respuesta)),
      recomendar_audífonos(Tipo, Recomendado)
   ).

haz_diagnostico(Tipo, Recomendado) :-
   conocimiento(Tipo, Recomendado).

obten_hipótesis_y_síntomas(Tipo, Síntomas) :-
   conocimiento(Tipo, Síntomas).

siguiente_pregunta([Síntoma | _], Síntoma) :-
   \+ conocido(Síntoma),
   \+ conocido(is_false(Síntoma)), !.
siguiente_pregunta([_ | Tail], Pregunta) :-
   siguiente_pregunta(Tail, Pregunta).

receive_answer(Respuesta) :-
   http_read_data(input, Respuesta),
   strip_controls(Respuesta, RespuestaSinControles),
   atom_string(RespuestaSinControles, RespuestaAtom),
   retract(pregunta_actual(PreguntaActual)),
   (
      PreguntaActual = '¿Qué es importante para ti en unos auriculares True Wireless? (Presupuesto Bajo, Cancelación de Ruido, Calidad de Sonido, Duración de Batería, Confort)' ->
         recomendar_por_caracteristica(RespuestaAtom, Tipo, Recomendado)
      ;
      PreguntaActual = '¿Prefieres un sonido con énfasis en los bajos o en los agudos?' ->
         recomendar_por_sonido(RespuestaAtom, Tipo, Recomendado)
      ;
      PreguntaActual = '¿Qué tan importante es la cancelación de ruido para ti?' ->
         recomendar_por_cancelacion_ruido(RespuestaAtom, Tipo, Recomendado)
      ;
      PreguntaActual = '¿Qué tan importante es la duración de la batería para ti?' ->
         recomendar_por_bateria(RespuestaAtom, Tipo, Recomendado)
      ;
      PreguntaActual = '¿Qué tan importante es la comodidad para ti?' ->
         recomendar_por_comodidad(RespuestaAtom, Tipo, Recomendado)
   ).

recomendar_por_caracteristica(Respuesta, Tipo, Recomendado) :-
   (
      Respuesta = 'Presupuesto Bajo' ->
         conocimiento('Presupuesto Bajo', Recomendados)
      ;
      Respuesta = 'Cancelación de Ruido' ->
         conocimiento('Cancelación de Ruido', Recomendados)
      ;
      Respuesta = 'Calidad de Sonido' ->
         conocimiento('Calidad de Sonido', Recomendados)
      ;
      Respuesta = 'Duración de Batería' ->
         conocimiento('Duración de Batería', Recomendados)
      ;
      Respuesta = 'Confort' ->
         conocimiento('Confort', Recomendados)
   ),
   recomendar_audífonos_por_lista(Tipo, Recomendados, Recomendado).

recomendar_por_sonido(Respuesta, Tipo, Recomendado) :-
   (
      Respuesta = 'Bajos' ->
         recomendar_audífonos_con_caracteristica('Bajos', Tipo, Recomendado)
      ;
      Respuesta = 'Agudos' ->
         recomendar_audífonos_con_caracteristica('Agudos', Tipo, Recomendado)
   ).

recomendar_por_cancelacion_ruido(Respuesta, Tipo, Recomendado) :-
   (
      Respuesta = 'Muy Importante' ->
         recomendar_audífonos_con_caracteristica('Muy Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Importante' ->
         recomendar_audífonos_con_caracteristica('Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Poco Importante' ->
         recomendar_audífonos_con_caracteristica('Poco Importante', Tipo, Recomendado)
   ).

recomendar_por_bateria(Respuesta, Tipo, Recomendado) :-
   (
      Respuesta = 'Muy Importante' ->
         recomendar_audífonos_con_caracteristica('Muy Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Importante' ->
         recomendar_audífonos_con_caracteristica('Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Poco Importante' ->
         recomendar_audífonos_con_caracteristica('Poco Importante', Tipo, Recomendado)
   ).
 
 recomendar_por_comodidad(Respuesta, Tipo, Recomendado) :-
   (
      Respuesta = 'Muy Importante' ->
         recomendar_audífonos_con_caracteristica('Muy Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Importante' ->
         recomendar_audífonos_con_caracteristica('Importante', Tipo, Recomendado)
      ;
      Respuesta = 'Poco Importante' ->
         recomendar_audífonos_con_caracteristica('Poco Importante', Tipo, Recomendado)
   ).

recomendar_audífonos_por_lista(Tipo, Recomendados, Recomendado) :-
   member(Recomendado, Recomendados),
   \+ recomendado(Recomendado),
   asserta(recomendado(Recomendado)).

recomendar_audífonos_con_caracteristica(Caracteristica, Tipo, Recomendado) :-
   conocimiento(Caracteristica, Recomendados),
   recomendar_audífonos_por_lista(Tipo, Recomendados, Recomendado).

clean_scratchpad :-
    retract(conocido(_)), fail.
clean_scratchpad.

conocido(_) :- fail.

not(X) :- X, !, fail.
not(_).

% Ejemplo de base de conocimientos
conocimiento('True Wireless', ['Inalambrico', 'Compacto']).
conocimiento('Over-ear', ['Grande', 'Comodo']).

conocimiento('Inalambrico', ['SoundPEATS Air3', 'QCY T13']).
conocimiento('Compacto', ['Anker Soundcore Life P3', 'JBL Live Pro+ TWS']).
conocimiento('Grande', ['Sony WF-1000XM4', 'Apple AirPods Pro']).
