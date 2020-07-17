import { goBack } from './global/func.js';
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.back-button')) {
        goBack('.back-button');
    }
    const specialPlan = document.querySelector('#specialPlan');
    let specialPlanAvailable = true;
    if (!specialPlanAvailable) {
        specialPlan.style.display = 'none';
    }
});
