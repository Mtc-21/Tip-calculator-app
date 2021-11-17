const bill = document.querySelector("#bill");
    const porcentage = document.querySelectorAll(".tip");
    const custom = document.querySelector("#custom");
    const people = document.querySelector("#people");
    const reset = document.querySelector("#reset");
    const tipAmount = document.querySelector("#tipAmount");
    const totalPerson = document.querySelector("#total");
    let valueBill = 0, valuePeople = 0, valuePorcentage = 0, isCustom = false, alerts = ["Can't be zero", "Can't by negative", "Can't greater than bill", "Can't contain decimal places"]

    const showAlert = (elem, msg) => {
      elem.classList.add("alert");
      elem.previousElementSibling.previousElementSibling.textContent = msg;
      elem.previousElementSibling.previousElementSibling.style.visibility = "visible";
    }
    const hideAlert = (elem) => {
      reset.classList.add("resetHover", "select");
      reset.setAttribute('aria-disabled', 'false');
      elem.classList.remove("alert");
      elem.previousElementSibling.previousElementSibling.style.visibility = "hidden";
    }
    const validate = (elem) => {
      if (!elem.value.startsWith("0") && parseFloat(elem.value) > 0) {
        hideAlert(elem);
        elem.id == "bill" ? valueBill = parseFloat(elem.value) : valuePeople = parseInt(elem.value);
      } else {
        showAlert(elem, alerts[1]);
        removeSelect();
        valuePorcentage = 0;
        elem.id == "bill" ? valueBill = 0 : valuePeople = 0;
      }
      valuePeople > valueBill ? showAlert(people, alerts[2]) : hideAlert(people);

      if (valuePeople > 0 && valuePorcentage > 0) {
        valuePeople > valueBill ? showAlert(people, alerts[2]) : hideAlert(people);
      } else {
        custom.value = "";
        custom.classList.remove("alert");
      }
      elem.id == "bill" ? result(valueBill) : result(valuePeople);
    }
    const removeSelect = () => {
      for (let j = 0; j < porcentage.length; j++) {
        if (porcentage[j].classList.contains("select")) {
          porcentage[j].classList.remove("select");
        }
      }
      custom.classList.remove("alert")
    }
    const validateCustom = (custom) => {
      valuePorcentage = parseInt(custom.value);
      if (!custom.value.startsWith("0") && custom.value > 0 && custom.value <= 100 && valuePeople < valueBill && valuePeople > 0) {
        removeSelect()
        custom.classList.remove("alert");
        result(valuePorcentage)
      } else {
        custom.classList.add("alert");
        valuePorcentage = 0;
        if (valuePeople <= 0) {
          showAlert(people, alerts[1]);
        }
        result(valuePorcentage)
      }
    }
    for (let i = 0; i < porcentage.length; i++) {
      porcentage[i].addEventListener("click", () => {
        custom.value = "";
        if (valueBill > 0 && valuePeople > 0) {
          removeSelect();
          porcentage[i].classList.add("select");
          valuePorcentage = parseInt(porcentage[i].value);
          result(valuePorcentage);
        } else {
          if (valuePeople <= 0) {
            showAlert(people, alerts[1])
          }
        }
      });
    }
    const result = () => {
      console.log(valueBill, valuePorcentage, valuePeople)
      if (!valuePeople || valuePeople > valueBill) {
        tipAmount.value = "$0.00"
        totalPerson.value = "$" + parseFloat(valueBill).toFixed(2);
      } else {
        totalPerson.value = "$" + parseFloat(valueBill / valuePeople).toFixed(2);
        if (valuePorcentage > 0 && valuePorcentage < 100 && valuePeople > 0) {
          let resAmount = ((valueBill * valuePorcentage) / 100) / valuePeople;
          tipAmount.value = "$" + parseFloat(resAmount).toFixed(2);
          totalPerson.value = "$" + parseFloat((valueBill / valuePeople) + resAmount).toFixed(2);
        } else {
          tipAmount.value = "$0.00";
          totalPerson.value = "$" + parseFloat(valueBill / valuePeople).toFixed(2);
        }
      }
    }

    const resetFunction = () => {
      reset.classList.remove("resetHover", "select");
      reset.setAttribute('aria-disabled', 'true');
      valuePeople = 0;
      valueBill = 0;
      custom.value = 0;
      valuePorcentage = 0;
      removeSelect()
      setTimeout(() => {
        tipAmount.value = "$0.00";
        totalPerson.value = "$0.00";
      });
    }
    reset.addEventListener("click", resetFunction);
    bill.addEventListener("keyup", () => {
      validate(bill);
    });
    bill.addEventListener("click", () => {
      validate(bill);
    });
    people.addEventListener("keyup", () => {
      if (/[.j]/.test(people.value)) {
        showAlert(people, alerts[3]);
      } else {
        hideAlert(people)
        validate(people);
      }
    });
    people.addEventListener("click", () => {
      validate(people);
    });
    custom.addEventListener("keyup", () => {
      validateCustom(custom)
    });
    custom.addEventListener("click", () => {
      validateCustom(custom)
    });
    resetFunction();