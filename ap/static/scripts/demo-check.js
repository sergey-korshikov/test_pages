(() => {
  // scripts/components/helpers/basic.js
  var getNumber = (value, decimals = 0) => {
    const format = window.project.wNumb({ mark: ",", thousand: " ", decimals });
    value = format.from(String(value).trim());
    if (value === 0 || value)
      return value;
    return "";
  };
  var getNumberFormat = (value, decimals = 0) => {
    const format = window.project.wNumb({ mark: ",", thousand: " ", decimals });
    return format.to(getNumber(value, decimals)) || "";
  };

  // scripts/components/helpers/showMessage.js
  var showMessage = (value, time = 5e3) => {
    if (!value || !time)
      return;
    const element = document.createElement("div");
    const button = document.createElement("button");
    const text = document.createElement("div");
    button.type = "button";
    button.className = "customButton customButton_cross";
    element.className = "page__message";
    text.innerHTML = value;
    button.addEventListener("click", close);
    element.append(text);
    element.append(button);
    document.body.append(element);
    window.requestAnimationFrame(() => {
      element.classList.add("active");
    });
    setTimeout(close, time);
    function close() {
      element.classList.remove("active");
      setTimeout(() => {
        element.remove();
      }, 200);
    }
  };

  // scripts/components/utils/quiz.js
  var defaultQuiz = (block) => {
    if (!block) {
      console.warn("quiz block not found!");
      return;
    }
    let currentStep = 0;
    const steps = block.querySelectorAll("[data-step]");
    steps.forEach((step) => {
      const btnNext = step.querySelector('[type="submit"]');
      step.addEventListener("input", (e) => {
        if (!btnNext)
          return;
        if (validation(step)) {
          btnNext.disabled = false;
        } else {
          btnNext.disabled = true;
          if (e.target.getAttribute("type") === "radio" && e.target.checked) {
            setTimeout(() => {
              e.target.checked = false;
            }, 200);
          }
        }
      });
      step.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validation(step)) {
          currentStep++;
          steps.forEach((step2) => {
            const number = step2.getAttribute("data-step");
            if (number == currentStep) {
              step2.classList.add("active");
            } else {
              step2.classList.remove("active");
            }
          });
        }
      });
    });
    function validation(step) {
      const trueOption = step.querySelector("[data-true]");
      if (!trueOption || trueOption.checked) {
        return true;
      }
      return false;
    }
  };

  // scripts/components/demo-check.js
  var request = ({ url, options = {}, onSuccess, onError, onEnd }) => {
    fetch(url, options).then((response) => response.json()).then((data) => {
      if (data.status === "ok") {
        onSuccess == null ? void 0 : onSuccess(data);
      } else if (data.status === "error") {
        showMessage(data.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        onError == null ? void 0 : onError();
      } else {
        showMessage(data.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        onError == null ? void 0 : onError();
      }
    }).catch((err) => {
      showMessage("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
      onError == null ? void 0 : onError();
      console.error(err);
    }).then(() => {
      onEnd == null ? void 0 : onEnd();
    });
  };
  var checkField = (field, lowerLimit, upperLimit, counter, counterValue, submit, action) => {
    let count = field.value.length;
    if (count > upperLimit) {
      field.value = field.value.slice(0, upperLimit);
      count = upperLimit;
    }
    counterValue.innerHTML = getNumberFormat(count);
    if (count >= lowerLimit && count <= upperLimit) {
      submit.disabled = false;
      counter.classList.remove("error", "error_lower");
    } else if (action === "submit") {
      field.focus();
      submit.disabled = true;
      field.classList.add("error");
      counter.classList.add("error");
      if (count < lowerLimit) {
        counter.classList.add("error_lower");
      }
    }
    if (action === "input") {
      field.classList.remove("error");
      localStorage.setItem(field.name, field.value);
    }
  };
  var bindDemoForm = (form, check, result) => {
    const field = form.querySelector("[data-field]");
    const counter = form.querySelector("[data-counter]");
    const counterValue = form.querySelector("[data-counter-value]");
    const submit = form.querySelector('[type="submit"]');
    const url = form.action;
    if (!field || !url)
      return;
    const lowerLimit = getNumber(field.getAttribute("data-lower-limit")) || 0;
    const upperLimit = getNumber(field.getAttribute("data-upper-limit")) || 2e5;
    field.value = localStorage.getItem(field.name) || "";
    checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "init");
    field.addEventListener("input", () => {
      checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "input");
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = field.value;
      const count = value.length;
      checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "submit");
      if (count >= lowerLimit && count <= upperLimit && !form.classList.contains("loading")) {
        let time = 0;
        let checking = true;
        let hasError = false;
        const dataRequest = new FormData(form);
        const requestCheck = (data) => {
          time += data.timeout;
          const queryString = new URLSearchParams({ time }).toString();
          const currentUrl = "".concat(url, "?").concat(queryString);
          setTimeout(() => {
            request({
              url: currentUrl,
              onSuccess,
              onError,
              onEnd
            });
          }, data.timeout * 1e3);
        };
        const onSuccess = (dataResponse) => {
          if (dataResponse.completed) {
            checking = false;
          } else if (dataResponse.timeout) {
            requestCheck(dataResponse);
          } else {
            onError();
          }
        };
        const onError = () => {
          checking = false;
          hasError = true;
        };
        const onEnd = () => {
          if (!checking) {
            form.classList.remove("loading");
            submit.classList.remove("loading");
            if (hasError) {
              check.classList.add("error");
            } else {
              check.classList.remove("active");
              result.classList.add("active");
            }
          }
        };
        form.classList.remove("active");
        check.classList.add("active");
        form.classList.add("loading");
        submit.classList.add("loading");
        request({
          url,
          options: {
            method: "POST",
            body: dataRequest
          },
          onSuccess,
          onError,
          onEnd
        });
      }
    });
  };
  var bindDemoCheck = (block) => {
    const form = block.querySelector("[data-form]");
    const check = block.querySelector("[data-check]");
    const result = block.querySelector("[data-result]");
    const quizBlock = block.querySelector("[data-quiz]");
    const repeat = block.querySelector("[data-repeat]");
    bindDemoForm(form, check, result);
    defaultQuiz(quizBlock);
    repeat.addEventListener("click", () => {
      form.classList.add("active");
      check.classList.remove("active", "error");
    });
  };
  var bindDemoChecks = () => {
    document.querySelectorAll(".js-demo-check").forEach(bindDemoCheck);
  };

  // scripts/demo-check.js
  document.addEventListener("DOMContentLoaded", (e) => {
    bindDemoChecks();
  });
})();
