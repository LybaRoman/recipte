const mainDiv = document.querySelector('.main');
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');
const ApiURL =`https://api.spoonacular.com/recipes/complexSearch?apiKey=343928d0573d4e82906d31a105cea10b&query=${search}&number=44`;
const request = new XMLHttpRequest();


mainDiv.innerHTML = `
<div class="popularCat"><h1>Search for recipes "${search}"</h1></div>
            <div class="itemContainer">
                <div class="aaa">
                </div>
            </div>  
                `
 
                
const divItem = document.querySelector('.aaa');
request.open('GET',ApiURL);
request.onload = function(){
    if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        console.log(data)

        data.results.forEach((result) => {
            if (result.title.length * 10 > 250) { // Перевірка ширини тексту
                titleClass = "min"; 

                divItem.innerHTML += `
                <div class="itemRandom">
                    <div class="itemFoto"> 
                        <img src="${result.image}" alt="">
                    </div>
                    <div class="title  ${titleClass}">
                        <p>${result.title}</p>
                    </div>
                    <div class="sulka"><a href="">View more</a></div>
                </div>
                `;
            }
            else{
                divItem.innerHTML += `
                <div class="itemRandom">
                    <div class="itemFoto"> 
                        <img src="${result.image}" alt="">
                    </div>
                    <div class="title">
                        <p>${result.title}</p>
                    </div>
                    <div class="sulka"><a href="">View more</a></div>
                </div>
                `;
            }
            
        })
    }
    else {
        console.error('Error:', request.status, request.statusText);
    }
}
request.onerror = function() {
    console.error('Запит не вдався!');
};
request.send();


