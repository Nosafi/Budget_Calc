function peroidShow(this_week, this_month, this_year) {
  let days = $(".table_day"),
    check_week = this_week;
  days.removeClass("_active");
  let result = {
    id: "Result:",
    income: 0,
    consumption: {
      food: 0,
      clothes: 0,
      fun: 0,
      account: 0,
      other: 0
    }
  };
  let str = "",
    summ = 0;
  for (let i = 0; i < days.length; i++) {
    if (check_week == 0) {
      this_week = days[i].getAttribute("data-week");
    }
    if (days[i].getAttribute("data-week") == this_week.toString()) {
      let index = days[i].innerHTML + "." + this_month + "." + this_year;
      days.eq(i).addClass("_active");
      for (let j = 0; j < budget_data.length; j++) {
        if (budget_data[j].id == index) {
          result = {
            id: "Result:",
            income: result.income + Number(budget_data[j].income),
            consumption: {
              food:
                result.consumption.food +
                Number(budget_data[j].consumption.food),
              clothes:
                result.consumption.clothes +
                Number(budget_data[j].consumption.clothes),
              fun:
                result.consumption.fun + Number(budget_data[j].consumption.fun),
              account:
                result.consumption.account +
                Number(budget_data[j].consumption.account),
              other:
                result.consumption.other +
                Number(budget_data[j].consumption.other)
            }
          };
        }
      }
    }
  }

  str += "Income: " + result.income + ";\n";
  str += "Consumption:\n";
  for (let [key, value] of Object.entries(result.consumption)) {
    str += "  " + `${key}: ${value}` + ";\n";
    summ = summ + Number(`${value}`);
  }
  str += "\n\n";
  str += "Summ of consumption: " + summ + ";\n";
  str += "Balance: " + (result.income - summ) + ".";

  if (result.income - summ < 0) {
    $(".data_tv").removeClass("_green");
    $(".data_tv").addClass("_red");
  }
  if (result.income - summ > 0) {
    $(".data_tv").removeClass("_red");
    $(".data_tv").addClass("_green");
  }
  draw_gist(
    summ,
    result.consumption.food,
    result.consumption.clothes,
    result.consumption.fun,
    result.consumption.account,
    result.consumption.other
  );
  if (result.income - summ == 0) {
    clear_gist();
    $(".data_tv").removeClass("_green");
    $(".data_tv").removeClass("_red");
  }
  setTimeout(() => $(".data_tv").html(str), 10);
  console.log("Done!");
}
