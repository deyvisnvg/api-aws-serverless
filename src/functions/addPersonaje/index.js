const { docClient, PutCommand } = require('../../database');
const { v4 } = require('uuid');

exports.addPersonaje = async (event) => {
    const { nombre, poder, maxPoderKi, raza, genero } = JSON.parse(event.body);
    const id = v4();

    const newPersonaje = {
        id,
        nombre,
        poder,
        maxPoderKi,
        raza,
        genero,
    };

    const params = {
        TableName: "personajeTable",
        Item: newPersonaje
    }

    try {
        await docClient.send(new PutCommand(params));
        return {
            statusCode: 201,
            body: JSON.stringify(newPersonaje)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
}