const BusinessObject = require('./business_object.model')
const slugify = require('slugify')

async function getAllBusinessObjects(req, res) {
  const { page, limit, search, slug, business_object_type, userData } = req.query

  const skip = limit * ( page - 1);
  const query = {};
  business_object_type ? query["business_object_type"] = business_object_type : '';
  userData ? query["userData.user"] = JSON.parse(userData).user : '';
  slug ? query["slug"] = slug : '';

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    // const businessObject = await BusinessObject.find({'userData.role': 'Admin'},{ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    const businessObject = await BusinessObject.find({...query, $or: [{ name: searchValue }, { description: searchValue }] })
      // .populate('userData.user', '_id firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc'});
      
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function getProducts(req, res) {
  const { page, limit, search, slug } = req.query

  const skip = limit * ( page - 1);

  try {

    const products = await BusinessObject.find({business_object_type: 'product'})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc'});
      
    res.status(200).json(products)
  } catch(err) {
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
  const role = req.role
  console.log('user is: ', user)
  info.slug = await setSlug(info.name);
  info.userData = {
    user: user._id,
    role,
  }
  
  try {
    const businessObject = await BusinessObject.create({ ...info})
    res.status(200).json(businessObject)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function setSlug(name) {
  if (name) {
    try {
      let slug = await slugify(name, { lower: true, trim: true });
      const find = await BusinessObject.findOne({ slug })
      if (find) {
        let index = 1;
        let newSlug = `${slug}-${index}`;
        const findNewSlug = await BusinessObject.findOne({ slug: newSlug })
        while( findNewSlug ) {
          index++;
          newSlug = `${slug}-${index}`;
        }
        slug = newSlug;
      }

      return slug;

    } catch(error) {
      console.error(error);
    }
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
  getProducts,
  getAllBusinessObjects,
  getBusinessObjectById,
  createBusinessObject,
  updateBusinessObject,
  deleteBusinessObject,
}
