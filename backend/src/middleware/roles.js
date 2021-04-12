const isAdmin = async (req, res, next) => {
  try {
    if (req.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ msg: 'Forbidden - admin access required' });
    }
  } catch (err) {
    console.error(err);
  }
};

const isAssessor = async (req, res, next) => {
  try {
    if (req.role === 'admin' || req.role === 'assessor') {
      next();
    } else {
      return res.status(403).json({ msg: 'Forbidden - assessor access required' });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { isAdmin, isAssessor };
