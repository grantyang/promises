
  
var addNewUserToDatabase = function(user, callback) {
  // (1) See if the user already exists
  db.findUserInDatabase(user, function(err, existingUser) {
    if (err) {
      callback(err, null);
    } else if (existingUser) {
      callback('User already exists!', null);
    } else {
      // (2) then, secure the user by hashing the pw
      db.hashPassword(user, function(err, securedUser) {
        if (err) {
          callback(err, null);
        } else {
          // (3) then, create and save the new secured user
          db.createAndSaveUser(securedUser, function(err, savedUser) {
            if (err) {
              callback(err, null);
            } else {
              // (4) We're finally done! Pass our new saved user along
              callback(null, savedUser);
            }
          });
        }
      });
    }
  });
};