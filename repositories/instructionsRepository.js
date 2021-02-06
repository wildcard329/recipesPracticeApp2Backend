const scripts = require('../scripts/instructionScript.js');
const db = require('../pgConfig.js');

const getInstruction = (id) => {
    return db.query(scripts.getRecipeInstructionsScript, [id]);
};

const createInstruction = (name, id) => {
    return db.query(scripts.createInstructionScript, [name, id]);
};

const deleteInstruction = (id) => {
    return db.query(scripts.deleteInstructionScript, [id])
}

module.exports = {
    getInstruction,
    createInstruction,
    deleteInstruction
};
