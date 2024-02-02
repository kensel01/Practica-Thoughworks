class User {
  constructor(user_id, user_name, user_password, email) {
    (this.user_id = user_id),
      (this.user_name = user_name),
      (this.user_password = user_password),
      (this.email = email);
  }
}
module.exports = User;
