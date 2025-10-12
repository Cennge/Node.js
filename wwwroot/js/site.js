document.addEventListener("DOMContentLoaded", () => {
  const tree = document.querySelector(".tree");
  if (!tree) return;

  // show root list (keep children collapsed)
  const root = tree.querySelector(":scope > ul");
  if (root) root.style.display = "block";

  // delegate clicks to any future/current .toggle
  tree.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle");
    if (!btn || !tree.contains(btn)) return;
    const li = btn.closest("li");
    if (!li) return;
    li.classList.toggle("expanded");
  });
});