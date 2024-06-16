export default function debounce(func: (...args: any[]) => {}, waitTime:number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args:any) => {
    const callbackFunc = () => {
      clearTimeout(timeout);
      func(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(callbackFunc, waitTime);
  }
}

// call normal function
  // func(...args)
// now call it in setTimeout function with a callback function and waiting time
  // setTimeout(() => func(...args), waitTime)
  // save this in a variable 'timeout' to clear it later
// clear the timeout before setting a new one
  // clearTimeout(timeout)
// convert the callback function to variable and call it in setTimeout and then again clearTimeout in callback function to reset the time (line 4-7)
// Now retun this whole code as a debounced function of original function