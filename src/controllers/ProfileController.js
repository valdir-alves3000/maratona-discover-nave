const Profile = require('../model/Profile');

module.exports = {
  
  async index(req, res) { 
    const profile = await Profile.get();

    return res.render("profile", { profile })
  },

  async update(req, res) {
    const data = req.body;
    const profile = await Profile.get();

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

    await Profile.update({
      ...profile,
      ...data,
      "value-hour": valueHour
    });

    return res.redirect('/profile')
  },

}