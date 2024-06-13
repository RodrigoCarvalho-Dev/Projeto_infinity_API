
const form = document.querySelector(`#form`);
const section_local = document.querySelector(`#local_users`);
const button_reset = document.querySelector(`#button_reset`);
const select_name = document.querySelector(`#name`);
const footer = document.querySelector("#footer");
const main = document.querySelector("#main");
const img_rodrigo = document.querySelector("#img_rodrigo");
const conteiner_button = document.querySelector("#conteiner_button");
const conteiner_button_footer = document.querySelector("#conteiner_button_footer");
const button = document.getElementsByClassName("button");
const conteiner_button_main = document.querySelector("#conteiner_button_main");
const text = document.getElementById(`text`);
const User_name_Rodrigo = document.querySelector("#user_Name_Rodrigo");
const body = document.querySelector("body");
const header = document.querySelector(`#header`);

Rodrigo_User();

window.addEventListener("scroll" , () => {

    if ( window.scrollY >= 100){

        header.style.borderBottom = "3px double #ffffff2a";
        header.style.transition = 0.1 + "s";


   } else if ( window.scrollY <= 100){
        header.style.borderBottom = "1px double #fff";
        header.style.transition = 0.1 + "s";
    }

});



async function find_User(){
    try{
    const res_api = await fetch(`https://api.github.com/users/${select_name.value}`);
            if( !res_api.ok ){
                throw new Error(res_api.status)
            };

                const res = await res_api.json()

                const name_user = document.createElement("h2")
                const img_avatar = document.createElement("img")
                const bio = document.createElement("p");
                const section_content = document.createElement("section")
                const data_creation = document.createElement("p");
                const url_user = document.createElement("a");
                
                bio.textContent = `bio : ${res.bio}`
                name_user.textContent = `User name : ${res.login}`
                img_avatar.src = res.avatar_url
                data_creation.textContent = `cration of the accont : ${res.created_at}`
                url_user.textContent = `link do gitHub : ${res.html_url}`

                img_avatar.style.borderRadius = "50%"
                img_avatar.style.border = "7px solid #0000001d"

                section_content.append(name_user,img_avatar,bio,data_creation,url_user);
                section_local.appendChild(section_content);

                
                section_content.style.display = "flex"
                section_content.style.gap = "20px";
                section_content.style.flexDirection = "column";
                section_content.style.justifyContent = "center"
                section_content.style.alignItems = "center"
                
                
                const title_project = document.createElement("h2")
                title_project.textContent = `Projects of ${res.name}`
                section_local.appendChild(title_project)
                
                localStorage.setItem("Name", name_user);
                localStorage.setItem("Img" , img_avatar);
                localStorage.setItem("Biografy",bio);
                localStorage.setItem("data_creation",data_creation);


               await fetch(`https://api.github.com/users/${select_name.value}/repos`).then(async response => {
                    response_repos = await response.json()
                    response_repos.forEach(element => {

                        const project_name = document.createElement("p");
                        const data_project = document.createElement("p");
                        const section_project = document.createElement("section");
                        const language = document.createElement("p");
                        const url_project = document.createElement("a");
                        

                        
                        project_name.textContent = `Name of project : ${element.name} `;
                        data_project.textContent = `creation of the project : ${element.created_at}`;
                        language.textContent = `linguage more used : ${element.language}`;
                        if (element.language === "JavaScript"){
                            language.style.color = "yellow";
                        }else if(element.language === "TypeScript"){
                            language.style.color = "blue";
                        }else if (element.language === "HTML"){
                            language.style.color = "rgba(255, 165, 0, 0.8)";
                        }else if (element.language === "CSS"){
                            language.style.color = "rgba(173, 216, 230, 0.8)"
                        }else if (element.language === "Rust"){
                            language.style.color = "orange"
                        }else if (element.language === "Java"){
                            language.style.color = "rgba(255, 140, 0, 0.5)"
                        }else if (element.language === "Ruby"){
                            language.style.color = "red"
                        }else if (element.language === "Python"){
                            language.style.backgroundClip = "text"
                            language.style.backgroundImage = "linear-gradient( to right, yellow 10% , blue 50% )"
                            language.style.color = "transparent"
                        }else if (element.language === "null"){
                            language.textContent = "there is no Language used"
                        }

                        url_project.textContent = `link do Projeto : ${element.html_url}`;
                       
                        section_project.append(project_name,data_project,language,url_project)
                        section_local.append(section_project);

                        section_project.style.backgroundColor = "#00000025"
                        section_project.style.width = "80%"
                        section_project.style.border = "1px solid gray"
                        section_project.style.padding = "1em"
                        section_project.style.display = "flex"
                        section_project.style.flexDirection = "column"
                        section_project.style.gap = "1em"
                       

                        localStorage.setItem("Name_project",project_name);
                        localStorage.setItem("Data_project",data_project);
                        localStorage.setItem("language_project",language);
                        localStorage.setItem("URL_project",url_project);

                    });
                     
                    if(!response.ok){
                        throw new Error(response.status)
                    }
                });

    }catch(error){

        
        const error_user = document.createElement("p");

        error_user.textContent = `${error} , try again !`
        
        error_user.style.color = "red"

        section_local.appendChild(error_user);

    }
}


async function Rodrigo_User(){
    
        try {
            const api_rodrigo = await fetch(`https://api.github.com/users/RodrigoCarvalho-Dev`);
            if(!api_rodrigo.ok){
                throw new Error(api_rodrigo.status)
            }

            const response = await api_rodrigo.json();

            User_name_Rodrigo.textContent = `${response.login}`

            img_rodrigo.src = response.avatar_url

           

        } catch (error) {
            img_rodrigo.style.display = "none"
            console.log(` ${error} , try again!`)

        }
}



form.addEventListener("submit", (event) => {

    section_local.innerHTML = "";

    

    event.preventDefault();

    find_User();

    body.style.backdropFilter = " blur(2000px)"

    main.style.height = "auto"

    section_local.style.padding = "2em";
    section_local.style.display = "flex";
    section_local.style.gap = "20px";
    section_local.style.flexDirection = "column";
    section_local.style.justifyContent = "center";
    section_local.style.AlignItems = "center";

    text.style.display = "none"

});

button_reset.addEventListener("click", (event) => {
    event.preventDefault();

    section_local.style.display = "none";
    main.style.height = "70vh"
    text.style.display = "block"


});


