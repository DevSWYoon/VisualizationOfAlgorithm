const footerContainer = document.querySelector('.footer-container');

fetch('../footer.html')
    .then(res => res.text())
    .then(html => {
        footerContainer.innerHTML = html;
    });