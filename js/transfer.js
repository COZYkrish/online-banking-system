function transferMoney() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const receiverAccountNumber =
    document.getElementById("receiverAccount").value;
  const amount =
    document.getElementById("amount").value;

  fetch("http://localhost:5000/api/account/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiverAccountNumber, amount }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("message").innerText = data.message;
    })
    .catch(() => {
      document.getElementById("message").innerText =
        "Transfer failed";
    });
}
