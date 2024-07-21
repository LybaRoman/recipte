document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;

    function showPage(page) {
        document.querySelectorAll('.cuisine').forEach((pageDiv, index) => {
            pageDiv.classList.remove('active');
            if (index === page - 1) {
                pageDiv.classList.add('active');
            }
        });
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === page - 1) {
                dot.classList.add('active');
            }
        });
    }

    showPage(currentPage);

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showPage(index + 1);
        });
    });
   
    

});
function navigateTo(item) {
    window.location.href = `searchRecept/searchRecepts.html?search=${item}`;
}

const ApiURL =`https://api.spoonacular.com/recipes/complexSearch?apiKey=343928d0573d4e82906d31a105cea10b&number=8&diet=Vegetarian`;
const request = new XMLHttpRequest();

const divItem = document.querySelector('.aaa');
request.open('GET',ApiURL);
request.onload = function(){
    if (request.status === 200) {
        let data = JSON.parse(request.responseText);
       
        
        data.results.forEach((result) => {
            if (result.title.length * 10 > 200) { // Перевірка ширини тексту
                titleClass = "min"; // Якщо текст ширший за 400, розмір шрифту зменшується
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