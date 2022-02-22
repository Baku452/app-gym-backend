connectDB(); 
// user.model.js


let array = []
for(i=0; i<11; i++) {
  array.push({})
}

User.insertMany(array)



