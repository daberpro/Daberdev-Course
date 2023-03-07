export default class SPA{
  components = new Map();
  current = {};
  constructor(){

    addEventListener("DOMContentLoaded",()=>{
        document.body.onclick = (e)=>{
            if(e.target.matches("[data-link]")){
                e.preventDefault();
                this.navigateTo(e.target.getAttribute("href"));
            }
        }
    });

    onpopstate = (d)=>{
      this.render({params: new URLSearchParams(new URL(location.href).search),...d});
    }
  }

  navigateTo(url,props = {}){
    history.replaceState(props,null,url);
    this.render();
  }

  register(path,component){
    this.components.set(path,component);
    if(!/\/$/igm.test(path)) this.components.set(path+"/",component);
  }

  checkPath(path){
    return this.components.has(path.replace(/(#.*|\&.*|\?.*)/igm,""));
  }

  render(){

    if(Object.keys(this.current).length > 0){
      this.current.$destroy();
    }

    if(this.checkPath(location.pathname)){
      this.current = this.components.get(location.pathname.replace(/(#.*|\&.*|\?.*)/igm,"")).render({params: new URLSearchParams(new URL(location.href).search)});
    }else{
      this.current = this.components.get("404").render({params: new URLSearchParams(new URL(location.href).search)});
    }
  }

}