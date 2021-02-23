const scripts = require('../scripts/instructionScript.js');
const db = require('../pgConfig.js');

const getInstructions = (id) => {
    return db.query(scripts.getRecipeInstructionsScript, [id]);
};

const createInstruction = (name, id) => {
    return db.query(scripts.createInstructionScript, [name, id]);
};

const deleteInstruction = (id) => {
    return db.query(scripts.deleteInstructionsScript, [id])
}

module.exports = {
    getInstructions,
    createInstruction,
    deleteInstruction
};
