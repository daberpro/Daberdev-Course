import './app.css'
import App from './App.svelte'
import Courses from './Courses.svelte'
import News from './News.svelte'
import Terms from './Terms.svelte'
import Users from './Users.svelte'
import NotFound from './404.svelte'
import SPA from './SPA'

const router = new SPA();

function verify(params){
  return new Promise((res,rej)=>{
    (async ()=>{
      if(params.get('token') && params.get('refreshToken')){
        const check = await fetch('http://127.0.0.1:8084/verify',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ params.get('token')
          }
        }).catch(d => console.log(d));

        if(check.ok){
          const status = await check.json();
          if(!(status.status === 'authenticate')){
            return rej(false);
          }else{
            localStorage.setItem('daberdev-tokens',JSON.stringify({
              token: params.get('token'),
              refreshToken: params.get('refreshToken')
            }));
            location.href = `http://${location.host}/`;
            return res(true);
          }
        }

        return rej(false);

      }else{

        const tokens = JSON.parse(localStorage.getItem('daberdev-tokens'));
        if(!tokens) return rej(false);
        let check = await fetch('http://127.0.0.1:8084/verify',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ tokens.token
          }
        }).catch(d => console.log(d));

        if(check.ok){
          const status = await check.json();
          if(!(status.status === 'authenticate')){
            return rej(false);
          }else{
            return res(true);
          }
        }

        check = await fetch('http://127.0.0.1:8083/token',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ tokens.refreshToken
          }
        }).catch(d => console.log(d));

        if(check.ok){
          const status = await check.json();
          if(!(status.token)){
            return rej(false);
          }else{
            localStorage.setItem('daberdev-tokens',JSON.stringify({
              token: status.token,
              refreshToken: tokens.refreshToken
            }));
            location.href = `http://${location.host}/`;
            return res(true);
          }
        }else{
          return rej(false);
        }

      }
    })()    
  });
}

router.register("/",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new App({
      target: document.getElementById('app')
    })
  }
})

router.register("/courses",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new Courses({
      target: document.getElementById('app')
    })
  }
})


router.register("/terms",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new Terms({
      target: document.getElementById('app')
    })
  }
})

router.register("/news",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new News({
      target: document.getElementById('app')
    })
  }
})

router.register("/users",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new Users({
      target: document.getElementById('app')
    })
  }
})

router.register("404",{
  async render({params}){
    if(!(await verify(params).catch(d => console.log(d)))){
      location.href = `http://${location.hostname}:5173/profile`;
      return;
    };
    return new NotFound({
      target: document.getElementById('app')
    })
  }
})

router.render();