function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}
document.querySelector("form")?.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(".auth-card").classList.add("shake");

  setTimeout(() => {
    document.querySelector(".auth-card").classList.remove("shake");
  }, 300);
});
