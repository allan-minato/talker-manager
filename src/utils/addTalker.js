const tokenValidator = (req, res, next) => {
    const { headers } = req;
    const { authorization } = headers;
    
    if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
    }

    if (!(authorization.length === 16 && typeof authorization === 'string')) {
    return res.status(401).json({ message: 'Token inválido' });
}
next();
};

    const nameValidator = (req, res, next) => {
    const { name } = req.body;
    
    if (!name || name.length === 0) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  };

const ageValidator = (req, res, next) => {
    const { body } = req;
    const { age } = body;

    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    return res.status(400).json({ 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18', 
    });
    }
    next();
};

const talkValidator = (req, res, next) => {
    const { body } = req;
    const { talk } = body;

    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const watchedAtValitador = (req, res, next) => {
    const { body } = req;
    const { talk: { watchedAt } } = body;
    const dateType = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!dateType.test(watchedAt)) {
        return res.status(400).json({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
        });
      }
    next();
};

const rateValidator = (req, res, next) => {
    const { talk: { rate } } = req.body;
  
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    
    if (rate <= 0 || rate > 5 || !Number.isInteger(rate)) {
      const text = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
      return res.status(400).json({ message: text });
    }
    next();
};

module.exports = {
    tokenValidator,
    nameValidator,
    ageValidator,
    talkValidator,
    watchedAtValitador,
    rateValidator,
};