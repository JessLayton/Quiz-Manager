const editorAccess = async (req, res, next) => {
  try {
    if (req.role === 'editor') {
      next();
    } else {
      return res.status(403).json({ msg: 'Forbidden - editor access required' });
    }
  } catch (err) {
    console.error(err);
  }
};

const viewingAccess = async (req, res, next) => {
  try {
    if (req.role === 'editor' || req.role === 'viewer') {
      next();
    } else {
      return res.status(403).json({ msg: 'Forbidden - viewing access required' });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { editorAccess, viewingAccess };
