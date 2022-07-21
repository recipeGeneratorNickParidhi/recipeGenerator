// module used for function that toggles classes as needed for the slide down menu

export default function burgerMenu () {
    document.querySelector('#menuButton').addEventListener('click', function () {
        document.querySelector('#menu').classList.toggle('showMenu');
        document.querySelector('#menuButton').classList.add('hidden');
        document.querySelector('#closeButton').classList.remove('hidden');
    })
    document.querySelector('#closeButton').addEventListener('click', function () {
        document.querySelector('#menu').classList.toggle('showMenu');
        document.querySelector('#menuButton').classList.remove('hidden');
        document.querySelector('#closeButton').classList.add('hidden');
    })

}