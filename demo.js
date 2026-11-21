for (const form of document.querySelectorAll(".inquiry")) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const result = form.querySelector(".form-result");
    result.textContent = `Preview ready for ${fields.get("name")}: ${fields.get("service")} · ${fields.get("location")}. This is a demonstration and nothing was sent.`;
    result.hidden = false;
    result.focus({ preventScroll: true });
  });
  form.addEventListener("input", () => {
    form.querySelector(".form-result").hidden = true;
  });
}
for (const link of document.querySelectorAll("[data-service]")) {
  link.addEventListener("click", () => {
    const packageSelect = document.querySelector("#quote-form select");
    packageSelect.value = link.dataset.service;
    packageSelect.dispatchEvent(new Event("input", { bubbles: true }));
  });
}