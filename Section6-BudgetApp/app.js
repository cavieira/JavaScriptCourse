// BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentage = function (totalIncome) {
    this.percentage =
      totalIncome > 0 ? Math.round((this.value / totalIncome) * 100) : -1;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  return {
    addItem: function (type, des, val) {
      var newItem;
      // Create new ID
      var ID =
        data.allItems[type].length > 0
          ? data.allItems[type][data.allItems[type].length - 1].id + 1
          : 0;
      // Create new item based on income or expense
      if (type === "inc") {
        newItem = new Income(ID, des, val);
      } else {
        newItem = new Expense(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function (type, id) {
      // id = 3
      var ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }

      console.log(data);
    },

    calculateBudget: function () {
      // calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");

      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calculate the percentage of income that we spent
      data.percentage =
        data.totals.inc > 0
          ? Math.round((data.totals.exp / data.totals.inc) * 100)
          : -1;
    },

    calculatePercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calculatePercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        percentage: data.percentage,
      };
    },
  };
})();

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var formatNumber = function (num, type) {
    // + or 0 before number
    // exactly 2 decimal points
    // comma separating the thousands
    num = Math.abs(num);
    num = num.toFixed(2);

    var numSplit = num.split(".");

    var int = numSplit[0];
    var dec = numSplit[1];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    return (type == "exp" ? "-" : "+") + " " + int + "." + dec;
  };

  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      // Create html string with placeholder text
      var html, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with the correct data
      var newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      var type = obj.budget > 0 ? "inc" : "exp";
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalIncome,
        "inc"
      );
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExpenses, "exp");
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage > 0 ? obj.percentage + "%" : "---";
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListForEach(fields, function (current, index) {
        current.textContent =
          percentages[index] > 0 ? percentages[index] + "%" : "---";
      });
    },

    displayMonth: function () {
      var now = new Date();
      var year = now.getFullYear();
      months = [
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
        "December",
      ];
      var month = months[now.getMonth() - 1];
      document.querySelector(DOMstrings.dateLabel).textContent =
        month + " " + year;
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue
      );
      //console.log(fields);
      nodeListForEach(fields, function (current, index) {
        current.classList.toggle("red-focus");
      });
      document.querySelector(DOMstrings.inputButton).classList.toggle('red');
    },

    getDOMStrings: function () {
      return DOMstrings;
    },
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.key === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changeType);
  };

  var updateBudget = function () {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function () {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    //2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    //3. Update the UI with the new percentages
    //console.log(percentages);
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function () {
    // 1. Get the field input data
    var input = UICtrl.getInput();

    if (input.description === "" || isNaN(input.value) || input.value < 1e-3) {
      return;
    }

    // 2. Add the item to the budget controller
    var newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value
    );

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields
    UICtrl.clearFields();

    //5. Calculate and update budget
    updateBudget();

    //6. Calculate and update percentages
    updatePercentages();
  };

  var ctrlDeleteItem = function (event) {
    var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // inc-1 or exp-1
      var splitID = itemID.split("-");
      var type = splitID[0];
      var ID = parseInt(splitID[1]);

      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. delete the item from the UI
      UICtrl.deleteListItem(itemID);

      // 3. update and show the new budget
      updateBudget();

      //4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    init: function () {
      console.log("App has started.");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
