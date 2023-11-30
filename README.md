

# Asunciones de reglas de negocio
1. Los slots de un calendario representan la disponiblidad de un profesional a ofrecer servicios. Debido a que el método a refactorizar recibe una duración de la sesión se supondrá que el profesional establece los rangos temporales en los que él está disponible y son las personas (sus clientes) quienes deciden agendar una sesión de una duración que ellos decidan. De esta manera el profesional, el cual desconoce la duración de las sesiones que sus clientes le van a solicitar, configura en su calendario los slots de tiempo en los que puede ofrecer servicios. Por ejemplo, por la mañana (10:00-14:00) y por la tarde (16:00-20:00). De esta manera, y siguiendo el ejemplo anterior, si un profesional tiene un slot de 10:00 a 14:00 y alguien reserva una sesión con él de 11:00 a 12:00 este profesional seguirá pudiendo ofrecer sesiones de 10:00 a 11:00 y de 12:00 a 14:00
2. Un slot de tiempo puede sobrepasar un día. Es decir, un slot puede empezar en un día `n` y acabar en el día `n+1`. En la refactorización solo se va a aplicar la siguiente regla de negocio: un slot (y una sesion) no puede acabar antes de empezar.
   
# Decisiones de código

1. Se afrontará la refactor desde una perspectiva DDD (domain-driven-design), implementándola siguiendo una arquitectura hexagonal. Se usará el patrón de diseño de software conocido como "value objects" para empujar las reglas y restricciones de negocio lo más bajo posible en la capa de dominio y así obtener una mejor cohesión y bajo acoplamiento además de facilitar la testabilidad de las reglas y restricciones de negocio mejorando a su vez la capacidad de que dichas reglas/restricciones cambien con el tiempo.
2. Se evitará en todo momento utilizar librerías externas que no sean 100% necesarias. Especialmente moment.js la cual ha sido deprecada por su mantainers. Tampoco se usará lodash. De hecho, la solución a este problema finalmente no ha requerido de la instalación de ninguna librería. 

# Problemáticas a lidiar con la base de código actual

Este problema se afronta como una refactorización que se podría llevar a cabo en el mundo real. Por ello se va a asumir ciertas restricciones:

1. Los mocks de los calendarios representan los valores primitivos actuales de la base de datos. Es decir, se asumirá que las fechas en base de datos se están guardando como strings en formato "DD-MM-YYYY" y de la misma manera las marcas de tiempo se están guardando en base de datos en formato "HH:mm". Asumimos que dichos primitivos no pueden ser cambiados para facilitar la refactor y por ende se tendrá que procesar estos strings para poder instanciar y operar con fechas.

# Refactorización

## Preparacion

1. Ejecutar tests y asegurarnos que funcionan
2. Arreglar los problemas de linting
3. Actualizar package.json
  3.1 Actualizar nombre del projecto y autor
  3.2 Fijar dependencias
  3.3 Actualizar dependencias y fijar la versión del runtime
4. Instalar husky y preparar los hooks de git
5. Instalar typescript en el proyecto y configurar Jest para usar typescript

## Fase 1

Primero se ha construido el sistema de contextos: las capas de la arquitectura hexagonal y los value-objects con las reglas/restricciones del dominio. Se ha copiado el código pre-refactor, y se ha introducido dentro del método de la clase Calendar y nos hemos asegurado que todos los tests pasaban correctamente.

## Fase 2

Se ha refactorizado la función `getAvailableSpots` diviendola en partes más pequeñas.

## Fase 3

Debido a la asunción de la regla de negocio la cual se ha comentado en el punto 1, "Asunciones de reglas de negocio", se ha refactorizado la lógica de la función `getAvailableSpots` para ser capaz de explotar slots que aún tenían hueco para seguir ofreciendo sesiones. Antes de ello, se ha creado un test específico para cubrir este escenario.

# Siguientes pasos

1. Desacoplar el test de la capa de aplicación de la capa de infrastructura
2. Crear la mother class de Calendar para desacomplarnos de los archivos .json
3. Implementar errores de dominio