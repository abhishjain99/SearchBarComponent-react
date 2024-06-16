export default function throttle(func: (...args: any[]) => void, limitTime:number) {
  let elapsedTime: number;
  let timeout: ReturnType<typeof setTimeout>;
  return (...args:any) => {
    if(!elapsedTime) {
      func(...args);
      elapsedTime = Date.now();
    } else {
      clearTimeout(timeout);
      const callbackFunc = () => {
        if(Date.now() - elapsedTime >= limitTime) {
          func(...args);
          elapsedTime = Date.now();
        }
      }
      timeout = setTimeout(callbackFunc, limitTime - Date.now() - elapsedTime);
    }
  }
}


// Check when the function ran last time
// if it did not run the last time,
  // call the func(...args)
  // set the elapsed time to now()
// if it did run the last time, we need to check if now is the time to run the function again after elapsing the limitTime.
  // And till then set timeout for limit - (current time - elapsed time)