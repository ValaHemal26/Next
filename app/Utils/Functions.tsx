import { redirect } from "next/navigation";


export function getCookie(name: string) {
    if (typeof (document) !== "undefined") {  
        const cookies = document?.cookie.split("; ");
        for (let i = 0; i < cookies?.length; i++) {
            const parts = cookies[i].split("=");
            if (parts[0] === name) {
            return parts[1];
            }
        }   
        return "";
    }
}
export function setCookie(name: string, value: string) {
    document.cookie =  name + "=" + value + "; path=/;";
}
export function isTokenExists(){
   return getCookie("token") ?  true : false;
}
export function logout() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        document.cookie = name + "=; Max-Age=0; path=/;";
    }
}

export  function isRoleExists(role:string){
    let userObj = {};
    userObj =  getCookie("user");
    
    user = JSON.parse(userObj);
    if ( !userObj) {
        redirect("/login"); 
    }
    return user.roles?.includes(role) ? true : false;


}