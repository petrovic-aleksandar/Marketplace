import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor")
  const token = localStorage.getItem("loggedUserToken")

  const newReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`    
    }
  })

  return next(newReq);
};
