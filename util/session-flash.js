const getSessionData = req => {
  //get session data in const
  const sessionData = req.session.flashedData;

  //then delete data from session
  req.session.flashedData = null;

  return sessionData;
};

const flashDataToSession = (req, data, action) => {
  req.session.flashedData = data;

  req.session.save(action);
};

export default {
  getSessionData,
  flashDataToSession
}
