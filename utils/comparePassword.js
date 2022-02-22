async function comparePassword(password, mongooseModel) {
  return await bcrypt.compare(password, mongooseModel.password)
}

module.exports = comparePassword;
