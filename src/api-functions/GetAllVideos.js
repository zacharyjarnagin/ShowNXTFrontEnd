export default function GetAllVideosFunc(setAnswer) {
  async function getVideos() {
    let userRequests = [];
    console.log("in func");
    await fetch('https://us-central1-shownxt.cloudfunctions.net/api/Videos', {
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
  getVideos();
}
