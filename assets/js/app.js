let flat=[],fuse;

async function loadIndex(){
 return fetch('./content/docs-index.json').then(r=>r.json());
}
async function loadMD(f){
 return fetch('./content/'+f).then(r=>r.text());
}

function flatten(tree){
 let r=[];
 tree.forEach(i=>{
  if(i.file) r.push(i);
  if(i.children) r=r.concat(flatten(i.children));
 });
 return r;
}

function renderSidebar(tree,current){
 return tree.map(i=>{
  if(i.children){
    return `<div><strong>${i.title}</strong>${renderSidebar(i.children,current)}</div>`;
  }
  return `<a class="${current===i.path?'active':''}" href="#${i.path}">${i.title}</a>`;
 }).join("");
}

function generateTOC(){
 const headers=[...document.querySelectorAll("h2")];
 const toc=headers.map(h=>{
  const id=h.innerText.replaceAll(" ","-");
  h.id=id;
  return `<a href="#${id}">${h.innerText}</a>`;
 }).join("");

 document.getElementById("toc").innerHTML=toc;

 window.addEventListener("scroll",()=>{
  let current="";
  headers.forEach(h=>{
    if(window.scrollY >= h.offsetTop-80) current=h.id;
  });
  document.querySelectorAll(".toc a").forEach(a=>{
    a.classList.toggle("active",a.getAttribute("href")==="#"+current);
  });
 });
}

async function init(){
 const tree=await loadIndex();
 flat=flatten(tree);
 fuse=new Fuse(flat,{keys:['title','path']});

 function route(){
  const path=location.hash.replace('#','')||'/';
  const page=flat.find(p=>p.path===path);
  if(!page) return;

  loadMD(page.file).then(md=>{
   const html=marked.parse(md);
   document.getElementById('content').innerHTML=html;
   document.getElementById('nav').innerHTML=renderSidebar(tree,path);
   generateTOC();
  });
 }

 window.addEventListener('hashchange',route);
 route();

 // search
 const overlay=document.getElementById('searchOverlay');
 document.getElementById('openSearch').onclick=()=>overlay.style.display='flex';
 window.addEventListener('keydown',e=>{
  if(e.ctrlKey && e.key==='k'){e.preventDefault();overlay.style.display='flex';}
 });

 document.getElementById('searchInput').oninput=(e)=>{
  const res=fuse.search(e.target.value);
  document.getElementById('results').innerHTML=res.map(r=>`<div><a href="#${r.item.path}">${r.item.title}</a></div>`).join('');
 };
}

init();
