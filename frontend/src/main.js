import AOS from 'aos' 
import './app.css'
import 'aos/dist/aos.css'
import App from './App.svelte'
import NotFound from './404.svelte'
import SPA from './SPA.js'
import Login from './Login.svelte'
import Logout from './Logout.svelte'
import Profile from './user-view/profile.svelte'
import MyCourse from './user-view/my-course.svelte'
import PaymentSuccess from './payment-view/success.svelte'
import PaymentFailed from './payment-view/failed.svelte'
import PaymentError from './payment-view/error.svelte'

const route = new SPA();
route.register("/",{
  render(){
    return new App({
      target: document.getElementById('app')
    })
  }
})
route.register("404",{
  render(){
    return new NotFound({
      target: document.getElementById('app')
    })
  }
})
route.register("/login",{
  render({params}){
    return new Login({
      target: document.getElementById('app')
    })
  }
})
route.register("/logout",{
  render({params}){
    return new Logout({
      target: document.getElementById('app')
    })
  }
})
route.register("/profile",{
  render({params}){
    return new Profile({
      target: document.getElementById('app'),
      props:{
        tokens: {
          refreshToken: params.get("ref_token"),
          token: params.get("token")
        }
      }
    })
  }
})
route.register("/profile/my-course",{
  render({params}){
    return new MyCourse({
      target: document.getElementById('app')
    })
  }
})
route.register("/payment-success",{
  render({params}){

    return new PaymentSuccess({
      target: document.getElementById('app'),
      props: {
        order_id: params.get("order_id")
      }
    })
  }
})
route.register("/payment-failed",{
  render({params}){
    return new PaymentFailed({
      target: document.getElementById('app'),
      props: {
        order_id: params.get("order_id")
      }
    })
  }
})
route.register("/payment-error",{
  render({params}){
    return new PaymentError({
      target: document.getElementById('app'),
      props: {
        order_id: params.get("order_id")
      }
    })
  }
})
route.render();
AOS.init();


// export default app
