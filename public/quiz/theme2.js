
let linkElement = document.getElementById('theme-stylesheet');
let isDark = localStorage.getItem('isDark');
let buttonText = document.getElementById('theme-button')

export function checkTheme(white, black) {

    if (isDark === null) {
        localStorage.setItem('isDark', false);
    } else {

        isDark = isDark === 'true';

        if(isDark){
            linkElement.href = black
            buttonText.innerText = 'White theme'
        } else {
            linkElement.href = white
            buttonText.innerText = 'Black theme'
        }
    }
}


export function changeTheme(white, black) {

    isDark = localStorage.getItem('isDark') === 'true';


    if (isDark) {
        localStorage.setItem('isDark', false);
        buttonText.innerText = 'Black theme'
        linkElement.href = white;
    } else {
        localStorage.setItem('isDark', true);
        buttonText.innerText = 'White theme'
        linkElement.href = black
    }
}

