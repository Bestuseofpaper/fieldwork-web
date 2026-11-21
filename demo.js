for (const form of document.querySelectorAll(".inquiry")) {
  const result = form.querySelector(".form-result");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    result.textContent = `Preview ready for ${fields.get("name")}: ${fields.get("service")} · ${fields.get("location")}. This is a demonstration and nothing was sent.`;
    result.hidden = false;
    result.focus({ preventScroll: true });
  });
  form.addEventListener("input", () => {
    result.hidden = true;
  });
}

for (const link of document.querySelectorAll("[data-service]")) {
  const destination = document.getElementById(link.hash.slice(1));
  const serviceSelect = destination.querySelector('select[name="service"]');
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
    serviceSelect.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

const stylePicker = document.querySelector("#style-picker");
if (stylePicker) {
  const share = stylePicker.querySelector(".style-share");
  const message = share.querySelector(".style-message");
  const status = share.querySelector(".style-status");
  const copy = share.querySelector("button");

  const showChoice = (style) => {
    message.textContent = `I’d like a website in the ${style} style.`;
    share.hidden = false;
    status.textContent = "";
  };

  stylePicker.addEventListener("change", (event) => {
    if (event.target.name === "style") showChoice(event.target.value);
  });

  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(message.textContent);
      status.textContent = "Copied. Paste it into your reply.";
    } catch {
      status.textContent = "Select the sentence above to copy it manually.";
    }
  });

  const checked = stylePicker.querySelector('input[name="style"]:checked');
  if (checked) showChoice(checked.value);
}