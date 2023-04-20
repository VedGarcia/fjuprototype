const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCxHU5ZEtPP8CGRjjzNRW7Sw&part=snippet%2Cid&order=date&maxResults=8";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "27c231645amshfabca3d1ecccfb3p19f05ajsn871986687ab2",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    const urlYouTubeSerch = "https://www.youtube.com/watch?v=";
    
    let view = `
    ${videos.items
      .map(
        (video) => `
    <div class="group relative cursor-pointer">
      <a href="${urlYouTubeSerch+video.id.videoId}" target="_blank">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${
          video.snippet.description
        }" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-100">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
          </a>
        </div>
    `
      )
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.error(error);
  }
})();
