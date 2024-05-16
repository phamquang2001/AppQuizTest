export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
export const sliceFirstSpace =  (str: string) =>{
  return str.substring(0, str.indexOf(' '))
}