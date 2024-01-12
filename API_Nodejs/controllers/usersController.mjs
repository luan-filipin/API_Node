import User from "../models/user.mjs";

const postOneUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await User.create(userData);
        return res.json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const getOneUser = async (req, res) => {
    const userData = req.params.codigo;
    try {
        const users = await User.findOne({ codigo: userData });
        if (!users) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const deleteOneUser = async (req, res) => {
    const userData = req.params.codigo;
    try {
        const users = await User.findOneAndDelete({ codigo: userData });
        if (!users) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }
        return res.json({ menssagem: "Usuario deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const updateOneUser = async (req, res) => {
    const userData = req.params.codigo;
    try {
        const requiredFields = ['codigo', 'name', 'age'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
        }

        const users = await User.findOneAndUpdate({ codigo: userData }, req.body,
            { new: true });
        if (!users) {
            return res.status(404).json({ Erro: "Usuario não encontrado." });
        }
        return res.json({ message: "Dados atualizado com sucesso!" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const updateAllUsers = async (req, res) => {
    const userData = req.params.codigo;
    try {
        const users = await User.findOneAndUpdate({ codigo: userData }, req.body,
            { new: true });
        if (!users) {
            return res.status(404).json({ Erro: "Usuario não encontrado." });
        }
        return res.json({ message: "Dados atualizado com sucesso!" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export default {
    getAllUsers,
    getOneUser,
    deleteOneUser,
    updateOneUser,
    updateAllUsers,
    postOneUser
}