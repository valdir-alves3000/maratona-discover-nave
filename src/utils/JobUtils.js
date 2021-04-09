module.exports = {
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
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
}