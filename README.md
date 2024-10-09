# <div align="center"> Serverless Framework Node HTTP API on AWS </div>

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)


<div align="center">
  <img src="https://media2.giphy.com/media/uurtMtTKqkJda4dk8Y/200w.webp?cid=ecf05e47ipyhr4vjtllb1xiqwtxh39uto775myk2rj700nth&rid=200w.webp&ct=g" title="logo" alt="logo" width="250" height="250" />&nbsp;
</div>

### <div align="center">API SERVERLESS</div>

#
  Esta plantilla demuestra cómo crear una API HTTP simple con Node.js ejecutándose en AWS Lambda y API Gateway utilizando Serverless Framework.

#
# Requerimientos

- Versión Nodejs

   ```bash
   $ node -v || node --version
   v20.18.0

   $ npm -v || npm --version
   v10.8.2
   ```
  
- Versión Serverless ϟ Framework

   ```bash
   $ sls -v || serverless -v
   v4.4.5
   ```

# Instalación

   ```bash
   $ git clone https://github.com/deyvisnvg/api-aws-serverless.git
   $ cd api-aws-serverless
   ```

# Empezando

- Instalar paquetes

    ```bash
    npm i 
    ```

- Despliegue

  Para implementar el ejemplo, debe ejecutar el siguiente comando:
  ```bash
  $ serverless deploy --verbose
  ```

  Forma Abreviada:
  ```bash
  $ sls deploy --verbose
  ```

- Después de ejecutar la implementación, debería ver un resultado similar a

  ```
  Deploying "api-aws" to stage "dev" (us-west-2)

  ✔ Service deployed to stack api-aws-dev (64s)

  endpoints:
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiPlanet/{id}
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiPlanets
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiSpecie/{id}
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiSpecies
    POST - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/personaje
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/personaje
    GET - https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swagger

  functions:
    getSwapiPlanet: api-aws-dev-getSwapiPlanet (15 MB)
    getSwapiPlanets: api-aws-dev-getSwapiPlanets (15 MB)
    getSwapiSpecie: api-aws-dev-getSwapiSpecie (15 MB)
    getSwapiSpecies: api-aws-dev-getSwapiSpecies (15 MB)
    addPersonaje: api-aws-dev-addPersonaje (15 MB)
    getPersonaje: api-aws-dev-getPersonaje (15 MB)
    swagger: api-aws-dev-swagger (15 MB)
  ```


# Invocación

- Después de una implementación exitosa, puede llamar a la aplicación creada a través de HTTP:

- **Buscar Planeta por id**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiPlanet/{id}

  _Condiciones:_

  - En la ruta se reemplaza {id} por ejemplo:
    ```bash
    # https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiPlanet/1
    ```
  _Response_
    ```bash
      {
        "nombre": "Tatooine",
        "periodo_de_rotacion": "23",
        "periodo_orbital": "304",
        "diametro": "10465",
        "clima": "arid",
        "gravedad": "1 standard",
        "terreno": "desert",
        "superficie_agua": "1",
        "poblacion": "200000",
        "residentes": [
            "https://swapi.py4e.com/api/people/1/",
            "https://swapi.py4e.com/api/people/2/",
            "https://swapi.py4e.com/api/people/4/",
            "https://swapi.py4e.com/api/people/6/",
            "https://swapi.py4e.com/api/people/7/",
            "https://swapi.py4e.com/api/people/8/",
            "https://swapi.py4e.com/api/people/9/",
            "https://swapi.py4e.com/api/people/11/",
            "https://swapi.py4e.com/api/people/43/",
            "https://swapi.py4e.com/api/people/62/"
        ],
        "peliculas": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/3/",
            "https://swapi.py4e.com/api/films/4/",
            "https://swapi.py4e.com/api/films/5/",
            "https://swapi.py4e.com/api/films/6/"
        ],
        "creado": "2014-12-09T13:50:49.641000Z",
        "editado": "2014-12-20T20:58:18.411000Z",
        "url": "https://swapi.py4e.com/api/planets/1/"
      }
    ```

- **Listar todos los Planetas**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiPlanets

  _Response_
    ```bash
      [
        {
            "nombre": "Tatooine",
            "periodo_de_rotacion": "23",
            "periodo_orbital": "304",
            "diametro": "10465",
            "clima": "arid",
            "gravedad": "1 standard",
            "terreno": "desert",
            "superficie_agua": "1",
            "poblacion": "200000",
            "residentes": [
                "https://swapi.py4e.com/api/people/1/",
                "https://swapi.py4e.com/api/people/2/",
                "https://swapi.py4e.com/api/people/4/",
                "https://swapi.py4e.com/api/people/6/",
                "https://swapi.py4e.com/api/people/7/",
                "https://swapi.py4e.com/api/people/8/",
                "https://swapi.py4e.com/api/people/9/",
                "https://swapi.py4e.com/api/people/11/",
                "https://swapi.py4e.com/api/people/43/",
                "https://swapi.py4e.com/api/people/62/"
            ],
            "peliculas": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/4/",
                "https://swapi.py4e.com/api/films/5/",
                "https://swapi.py4e.com/api/films/6/"
            ],
            "creado": "2014-12-09T13:50:49.641000Z",
            "editado": "2014-12-20T20:58:18.411000Z",
            "url": "https://swapi.py4e.com/api/planets/1/"
        },
        {
            "nombre": "Alderaan",
            "periodo_de_rotacion": "24",
            "periodo_orbital": "364",
            "diametro": "12500",
            "clima": "temperate",
            "gravedad": "1 standard",
            "terreno": "grasslands, mountains",
            "superficie_agua": "40",
            "poblacion": "2000000000",
            "residentes": [
                "https://swapi.py4e.com/api/people/5/",
                "https://swapi.py4e.com/api/people/68/",
                "https://swapi.py4e.com/api/people/81/"
            ],
            "peliculas": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/6/"
            ],
            "creado": "2014-12-10T11:35:48.479000Z",
            "editado": "2014-12-20T20:58:18.420000Z",
            "url": "https://swapi.py4e.com/api/planets/2/"
        },
        ...
    ]
    ```

- **Buscar Especie por id**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiSpecie/{id}

  _Condiciones:_

    - En la ruta se reemplaza {id} por ejemplo:
      ```bash
      # https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiSpecie/2
      ```
  _Response_
    ```bash
      {
        "nombre": "Droid",
        "clasificacion": "artificial",
        "designacion": "sentient",
        "altura_promedio": "n/a",
        "colores_de_piel": "n/a",
        "colores_de_cabello": "n/a",
        "colores_de_ojos": "n/a",
        "promedio_de_vida": "indefinite",
        "mundo_origen": null,
        "idioma": "n/a",
        "personas": [
            "https://swapi.py4e.com/api/people/2/",
            "https://swapi.py4e.com/api/people/3/",
            ...
        ],
        "peliculas": [
            "https://swapi.py4e.com/api/films/1/",
            "https://swapi.py4e.com/api/films/2/",
            ...
        ],
        "creado": "2014-12-10T15:16:16.259000Z",
        "editado": "2014-12-20T21:36:42.139000Z",
        "url": "https://swapi.py4e.com/api/species/2/"
      }
    ```

- **Listar todas las Especies**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swapiSpecies

  _Response_
    ```bash
      [
        {
            "nombre": "Human",
            "clasificacion": "mammal",
            "designacion": "sentient",
            "altura_promedio": "180",
            "colores_de_piel": "caucasian, black, asian, hispanic",
            "colores_de_cabello": "blonde, brown, black, red",
            "colores_de_ojos": "brown, blue, green, hazel, grey, amber",
            "promedio_de_vida": "120",
            "mundo_origen": "https://swapi.py4e.com/api/planets/9/",
            "idioma": "Galactic Basic",
            "personas": [
                "https://swapi.py4e.com/api/people/1/",
                "https://swapi.py4e.com/api/people/4/",
                ...
            ],
            "peliculas": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                ...
            ],
            "creado": "2014-12-10T13:52:11.567000Z",
            "editado": "2014-12-20T21:36:42.136000Z",
            "url": "https://swapi.py4e.com/api/species/1/"
        },
        {
            "nombre": "Droid",
            "clasificacion": "artificial",
            "designacion": "sentient",
            "altura_promedio": "n/a",
            "colores_de_piel": "n/a",
            "colores_de_cabello": "n/a",
            "colores_de_ojos": "n/a",
            "promedio_de_vida": "indefinite",
            "mundo_origen": null,
            "idioma": "n/a",
            "personas": [
                "https://swapi.py4e.com/api/people/2/",
                "https://swapi.py4e.com/api/people/3/",
                ...
            ],
            "peliculas": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                ...
            ],
            "creado": "2014-12-10T15:16:16.259000Z",
            "editado": "2014-12-20T21:36:42.139000Z",
            "url": "https://swapi.py4e.com/api/species/2/"
        },
        ...
    ]
  ```


- **Agregar un personaje de DragonBall a dynamoDB de AWS**
    > Method: POST

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/personaje

   _Condiciones:_

    - Enviar lo siguiente en el body del Postman. Ej.

    ```bash
      {
        "nombre": "Bulma",
        "poder": "0",
        "maxPoderKi": "0",
        "raza": "Humano",
        "genero": "Mujer"
      }
     ```

  _Response_

    ```bash
    {
      "id": "b58aab97-f30f-475c-b8b2-1519a793f0c0",
      "nombre": "Bulma",
      "poder": "0",
      "maxPoderKi": "0",
      "raza": "Humano",
      "genero": "Mujer"
    }
     ```
- **Listar todos los personajes desde dynamoDB de AWS**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/personaje

  _Response_
    ```bash
      [
        {
            "nombre": "Bulma",
            "poder": "0",
            "id": "b58aab97-f30f-475c-b8b2-1519a793f0c0",
            "raza": "Humano",
            "maxPoderKi": "0",
            "genero": "Mujer"
        },
        {
            "nombre": "Goku",
            "poder": "60.000.000",
            "id": "fb40fa9b-9f1f-4cf8-8bf7-04e771123db8",
            "raza": "saiyajin",
            "maxPoderKi": "90 Septillion",
            "genero": "Masculino"
        },
        ...
      ]
  ```

# Documentación en Open API / Swagger

- **Documentación**
    > Method: GET

    > https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swagger

  _Response_
    ```bash
      // 20241009184925
      // https://wgxw3jrwih.execute-api.us-west-2.amazonaws.com/swagger

      {
        "openapi": "3.0.0",
        "info": {
          "title": "Serverless API",
          "description": "Documentación de la API Serverless",
          "version": "1.0.0"
        },
        "paths": {
          "/swapiPlanet/{id}": {
            "get": {
              "summary": "Obtener un planeta de SWAPI",
              "parameters": [
                {
                  "name": "id",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Planeta encontrado",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Planets"
                      }
                    }
                  }
                },
                "500": {
                  "description": "Error en el servidor"
                }
              }
            }
          },
          "/swapiPlanets": {
            "get": {
              "summary": "Obtener todos los planetas de SWAPI",
              "responses": {
                "200": {
                  "description": "Éxito",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/Planets"
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Error en el servidor"
                }
              }
            }
          },
          ...
        "components": {
          "schemas": {
            "Personaje": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "nombre": {
                  "type": "string"
                },
                "poder": {
                  "type": "string"
                },
                "maxPoderKi": {
                  "type": "string"
                },
                "raza": {
                  "type": "string"
                },
                "genero": {
                  "type": "string"
                }
              }
            },
            ...
          }
        }
      }
  ```