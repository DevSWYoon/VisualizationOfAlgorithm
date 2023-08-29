const headerContainer = document.querySelector('.header-container');

fetch('../header.html')
    .then(res => res.text())
    .then(html => {
        headerContainer.innerHTML = html;

        const menuToggle = document.getElementById("menuToggle");
        const menu = document.querySelector(".menu");

        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    });


