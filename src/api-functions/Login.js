export default async function Login(email, password) {
  return await fetch("https://us-central1-shownxt.cloudfunctions.net/api/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(JSON.stringify(json));
    })
    .catch((error) => console.error(error));
}
