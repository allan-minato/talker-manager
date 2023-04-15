const emailValidator = (req, res, next) => {
    const { email } = req.body;
    const testEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!testEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
      return next();
};

const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    const passwordLength = 6;
    
    if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (password.length < passwordLength) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    return next();
};

module.exports = {
    emailValidator,
    passwordValidator,
};