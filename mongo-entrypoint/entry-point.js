db.createUser({
  user: "admin",
  pwd: "1q2w3e4r",
  roles: [{
    role: "readWrite",
    db: "SpeedWriter"
  }]
});

// db.auth({"user": "admin","pwd": "1q2w3e4r"})