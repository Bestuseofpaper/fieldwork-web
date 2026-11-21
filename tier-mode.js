const pageTier = new URLSearchParams(location.search).get("tier");
document.documentElement.dataset.previewTier =
  ["starter", "signature"].includes(pageTier) ? pageTier : "standard";