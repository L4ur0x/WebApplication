
let buttons = document.getElementsByClassName('project-button')
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function() {
        target = 'textfieldContainer'+String(buttons[i].dataset.projectid)
        document.getElementById(target).style.zIndex = 1;
        array = document.getElementsByClassName('ProjectField');
        for (let j = 0; j < array.length; j++) {
            if (array[j].id !== target){
            array[j].style.zIndex = 0; 
            }
        }

})};