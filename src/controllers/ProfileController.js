const Profile = require('../model/Profile');

module.exports = {
  
  index(req, res) {
    return res.render("profile", { profile: Profile.get() })
  },

  update(req, res) {
    const data = req.body;

    //definir quantas semanas tem no ano: 52
    const weekPerYear = 52;

    //remover as semanas de férias do ano
    const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12;

    //total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    //horas trabalhadas por mês
    const monthlyTotalHours = weekTotalHours * weekPerMonth

    //valor da hora
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      "value-hour": valueHour
    });

    return res.redirect('/profile')
  },

}