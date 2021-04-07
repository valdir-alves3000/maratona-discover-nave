const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Valdir",
  avatar: "https://github.com/valdir-alves3000.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
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

      Profile.data = {
        ...Profile.data,
        ...data,
        "value-hour": valueHour
      }

      return res.redirect('/profile')
    },

  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      created_at: Date.now() 
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now() -(3600000*30*24)
    }
  ],

  controllers: {
    index(req, res) {

      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
    
        return {
          ...job,
          remaining,
          status,
          budget: (Profile.data["value-hour"] * job["total-hours"])
        }
      })
      return res.render(views + "index", { jobs: updatedJobs })
    },

    create(req, res) {
     return res.render(views + "job")
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;
    
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data atual
      })
    
      return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      //cálculo de tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
      const createDate = new Date(job.created_at);
      const dueDay = createDate.getDate() + Number(remainingDays);
      const dueDateInMs = createDate.setDate((dueDay));
    
      const timeDiffInMs = dueDateInMs - Date.now();
    
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = (timeDiffInMs / dayInMs).toFixed();
    
      return dayDiff;
    }
  }
}


routes.get('/', Job.controllers.index);

routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

routes.get('/index', (req, res) => {
  return res.redirect('/');
})

module.exports = routes;