
document.addEventListener('DOMContentLoaded', () => {
timeLineElement = document.querySelector('.timeLine');
leftDate = document.getElementById('firstTime');
rightDate = document.getElementById('lastTime');

const now = new Date();

rightDate.textContent = now.toLocaleDateString();
leftDate.textContent = new Date(Date.UTC(2024, 0, 1)).toLocaleDateString();

const startDate = new Date(Date.UTC(2024, 0, 1));
const endDate = now;

    function parseDateFromData(s) {
        if (!s) return null;
        // akzeptiert "DD.MM.YYYY", "D.M.YYYY" oder ISO "YYYY-MM-DD"
        if (s.includes('.')) {
            const parts = s.split('.');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        // fallback: Date kann ISO-Strings zuverlässig parsen
        const d = new Date(s);
        return isNaN(d) ? null : d;
    }
projButtons = document.getElementsByClassName('project-button')
    for (let i = 0; i < projButtons.length; i++) {
        const btn = projButtons[i];
        const pd = parseDateFromData(btn.dataset.Date || btn.dataset.date);
        if (!pd) {
            console.warn('Ungültiges Datum für Button', btn, btn.dataset.Date);
            continue;
        }
        let ratio = (pd - startDate) / (endDate - startDate);
        ratio = Math.max(0, Math.min(1, ratio)); // clamp 0..1
        btn.style.left = (ratio * 100) + '%';
        btn.style.position = 'absolute';
        btn.style.transform = 'translate(-50%, -50%)';
    }
});
