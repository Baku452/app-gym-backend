const Session = require('./session.model')

async function getAllSessions(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const businessObject = await Session.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const businessObject = await Session.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit);
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getSessionById(req, res) {
  const { id } = req.params
  try {
    const businessObject = await Session.findById(id) 
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createSession(req, res) {
  const info = req.body;
  const user = req.user
  
  try {
    const businessObject = await Session.create({ ...info, userData: { user, role: user.role} })
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateSession(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const businessObject = await Session.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteSession(req, res) {
  const { id } = req.params
  try {
    const businessObject = await Session.findByIdAndDelete(id)
    res.status(200).json({ message: 'Session deleted succesfully', businessObject })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
}
