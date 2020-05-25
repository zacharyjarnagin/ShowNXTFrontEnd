export default function Login(setAnswer) {
  async function login() {
    await fetch('https://us-central1-shownxt.cloudfunctions.net/api/login', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        let answer = [];
        json.forEach((video) => {
          answer.push(video);
        });
        setAnswer(answer);
      })
      .catch((error) => console.error(error));
  }
  login();
}
