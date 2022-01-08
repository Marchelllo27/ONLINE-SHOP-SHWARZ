const createUserSession = (req, user, action) => {
  req.session.uid = user._id.toString();
  req.session.save(action);
};

const destroyUserAuthSession = req => {
  req.session.uid = null;
};

export default {
  createUserSession,
  destroyUserAuthSession
}