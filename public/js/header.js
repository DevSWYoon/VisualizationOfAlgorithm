const headerContainer = document.querySelector('.header-container');
fetch('../header.html')
    .then(res => res.text())
    .then(html => {
        headerContainer.innerHTML = html;
    });


