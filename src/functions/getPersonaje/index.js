const { docClient, ScanCommand } = require('../../database');

exports.getPersonaje = async (event) => {
    const params = {
        TableName: "personajeTable"
    }

    try {
        const personajes = await docClient.send(new ScanCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(personajes.Items)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
}