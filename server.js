let json = require('./conteudo.json');
const fs = require('fs');
const path = require('path');
let forDoc = false;

let textFile = forDoc ? "" : "<div style='font-family: Arial'>";
const test = "ola tudo bem";

const sort = (a, b) => {
    return a - b;
}

//Excluindo WELCOME, FORCA_ANAMNESE E DEFAULT
let grupos = [];
for(i in json){
    if(json[i][0].value.length > 0 && grupos.indexOf(json[i][0].value) == -1){
        grupos.push(json[i][0].value);
    }
}

//Separando todos os WELCOMES e Organizando
let welcomeObjects = {};
let shareObjects = {};
let journeyObjects = {};

for(i in grupos){
    welcomeObjects[grupos[i]] = [];
    shareObjects[grupos[i]] = [];
    journeyObjects[grupos[i]] = [];
    for(jor in json){
        if(json[jor][0].value && json[jor][0].value == grupos[i]) {
            if(json[jor][0].first){
                welcomeObjects[grupos[i]].push(jor);
            }
            else if(json[jor][0].last){
                shareObjects[grupos[i]].push(jor);
            }
            else{
                journeyObjects[grupos[i]].push(jor);
            }
        }
    }
    journeyObjects[grupos[i]] = journeyObjects[grupos[i]].sort();

}

if(!forDoc){

    for(i in grupos){
        let k, j = 0;
        
        textFile += "<h1 style=text-align:center>JORNADA DE " + grupos[i].slice(6) + "</h1><br>";
        
        textFile += "<b>=========================== " + welcomeObjects[grupos[i]][j] + " ===========================<br><br></b>"        
        for(el in json[welcomeObjects[grupos[i]][j]]){

            if(!json[welcomeObjects[grupos[i]][j]][0].negativeFeedback){
                if(json[welcomeObjects[grupos[i]][j]][el].type === "text"){
                    
                    textFile +=  (welcomeObjects[grupos[i]][j] + ': ').bold() + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>';
                    
                }
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "quick_reply" && !json[welcomeObjects[grupos[i]][j]][el].text.startsWith("images/")){
        
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.bold() + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].bold() + ': ' + temp + '<br>';
                }
        
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "button"){
                    
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.bold() + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].bold() + ': ' + temp + '<br>';
                }
            }
            else{
                
                if(json[welcomeObjects[grupos[i]][j]][el].type === "text"){
                    
                    textFile +=  (welcomeObjects[grupos[i]][j] + ': ').bold().fontcolor('red') + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>';
                    
                }
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "quick_reply" && !json[welcomeObjects[grupos[i]][j]][el].text.startsWith("images/")){
        
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.bold().fontcolor('red') + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].bold().fontcolor('red') + ': ' + temp + '<br>';
                }
        
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "button"){
                    
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.bold().fontcolor('red') + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].bold().fontcolor('red') + ': ' + temp + '<br>';
                }

            }
        }
        
        while(j < journeyObjects[grupos[i]].length){
            textFile += "<b>=========================== " + journeyObjects[grupos[i]][j] + " ===========================<br><br></b>"
            
            
            for(el in json[journeyObjects[grupos[i]][j]]){

                if(!json[journeyObjects[grupos[i]][j]][0].negativeFeedback){
                    if(json[journeyObjects[grupos[i]][j]][el].type === "text"){
                        
                        textFile +=  (journeyObjects[grupos[i]][j] + ': ').bold() + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>';
                        
                    }
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "quick_reply" && !json[journeyObjects[grupos[i]][j]][el].text.startsWith("images/")){
            
                        let temp = json[journeyObjects[grupos[i]][j]][el].type.bold() + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j].bold() + ': ' + temp + '<br>';
                    }
            
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "button"){
                        
                        let temp = json[journeyObjects[grupos[i]][j]][el].type.bold() + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j].bold() + ': ' + temp + '<br>';
                    }
                }
                else{
                    
                    if(json[journeyObjects[grupos[i]][j]][el].type === "text"){
                        
                        textFile +=  (journeyObjects[grupos[i]][j] + ': ').bold().fontcolor('red') + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>';
                        
                    }
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "quick_reply" && !json[journeyObjects[grupos[i]][j]][el].text.startsWith("images/")){
            
                        let temp = json[journeyObjects[grupos[i]][j]][el].type.bold().fontcolor('red') + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j].bold().fontcolor('red') + ': ' + temp + '<br>';
                    }
            
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "button"){
                        
                        let temp = json[journeyObjects[grupos[i]][j]][el].type.bold().fontcolor('red') + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '<br><br>'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '<br>';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j].bold().fontcolor('red') + ': ' + temp + '<br>';
                    }
    
                }
    
            }
            j++;
        }
        
        textFile += "<b>=========================== " + shareObjects[grupos[i]][0] + " ===========================<br><br></b>"        
        for(el in json[shareObjects[grupos[i]][0]]){

            if(!json[shareObjects[grupos[i]][0]][0].negativeFeedback){
                if(json[shareObjects[grupos[i]][0]][el].type === "text"){
                    
                    textFile +=  (shareObjects[grupos[i]][0] + ': ').bold() + json[shareObjects[grupos[i]][0]][el].text + '<br><br>';
                    
                }
                else if(json[shareObjects[grupos[i]][0]][el].type === "quick_reply" && !json[shareObjects[grupos[i]][0]][el].text.startsWith("images/")){
        
                    let temp = json[shareObjects[grupos[i]][0]][el].type.bold() + ': ' + json[shareObjects[grupos[i]][0]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].bold() + ': ' + temp + '<br>';
                }
        
                else if(json[shareObjects[grupos[i]][0]][el].type === "button"){
                    
                    let temp = json[shareObjects[grupos[i]][0]][el].type.bold() + ': ' + json[shareObjects[grupos[i]][0]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].bold() + ': ' + temp + '<br>';
                }
            }
            else{
                
                if(json[shareObjects[grupos[i]][0]][el].type === "text"){
                    
                    textFile +=  (shareObjects[grupos[i]][0] + ': ').bold().fontcolor('red') + json[shareObjects[grupos[i]][0]][el].text + '<br><br>';
                    
                }
                else if(json[shareObjects[grupos[i]][0]][el].type === "quick_reply" && !json[shareObjects[grupos[i]][0]][el].text.startsWith("images/")){
        
                    let temp = json[shareObjects[grupos[i]][0]][el].type.bold().fontcolor('red') + ': ' + json[shareObjects[grupos[i]][0]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].bold().fontcolor('red') + ': ' + temp + '<br>';
                }
        
                else if(json[shareObjects[grupos[i]][0]][el].type === "button"){
                    
                    let temp = json[shareObjects[grupos[i]][0]][el].type.bold().fontcolor('red') + ': ' + json[shareObjects[grupos[i]][0]][el].text + '<br><br>'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '<br>';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].bold().fontcolor('red') + ': ' + temp + '<br>';
                }

            }
        }
        
    }

    textFile += "</div>";
    fs.writeFile('index.html', textFile, (err) =>{
        if (err) throw err;
        console.log("File written as HTML");
    });
}
else{
    for(i in grupos){
        let k, j = 0;
        
        textFile += "JORNADA DE " + grupos[i].slice(6) + "\n";
        
        textFile += "=========================== " + welcomeObjects[grupos[i]][j] + " ===========================\n\n"
        
        for(el in json[welcomeObjects[grupos[i]][j]]){

            if(!json[welcomeObjects[grupos[i]][j]][0].negativeFeedback){
                if(json[welcomeObjects[grupos[i]][j]][el].type === "text"){
                    
                    textFile +=  (welcomeObjects[grupos[i]][j] + ': ') + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n';
                    
                }
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "quick_reply" && !json[welcomeObjects[grupos[i]][j]][el].text.startsWith("images/")){
        
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j] + ': ' + temp + '\n';
                }
        
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "button"){
                    
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j] + ': ' + temp + '\n';
                }
            }
            else{
                
                if(json[welcomeObjects[grupos[i]][j]][el].type === "text"){
                    
                    textFile +=  (welcomeObjects[grupos[i]][j] + ': ').fontcolor('red') + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n';
                    
                }
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "quick_reply" && !json[welcomeObjects[grupos[i]][j]][el].text.startsWith("images/")){
        
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.fontcolor('red') + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].fontcolor('red') + ': ' + temp + '\n';
                }
        
                else if(json[welcomeObjects[grupos[i]][j]][el].type === "button"){
                    
                    let temp = json[welcomeObjects[grupos[i]][j]][el].type.fontcolor('red') + ': ' + json[welcomeObjects[grupos[i]][j]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[welcomeObjects[grupos[i]][j]][el].buttons.length; k++){
                        temp += 'button: ' + json[welcomeObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += welcomeObjects[grupos[i]][j].fontcolor('red') + ': ' + temp + '\n';
                }

            }
        }

        while(j < journeyObjects[grupos[i]].length){

            textFile += "=========================== " + journeyObjects[grupos[i]][j] + " ===========================\n\n"            
            
            for(el in json[journeyObjects[grupos[i]][j]]){
                if(!json[journeyObjects[grupos[i]][j]][0].negativeFeedback){
                    if(json[journeyObjects[grupos[i]][j]][el].type === "text"){
                        
                        textFile +=  (journeyObjects[grupos[i]][j] + ': ') + json[journeyObjects[grupos[i]][j]][el].text + '\n\n';
                        
                    }
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "quick_reply" && !json[journeyObjects[grupos[i]][j]][el].text.startsWith("images/")){
            
                        let temp = json[journeyObjects[grupos[i]][j]][el].type + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '\n\n'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j] + ': ' + temp + '\n';
                    }
            
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "button"){
                        
                        let temp = json[journeyObjects[grupos[i]][j]][el].type + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '\n\n'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j] + ': ' + temp + '\n';
                    }
                }
                else{
                    
                    if(json[journeyObjects[grupos[i]][j]][el].type === "text"){
                        
                        textFile +=  (journeyObjects[grupos[i]][j] + ': ') + json[journeyObjects[grupos[i]][j]][el].text + '\n\n';
                        
                    }
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "quick_reply" && !json[journeyObjects[grupos[i]][j]][el].text.startsWith("images/")){
            
                        let temp = json[journeyObjects[grupos[i]][j]][el].type + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '\n\n'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j] + ': ' + temp + '\n';
                    }
            
                    else if(json[journeyObjects[grupos[i]][j]][el].type === "button"){
                        
                        let temp = json[journeyObjects[grupos[i]][j]][el].type + ': ' + json[journeyObjects[grupos[i]][j]][el].text + '\n\n'; 
                        
                        for(k = 0; k <  json[journeyObjects[grupos[i]][j]][el].buttons.length; k++){
                            temp += 'button: ' + json[journeyObjects[grupos[i]][j]][el].buttons[k].title + '\n';
                        }
                        
                        textFile += journeyObjects[grupos[i]][j] + ': ' + temp + '\n';
                    }
    
                }
    
            }
            j++;
        }

        textFile += "=========================== " + shareObjects[grupos[i]][0] + " ===========================\n\n"        
        for(el in json[shareObjects[grupos[i]][0]]){

            if(!json[shareObjects[grupos[i]][0]][0].negativeFeedback){
                if(json[shareObjects[grupos[i]][0]][el].type === "text"){
                    
                    textFile +=  (shareObjects[grupos[i]][0] + ': ') + json[shareObjects[grupos[i]][0]][el].text + '\n\n';
                    
                }
                else if(json[shareObjects[grupos[i]][0]][el].type === "quick_reply" && !json[shareObjects[grupos[i]][0]][el].text.startsWith("images/")){
        
                    let temp = json[shareObjects[grupos[i]][0]][el].type + ': ' + json[shareObjects[grupos[i]][0]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += shareObjects[grupos[i]][0] + ': ' + temp + '\n';
                }
        
                else if(json[shareObjects[grupos[i]][0]][el].type === "button"){
                    
                    let temp = json[shareObjects[grupos[i]][0]][el].type + ': ' + json[shareObjects[grupos[i]][0]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += shareObjects[grupos[i]][0] + ': ' + temp + '\n';
                }
            }
            else{
                
                if(json[shareObjects[grupos[i]][0]][el].type === "text"){
                    
                    textFile +=  (shareObjects[grupos[i]][0] + ': ').fontcolor('red') + json[shareObjects[grupos[i]][0]][el].text + '\n\n';
                    
                }
                else if(json[shareObjects[grupos[i]][0]][el].type === "quick_reply" && !json[shareObjects[grupos[i]][0]][el].text.startsWith("images/")){
        
                    let temp = json[shareObjects[grupos[i]][0]][el].type.fontcolor('red') + ': ' + json[shareObjects[grupos[i]][0]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].fontcolor('red') + ': ' + temp + '\n';
                }
        
                else if(json[shareObjects[grupos[i]][0]][el].type === "button"){
                    
                    let temp = json[shareObjects[grupos[i]][0]][el].type.fontcolor('red') + ': ' + json[shareObjects[grupos[i]][0]][el].text + '\n\n'; 
                    
                    for(k = 0; k <  json[shareObjects[grupos[i]][0]][el].buttons.length; k++){
                        temp += 'button: ' + json[shareObjects[grupos[i]][0]][el].buttons[k].title + '\n';
                    }
                    
                    textFile += shareObjects[grupos[i]][0].fontcolor('red') + ': ' + temp + '\n';
                }

            }
        }
    }
    fs.writeFile('index.gdoc', textFile, (err) =>{
        if (err) throw err;
        console.log("File saved as Document");
    })
}



