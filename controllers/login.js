import User from "../Models/User";

export const loginGet = (req, res) => {
  res.render("auth/login");
};

export const loginPost = (req, res) => {
  console.log("here");
  const { email, password } = req.body;
  if (!(email || password)) {
    res.render("/", { message: "Veuillez remplir les champs" });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user.password == password) {
        res.redirect("dashboard");
      } else {
        res.render("auth/login", {
          message: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }
    });
  }
};

export const register = (req, res) => {
  const { firstname, lastname, email, password, password2 } = req.body;
  if (!(firstname || lastname || email || password)) {
    res.render("/");
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("existe déjà");
        res
          .status(409)
          .render("home/index", { message: "L'utilisateur existe déjà" });
      } else {
        const user = new User({
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        });
        user.save().then(() => console.log("save"));
        res.status(200).render("auth/login");
      }
    });
  }
};
