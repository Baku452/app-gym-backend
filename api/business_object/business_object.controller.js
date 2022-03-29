const BusinessObject = require('./business_object.model')

async function getAllBusinessObjects(req, res) {
  const { page, limit, search, type = '' } = req.query

  const skip = limit * ( page - 1)

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const businessObject = await BusinessObject.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const businessObject = await BusinessObject.find({type, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit);
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}


async function getBusinessObjectById(req, res) {
  const { id } = req.params
  try {
    const businessObject = await BusinessObject.findById(id) 
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createBusinessObject(req, res) {
  const info = req.body;
  const user = req.user
  
  try {
    // const businessObject = await BusinessObject.create({ ...info, userData: { user, role: user.role} })
    const businessObject = await BusinessObject.create({ ...info})
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateBusinessObject(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const businessObject = await BusinessObject.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteBusinessObject(req, res) {
  const { id } = req.params
  try {
    const businessObject = await BusinessObject.findByIdAndDelete(id)
    res.status(200).json({ message: 'BusinessObject deleted succesfully', businessObject })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllBusinessObjects,
  getBusinessObjectById,
  createBusinessObject,
  updateBusinessObject,
  deleteBusinessObject,
}
