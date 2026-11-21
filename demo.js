const plans = {
  starter: { name: "Starter", price: 50 },
  standard: { name: "Standard", price: 100 },
  signature: { name: "Signature", price: 120 }
};

const styles = {
  grounded: "Warm & grounded",
  cinematic: "Bold & cinematic",
  friendly: "Bright & friendly"
};

const tier = document.documentElement.dataset.previewTier ?? "standard";
const preview = document.querySelector("[data-preview-style]");
if (preview) {
  const style = preview.dataset.previewStyle;
  const plan = plans[tier];
  preview.querySelector(".current-tier").textContent = `${plan.name} preview`;
  preview.querySelector(`[data-tier-link="${tier}"]`).setAttribute("aria-current", "page");
  preview.querySelector(".pick-preview").href = `./?style=${style}&tier=${tier}#your-choice`;

  if (tier === "signature") {
    const scene = document.querySelector(".signature-scene");
    if (scene) scene.hidden = false;

    if (style === "grounded") {
      const carpentryPages = /^\.\/alder-(and-rail|services|projects)\.html(?:#.*)?$/;
      for (const link of document.querySelectorAll("a:not([data-tier-link])")) {
        if (!carpentryPages.test(link.getAttribute("href"))) continue;
        const destination = new URL(link.href);
        destination.searchParams.set("tier", tier);
        link.href = destination.href;
      }
    }
  }
}

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

if (tier !== "starter") {
  for (const link of document.querySelectorAll("[data-service]")) {
    const destination = document.getElementById(link.hash.slice(1));
    const serviceSelect = destination.querySelector('select[name="service"]');
    link.addEventListener("click", () => {
      serviceSelect.value = link.dataset.service;
      serviceSelect.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
}

const share = document.querySelector("#your-choice");
if (share) {
  const selection = new URLSearchParams(location.search);
  const chosenStyle = selection.get("style");
  const chosenTier = selection.get("tier");

  if (Object.hasOwn(styles, chosenStyle) && Object.hasOwn(plans, chosenTier)) {
    const style = styles[chosenStyle];
    const plan = plans[chosenTier];
    const message = share.querySelector(".style-message");
    const status = share.querySelector(".style-status");
    const choice = `I’m interested in the ${style} style, ${plan.name} package (from $${plan.price} USD).`;
    message.textContent = choice;
    share.hidden = false;

    const email = share.querySelector(".choice-email");
    email.href = `mailto:${share.dataset.email}?subject=Fieldwork%20Web%20website%20inquiry&body=${encodeURIComponent(choice + "\n\nBusiness name: \nWhat I’d like on the website: ")}`;

    share.querySelector("button").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(choice);
        status.textContent = "Copied. Paste it into your reply.";
      } catch {
        status.textContent = "Select the sentence above to copy it manually.";
      }
    });

    if (location.hash === "#your-choice") {
      share.focus({ preventScroll: true });
      share.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }
}