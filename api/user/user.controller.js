const User = require('./user.model')
const Role = require('../role/role.model')

async function getAllUsers(req, res) {
  const { status } = req.query;
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  console.log("LLegue");
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

async function createUser(req, res, next) {
  const { username, firstName, lastName, password, email, roles } = req.body;
  try {

    const user = new User({
      username, 
      firstName, 
      lastName, 
      password, 
      email
    })
    if(roles){
      const foundRoles = await Role.find({name: {$in: roles}});
      user.roles = foundRoles.map(role => role._id);
    }else{
      const role = await Role.findOne({name: "user"});
      user.roles = [role._id];
    }
    const userSaved = await User.create(user);
    return res.status(200).json(userSaved)
    
  } catch(err) {
    res.status(400).json({ error: err})
  } 
}

async function updateUser(req, res) {
  const { id } = req.params
  const info = req.body;
  const {roles} = req.body;
  try {

    if(roles){
      const foundRoles = await Role.find({name: {$in: roles}})
      info.roles = foundRoles
    }
    const user = await User.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(user)
  } catch(err) {
    res.status(400).json({ error: err})
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succesfully", user });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
