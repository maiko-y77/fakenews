// https://newsapi.org/docs/endpoints/everything API documentation for this example

const APIKEY = "48d4b784b9ea456ea3d33557029dc7cb";

const container = document.querySelector(".news");
const englishButton = document.querySelector("#english-btn");
const frenchButton = document.querySelector("#french-btn");
const form = document.querySelector("#searchform")
const pageSizeSelection = document.querySelector("#pageSize");

let language = 'en';
let pageSize = 10;

const getNews = (language = "en", pageSize = "10") => {
    fetch("https://newsapi.org/v2/everything" +
        "?q=bitcoin" +
        `&language=${language}` +
        `&pageSize=${pageSize}` +
        "&apiKey=9ff9625e03ed440d861aff93a467e5fe"
    )
        .then(res => res.json())
        .then(data => {
            let news = data.articles;
            let newCards = "";
            news.forEach((item) => {
                let date = new Date(item.publishedAt);
                newCards += `
                <div class="card">
                    <img width="100%" src="${item.urlToImage ? item.urlToImage : "./assets/noimage.jpg"}" />
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p><b>Date:</b> ${date.toDateString()}</p>
                    <a id="goto-btn" href="${item.url}">Go to News</a>
                </div>
            `;
            })
            container.innerHTML = newCards;
        })
        .catch(err => console.log(err));
}

englishButton.addEventListener("click", () => {
    language = "en";
    getNews(language, pageSize)
})

frenchButton.addEventListener("click", () => {
    language = "fr"
    getNews(language, pageSize)
})

pageSizeSelection.addEventListener("change", (ev) => {
    pageSize = ev.target.value;
    getNews(language, pageSize)
})

form.addEventListener('submit', (e) => {
    form = form.elements.value;
    getNews(language, pageSize)
})

getNews(language, pageSize)


// function checkImage(image){
//     if(image !== null){
//         return image
//     }else{
//         return "./assets/noimage.jpg"
//     }
// }

// Ternary Operator

// item.urlToImage ? item.urlToImage : "./assets/noimage.jpg"
// condition ? true : false
// console.log(5 > 4 ? "Yes, it is" : "No, its not");  
// after ?(question mark) you can return true or after :(colon) you can return false
// console.log(3 > 4 && "Yes, its is"); // only check true