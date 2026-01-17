const BASE_URL="http://localhost:8080";

export const checkIfUserExists = async (user) => {

    const url = BASE_URL+"/user/login?username="+encodeURIComponent(user);
    console.log("url: "+url);

    const response = await fetch(`${url}`)
    const data = await response.json();
    return data;
}
