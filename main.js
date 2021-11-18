    const bill = document.querySelector("#bill");
    const porcentage = document.querySelectorAll(".tip");
    const custom = document.querySelector("#custom");
    const people = document.querySelector("#people");
    const reset = document.querySelector("#reset");
    const tipAmount = document.querySelector("#tipAmount");
    const totalPerson = document.querySelector("#total");
    let valueBill = 0, valuePeople = 0, valuePorcentage = 0, isCustom = false, alerts = ["Can't be zero", "Can't by negative", "Can't greater than bill", "Can't contain decimal places", "First enter bill", "Can't be empty or negative"]

    const showAlert = (elem, msg) => {
      elem.classList.add("alert");
      elem.previousElementSibling.previousElementSibling.textContent = msg;
      elem.previousElementSibling.previousElementSibling.style.visibility = "visible";
      elem.style.outline = "0";
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
        if (valuePeople <= 0 && !people.value == "") {
          showAlert(people, alerts[1]);
        }
        valuePeople > valueBill ? showAlert(people, alerts[2]) : hideAlert(people);
        if (/[.j]/.test(people.value)) {
          showAlert(people, alerts[3]);
          valuePeople = 0;
        } else {
          hideAlert(people);
          valuePeople > valueBill ? showAlert(people, alerts[2]) : hideAlert(people);
        }
      } else {
        showAlert(elem, alerts[1]);
        elem.id == "bill" ? valueBill = 0 : valuePeople = 0;
        if (valuePorcentage > 0 && valuePeople == 0) {
          showAlert(elem, alerts[5])
        }
      }
      elem.id == "bill" ? result(valueBill) : result(valuePeople);
    }
    const removeSelect = () => {
      porcentage.forEach(porcentage => {
        if (porcentage.classList.contains("select")) {
          porcentage.classList.remove("select");
        }
      });
      custom.classList.remove("alert")
    }
    const validateCustom = (custom) => {
      reset.classList.add("resetHover", "select");
      valuePorcentage = parseInt(custom.value);
      if (!custom.value.startsWith("0") && custom.value > 0 && custom.value <= 100) {
        removeSelect()
        custom.classList.remove("alert");
        if (valueBill > 0) {
          if (valuePeople <= 0 && valuePorcentage) {
            showAlert(people, alerts[5])
            people.focus();
          }
        } else {
          showAlert(bill, alerts[4])
          bill.focus();
        }
      } else {
        removeSelect();
        custom.classList.add("alert");
        custom.style.outline = "0";
        valuePorcentage = 0;

        if (custom.value == "0") {
          custom.classList.remove("alert");
        }
      }
      result(valuePorcentage)
    }
    porcentage.forEach(porcentage => {
      porcentage.addEventListener("click", () => {
        custom.value = "";
        if (valueBill > 0) {
          removeSelect();
          porcentage.classList.add("select");
          valuePorcentage = parseInt(porcentage.value);
          if (valuePeople <= 0) {
            showAlert(people, alerts[5])
            people.focus();
          }
        } else {
          showAlert(bill, alerts[4])
          bill.focus();
        }
        result(valuePorcentage)
      });
    });

    const result = () => {
      console.log(valueBill, valuePorcentage, valuePeople)
      if (!valuePeople || valuePeople > valueBill) {
        tipAmount.value = "$0.00"
        totalPerson.value = "$" + parseFloat(valueBill).toFixed(2);
      } else {
        totalPerson.value = "$" + parseFloat(valueBill / valuePeople).toFixed(2);
        if (valuePorcentage > 0 && valuePorcentage <= 100 && valuePeople > 0) {
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
      hideAlert(people);
      hideAlert(bill)
      reset.classList.remove("resetHover", "select");
      reset.setAttribute('aria-disabled', 'true');
      valuePeople = 0;
      valueBill = 0;
      custom.value = "";
      valuePorcentage = 0;
      removeSelect()
      setTimeout(() => {
        tipAmount.value = "$0.00";
        totalPerson.value = "$0.00";
      });
    }
    reset.addEventListener("click", resetFunction);
    bill.addEventListener("keyup", () => {
      if (!bill.value == "") {
        validate(bill);
      } else {
        valueBill = 0;
        result(valueBill)
        console.log(valueBill, valuePorcentage, valuePeople)
      }
    });
    bill.addEventListener("click", () => {
      if (!bill.value == "") {
        validate(bill);
      }
    });
    people.addEventListener("keyup", () => {
      if (!people.value == "") {
        validate(people);
      } else {
        valuePeople = 0;
        result(valuePeople)
      }
    });
    people.addEventListener("click", () => {
      if (!people.value == "") {
        validate(people);
      }
    });
    custom.addEventListener("keyup", () => {
      if (!custom.value == "") {
        validateCustom(custom);
      } else {
        valuePorcentage = 0;
        result(valuePorcentage)
      }
    });
    custom.addEventListener("click", () => {
      if (!custom.value == "") {
        validateCustom(custom);
      }
    });
    resetFunction();