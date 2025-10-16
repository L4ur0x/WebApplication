
let buttons = document.getElementsByClassName('project-button')
zCounter = 10;
document.getElementsByClassName('active').zIndex = zCounter;
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(ev) {
        const btn = ev.currentTarget;
        const projectId = btn.dataset.projectid;
        const targetId = 'textfieldContainer' + projectId;
        const target = document.getElementById(targetId);
        const currentElement = document.querySelector('.active');

        if (!target) return;
        if (currentElement === target) return; // already open

        // ensure target is above current before starting enter animation
        target.style.zIndex = ++zCounter;
        target.classList.add('panel-enter');
        // force layout
        target.getBoundingClientRect();
        target.classList.add('panel-enter-active');

        // cleanup/finish for enter (once)
        const onEnterEnd = (e) => {
            if (e.target !== target) return;
            target.classList.remove('panel-enter', 'panel-enter-active');
            target.classList.add('active');
            // keep z-index if you want it persistent or reset: target.style.zIndex = '';
        };
        target.addEventListener('transitionend', onEnterEnd, { once: true });

        if (currentElement && currentElement !== target) {
            // ensure current stays above while exiting
            // start exit animation next frame
            requestAnimationFrame(() => {
                currentElement.classList.add('panel-exit');
            });

            // remove 'active' only when exit finished
            const onExitEnd = (e) => {
                if (e.target !== currentElement) return;
                currentElement.classList.remove('panel-exit', 'active');
                // optional: reset inline z-index
                // currentElement.style.zIndex = '';
            };
            currentElement.addEventListener('transitionend', onExitEnd, { once: true });
        }
    });
}