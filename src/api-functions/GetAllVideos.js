export default async function GetAllVideosFunc() {
    return await fetch('https://us-central1-shownxt.cloudfunctions.net/api/Videos', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        let answer = [];
        json.forEach((video) => {
          answer.push(video);
        });
        return answer
      })
      .catch((error) => {
        console.error(error);
      return [];
      });
}
