async function loadIndex(){
 const res = await fetch('./content/docs-index.json');
 return res.json();
}

async function loadMD(file){
 const res = await fetch('./content/'+file);
 return res.text();
}

function renderSidebar(tree){
 return tree.map(i=>`<a href="#${i.path}">${i.title}</a>`).join("");
}

function flatten(tree){
 let r=[];
 tree.forEach(i=>{
  if(i.file) r.push(i);
  if(i.children) r=r.concat(flatten(i.children));
 });
 return r;
}

function generateTOC(html){
 const tmp=document.createElement("div");
 tmp.innerHTML=html;
 const headers=tmp.querySelectorAll("h2");
 return [...headers].map(h=>`<a href="#">${h.innerText}</a>`).join("<br>");
}

async function init(){
 const tree=await loadIndex();
 document.getElementById("nav").innerHTML=renderSidebar(tree);

 const flat=flatten(tree);

 function route(){
  const path=location.hash.replace("#","")||"/";
  const page=flat.find(p=>p.path===path);
  if(!page) return;

  loadMD(page.file).then(md=>{
   const html=marked.parse(md);
   document.getElementById("content").innerHTML=html;
   document.getElementById("toc").innerHTML=generateTOC(html);
  });
 }

 window.addEventListener("hashchange",route);
 route();
}

init();
