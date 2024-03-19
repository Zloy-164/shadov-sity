const jsondata_str = localStorage.getItem("jsondata_posts");
if (jsondata_str == null) {
    localStorage.setItem("jsondata_posts", "[]");
    jsondata_str = "[]";
}
var posts = JSON.parse(jsondata_str);
function afterInit(){
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
  }
}
function loadPosts(){
  const posts_div = document.getElementById("post_list");
  posts_div.innerHTML = "";
  var idx = 0;
  for (const post of posts) {
      let elem_div = document.createElement("div");
      let input_elem_div = document.createElement("div");
      let input_elem = document.createElement("textarea");
      let del_btn_div = document.createElement("div");
      let del_btn = document.createElement("button");
      let hr = document.createElement("hr");
      hr.setAttribute("class", "solid");
      del_btn.innerHTML = "Удалить";
      del_btn.id = "del" + idx;
      elem_div.setAttribute("class", "elem_div");
      del_btn_div.setAttribute("class", "del_btn_div");
      del_btn.setAttribute("class", "del_btn");
      input_elem_div.setAttribute("class", "input_elem_div");
      input_elem.setAttribute("class", "input_elem");

      input_elem.value = post;
      elem_div.setAttribute("class", "post_div");
      input_elem_div.appendChild(input_elem);
      del_btn_div.appendChild(del_btn);
      elem_div.appendChild(input_elem_div);
      elem_div.appendChild(del_btn_div);
      elem_div.appendChild(hr);
      posts_div.appendChild(elem_div);
      idx ++;
  }
}
function save(){
  localStorage.setItem("jsondata_posts", JSON.stringify(posts));
}

const del_btns = document.getElementsByClassName("del_btn");
function delBtnClickEventHandler(event){
  let btn_id = parseInt(event.target.id.split("del")[1]);
  console.log("Button #"+ btn_id + " clicked")
  posts.splice(btn_id, 1);
  save();
  event.target.parentElement.parentElement.remove();
  event.target.removeEventListener("click", delBtnClickEventHandler);

}
function registerListeners(){
  for(const del_btn of del_btns){
    del_btn.addEventListener("click", delBtnClickEventHandler);
  }
}
function removeListeners(){
  for(const del_btn of del_btns){
    del_btn.removeEventListener("click", delBtnClickEventHandler);
  }
}