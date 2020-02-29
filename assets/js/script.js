var budget_data = [];

(function init() {
  loadDataFromLocal();
  var now = new Date();
  getData(now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear());
  createCalendar(calendar, now.getFullYear(), now.getMonth() + 1);
})();

function loadDataFromLocal() {
  let reg_data = JSON.parse(localStorage.getItem("budget_calc_data"));
  if (reg_data != null) {
    budget_data = reg_data;
  }
}

function saveDataToLocal(mass) {
  localStorage.setItem("budget_calc_data", JSON.stringify(mass));
}

function showUsedDays() {
  let days = $(".table_day");

  days.removeClass("_yellow");
  for (let i = 0; i < days.length; i++) {
    let index = days[i].getAttribute("data-date");
    for (let j = 0; j < budget_data.length; j++) {
      if (budget_data[j].id == index) {
        days.eq(i).addClass("_yellow");
      }
    }
  }
}

function firstWeek(month_num) {
  return 1 + month_num * 4;
}

function createCalendar(elem, year, month) {
  let mon_array = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let mon = month - 1;
  let curr_week = firstWeek(mon);
  let d = new Date(year, mon);
  let prev_month_str = "",
    next_month_str = "";
  let table = "";
  table =
    "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th>" +
    "<th>Fri</th><th>Sat</th><th>Sun</th><th></th></tr><tr>";

  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }

  while (d.getMonth() == mon) {
    table +=
      '<td class="table_day" data-week="' +
      curr_week +
      '" data-date="' +
      d.getDate() +
      "." +
      month +
      "." +
      year +
      '" onclick="tdclick(' +
      d.getDate() +
      ", " +
      month +
      ", " +
      year +
      ');">' +
      d.getDate() +
      "</td>";
    if (getDay(d) % 7 == 6) {
      table +=
        '<td><button onclick="peroidShow(' +
        curr_week +
        "," +
        month +
        "," +
        year +
        ')">Show this week</button></td></tr><tr>';
      curr_week++;
    }
    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += "<td></td>";
    }
    table +=
      "<td><button onclick='peroidShow(" +
      curr_week +
      "," +
      month +
      "," +
      year +
      ")'>Show this week</button>";
  }

  table +=
    "</tr>" +
    "<tr><td colspan='8'><button onclick='peroidShow(" +
    0 +
    "," +
    month +
    "," +
    year +
    ")'>Show this month</button></td></tr></table>";
  elem.innerHTML = table;

  if (month == 1) {
    let n_year = year - 1;
    let n_month = 12;
    prev_month_str =
      "<button class='header_btn' onclick='createCalendar(calendar, " +
      n_year +
      ", " +
      n_month +
      ");'><= " +
      mon_array[n_month - 1] +
      ", " +
      n_year +
      "</button";
  } else {
    prev_month_str =
      "<button class='header_btn' onclick='createCalendar(calendar, " +
      year +
      ", " +
      (month - 1) +
      ");'><= " +
      mon_array[month - 2] +
      ", " +
      year +
      "</button";
  }

  if (month == 12) {
    let n_year = year + 1;
    let n_month = 1;
    next_month_str =
      "<button class='header_btn' onclick='createCalendar(calendar, " +
      n_year +
      ", " +
      n_month +
      ");'>" +
      mon_array[n_month - 1] +
      ", " +
      n_year +
      " =></button";
  } else {
    next_month_str =
      "<button class='header_btn' onclick='createCalendar(calendar, " +
      year +
      ", " +
      (month + 1) +
      ");'>" +
      mon_array[month] +
      ", " +
      year +
      " =></button";
  }

  $(".prev_month").html(prev_month_str);
  $(".curr_month").html(mon_array[mon] + ", " + year);
  $(".next_month").html(next_month_str);
  tdclick(1, month, year);
  showUsedDays();
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}

function heightCount(num1, num2) {
  let first_perc = num2 / num1;
  let sec_perc = 300 * first_perc;
  return sec_perc;
}

function draw_gist(all_cons, cons_1, cons_2, cons_3, cons_4, cons_5) {
  let labels = $(".gist_label");
  let full_pr = $(".full_prise_spend");

  full_pr[0].innerHTML = "Of: " + all_cons;
  labels[0].innerHTML = cons_1;
  labels[1].innerHTML = cons_2;
  labels[2].innerHTML = cons_3;
  labels[3].innerHTML = cons_4;
  labels[4].innerHTML = cons_5;

  $("._gist_1").css("height", Math.round(heightCount(all_cons, cons_1)));
  $("._gist_2").css("height", Math.round(heightCount(all_cons, cons_2)));
  $("._gist_3").css("height", Math.round(heightCount(all_cons, cons_3)));
  $("._gist_4").css("height", Math.round(heightCount(all_cons, cons_4)));
  $("._gist_5").css("height", Math.round(heightCount(all_cons, cons_5)));
}

function clear_gist() {
  let labels = $(".gist_label");
  let full_pr = $(".full_prise_spend");

  full_pr[0].innerHTML = "";
  labels[0].innerHTML = "";
  labels[1].innerHTML = "";
  labels[2].innerHTML = "";
  labels[3].innerHTML = "";
  labels[4].innerHTML = "";

  $("._gist_1").css("height", 0);
  $("._gist_2").css("height", 0);
  $("._gist_3").css("height", 0);
  $("._gist_4").css("height", 0);
  $("._gist_5").css("height", 0);
}

function getData(index) {
  let str = "",
    intoin = "";
  let summ = 0;

  for (let i = 0; i < budget_data.length; i++) {
    if (budget_data[i].id == index) {
      str += "Day: " + budget_data[i].id + ";\n";
      str += "Income: " + budget_data[i].income + ";\n";
      intoin += budget_data[i].id + "/" + budget_data[i].income;
      str += "Consumption:\n";
      for (let [key, value] of Object.entries(budget_data[i].consumption)) {
        str += "  " + `${key}: ${value}` + ";\n";
        intoin += "/" + `${value}`;
        summ = summ + Number(`${value}`);
      }
      str += "\n\n";
      str += "Summ of consumption: " + summ + ";\n";
      str += "Balance: " + (budget_data[i].income - summ) + ".";

      if (budget_data[i].income - summ < 0) {
        $(".data_tv").removeClass("_green");
        $(".data_tv").addClass("_red");
      }
      if (budget_data[i].income - summ > 0) {
        $(".data_tv").removeClass("_red");
        $(".data_tv").addClass("_green");
      }
      draw_gist(
        summ,
        budget_data[i].consumption.food,
        budget_data[i].consumption.clothes,
        budget_data[i].consumption.fun,
        budget_data[i].consumption.account,
        budget_data[i].consumption.other
      );
    }
  }
  if (str == "") {
    clear_gist();
    $(".data_tv").removeClass("_green");
    $(".data_tv").removeClass("_red");
    str = "On " + index + " no data!";
  }

  intoEdit(intoin);
  $(".curr_data_lab").html(index);
  setTimeout(() => $(".data_tv").html(str), 10);
}

function tdclick(day, mon, year) {
  if (event != null) {
    $(".data_tv").html("");
    document
      .querySelectorAll("table tr td")
      .forEach(n => n.classList.remove("_active"));
    let target = event.target;
    target.classList.add("_active");

    getData(day + "." + mon + "." + year);
  }
}

function intoEdit(work_text) {
  let income_input = document.querySelector(".new_income");
  let cons_input = document.querySelectorAll(".new_cons");
  let mass = work_text.split("/");
  let index = 0;
  let str_ed = "",
    str_del = "";

  if (mass[1] != undefined) {
    str_ed =
      '<button class="setdata_btn" onclick="editdata()">Set new data</button>';
    str_del =
      '<hr /><button class="setdata_btn" onclick="deletedata()">Delete data</button>';
    income_input.value = mass[1];
    for (let i = 2; i < mass.length; i++) {
      cons_input[index].value = mass[i];
      index++;
    }
  } else {
    str_ed =
      '<button class="setdata_btn" onclick="enterdata()">Add new data</button>';
    str_del = "";
    income_input.value = 0;
    for (let i = 0; i < cons_input.length; i++) {
      cons_input[i].value = 0;
    }
  }
  $(".setdata_wrapper").html(str_ed);
  $(".deldata_wrapper").html(str_del);
}

function getNewData() {
  let index = $(".curr_data_lab").html();
  let income_input = document.querySelector(".new_income");
  let cons_input = document.querySelectorAll(".new_cons");

  return (new_data = {
    id: index,
    income: income_input.value,
    consumption: {
      food: cons_input[0].value,
      clothes: cons_input[1].value,
      fun: cons_input[2].value,
      account: cons_input[3].value,
      other: cons_input[4].value
    }
  });
}

function enterdata() {
  let index = $(".curr_data_lab").html();
  let new_data = getNewData();

  budget_data.push(new_data);
  saveDataToLocal(budget_data);
  getData(index);
  closemodal();
  showUsedDays();
}

function generateBigEdit() {
  const default_data = $(".data_for_edit");
  let index = $(".curr_data_lab").html();

  for (let i = 0; i < budget_data.length; i++) {
    if (budget_data[i].id == index) {
      default_data[0].innerHTML = budget_data[i].income;
      default_data[1].innerHTML = budget_data[i].consumption.food;
      default_data[2].innerHTML = budget_data[i].consumption.clothes;
      default_data[3].innerHTML = budget_data[i].consumption.fun;
      default_data[4].innerHTML = budget_data[i].consumption.account;
      default_data[5].innerHTML = budget_data[i].consumption.other;
    }
  }
}

function calcNewData(mark, first_num, second_num) {
  first_num = Number(first_num);
  second_num = Number(second_num);

  if (mark == "0") {
    return first_num + second_num;
  }
  if (mark == "1") {
    return first_num - second_num;
  }
}

$(".editdata_btn").on("click", function() {
  const default_data = $(".data_for_edit"),
    mark_mass = $(".mark_select");
  let cons_input = document.querySelectorAll(".edit_cons");
  let income_input = document.querySelector(".edit_income");
  let index = $(".curr_data_lab").html(),
    new_data = {
      id: index,
      income: calcNewData(
        mark_mass[0].value,
        default_data[0].innerHTML,
        income_input.value
      ),
      consumption: {
        food: calcNewData(
          mark_mass[1].value,
          default_data[1].innerHTML,
          cons_input[0].value
        ),
        clothes: calcNewData(
          mark_mass[2].value,
          default_data[2].innerHTML,
          cons_input[1].value
        ),
        fun: calcNewData(
          mark_mass[3].value,
          default_data[3].innerHTML,
          cons_input[2].value
        ),
        account: calcNewData(
          mark_mass[4].value,
          default_data[4].innerHTML,
          cons_input[3].value
        ),
        other: calcNewData(
          mark_mass[5].value,
          default_data[5].innerHTML,
          cons_input[4].value
        )
      }
    };

  for (let i = 0; i < budget_data.length; i++) {
    if (budget_data[i].id == index) {
      console.log(budget_data);
      budget_data.splice(i, 1, new_data);
    }
  }

  saveDataToLocal(budget_data);
  getData(index);

  income_input.value = "0";
  for (let i = 0; i < cons_input.length; i++) {
    cons_input[i].value = "0";
  }

  closemodal();
});

function editdata() {
  let index = $(".curr_data_lab").html();
  let new_data = getNewData();

  for (let i = 0; i < budget_data.length; i++) {
    if (budget_data[i].id == index) {
      budget_data.splice(i, 1, new_data);
    }
  }

  saveDataToLocal(budget_data);
  getData(index);
  closemodal();
}

function deletedata() {
  let index = $(".curr_data_lab").html();

  for (let i = 0; i < budget_data.length; i++) {
    if (budget_data[i].id == index) {
      budget_data.splice(i, 1);
    }
  }

  saveDataToLocal(budget_data);
  getData(index);
  closemodal();
  showUsedDays();
}
