document.querySelector("form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const card = document.querySelector(".auth-card");
  card.classList.add("shake");

  setTimeout(() => {
    card.classList.remove("shake");
  }, 300);

  // 👇 collect form data
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 👇 choose API based on page
  const isRegisterPage = window.location.pathname.includes("register");
  const url = isRegisterPage
    ? "http://localhost:5000/api/auth/register"
    : "http://localhost:5000/api/auth/login";

  const body = isRegisterPage
    ? { name, email, password }
    : { email, password };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // 👇 success handling
    if (!isRegisterPage) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Registered successfully");
      window.location.href = "login.html";
    }

  } catch (err) {
    alert("Server not responding");
  }
});
