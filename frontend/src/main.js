import './app.css'
import App from './App.svelte'
import NotFound from './404.svelte'
import SPA from './SPA.js'
import Login from './Login.svelte'
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


// export default app
