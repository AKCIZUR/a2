async function loadIndex(){
 return fetch('./content/docs-index.json').then(r=>r.json());
}
async function loadMD(f){
 return fetch('./content/'+f).then(r=>r.text());
}

function renderSidebar(tree,current){
 function walk(items){
  return items.map(i=>{
   if(i.children){
    return `<div><strong>${i.title}</strong>${walk(i.children)}</div>`;
   }
   return `<a class="${current===i.path?'active':''}" href="#${i.path}">${i.title}</a>`;
  }).join("");
 }
 return walk(tree);
}

function flatten(tree){
 let r=[];
 tree.forEach(i=>{
  if(i.file) r.push(i);
  if(i.children) r=r.concat(flatten(i.children));
 });
 return r;
}

function toc(html){
 const tmp=document.createElement('div');
 tmp.innerHTML=html;
 const h=[...tmp.querySelectorAll('h2')];
 return h.map(x=>`<div>${x.innerText}</div>`).join('');
}

async function init(){
 const tree=await loadIndex();
 const flat=flatten(tree);

 function route(){
  const path=location.hash.replace('#','')||'/';
  const page=flat.find(p=>p.path===path);
  if(!page) return;

  loadMD(page.file).then(md=>{
   const html=marked.parse(md);
   document.getElementById('content').innerHTML=html;
   document.getElementById('toc').innerHTML=toc(html);
   document.getElementById('nav').innerHTML=renderSidebar(tree,path);
   window.scrollTo(0,0);
  });
 }

 window.addEventListener('hashchange',route);
 route();
}

init();
