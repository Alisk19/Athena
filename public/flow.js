const FLOW_STEPS = [
  'login',
  'upload',
  'search',
  'document',
  'chat'
];

const STEP_TO_PATH = {
  login: '/login.html',
  upload: '/upload.html',
  search: '/search.html',
  document: '/document.html',
  chat: '/chat.html'
};

function getProgressStep(){
  const step = localStorage.getItem('athena.progress');
  if(!step || !FLOW_STEPS.includes(step)) return 'login';
  return step;
}

function setProgressStep(step){
  if(FLOW_STEPS.includes(step)){
    localStorage.setItem('athena.progress', step);
  }
}

function requireStep(required){
  const current = getProgressStep();
  const curIdx = FLOW_STEPS.indexOf(current);
  const reqIdx = FLOW_STEPS.indexOf(required);
  if(curIdx < reqIdx){
    // redirect to current unlocked page
    const path = STEP_TO_PATH[current] || '/login.html';
    if(location.pathname !== path){
      location.replace(path);
    }
  }
}

function advanceTo(nextStep){
  setProgressStep(nextStep);
}

function initNavGuards(){
  const current = getProgressStep();
  const curIdx = FLOW_STEPS.indexOf(current);
  const links = document.querySelectorAll('.nav a');
  links.forEach((a)=>{
    // find target step by href
    const url = new URL(a.getAttribute('href'), location.origin);
    const step = Object.entries(STEP_TO_PATH).find(([,p])=> p === url.pathname)?.[0];
    if(!step) return;
    const idx = FLOW_STEPS.indexOf(step);
    if(idx > curIdx){
      a.classList.add('disabled');
      a.addEventListener('click', (e)=>{
        e.preventDefault();
      });
    }
  });
}

function redirectToCurrent(){
  const current = getProgressStep();
  const path = STEP_TO_PATH[current] || '/login.html';
  if(location.pathname !== path){
    location.replace(path);
  }
}

window.AthenaFlow = { getProgressStep, setProgressStep, requireStep, advanceTo, initNavGuards, redirectToCurrent };

document.addEventListener('DOMContentLoaded', initNavGuards);


