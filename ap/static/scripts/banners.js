(() => {
  // scripts/banners.js
  var showMessage = (value, time = 5e3) => {
    if (!value || !time)
      return;
    const element = document.createElement("div");
    const button = document.createElement("button");
    const text = document.createElement("div");
    button.type = "button";
    button.className = "customButton customButton_cross";
    element.className = "pageMessage";
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
  document.addEventListener("DOMContentLoaded", (e) => {
    document.querySelectorAll(".js-copy-promo-code").forEach(init);
    function init(button) {
      button.addEventListener("click", (e2) => {
        e2.preventDefault();
        const value = (button == null ? void 0 : button.value) || button.getAttribute("data-value");
        const textResult = button.getAttribute("data-text") || "\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430";
        if (navigator.clipboard && value) {
          navigator.clipboard.writeText(value).then(() => {
            showMessage(textResult);
          }).catch(() => {
            showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
          });
        } else {
          showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
        }
      });
    }
  });
})();
