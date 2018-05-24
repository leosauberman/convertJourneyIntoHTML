let json = require('./conteudo.json');
const fs = require('fs');
const path = require('path');

let textFile = "<div style='font-family: Arial'>";
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

for(i in grupos){
    let k, j = 0;
    
    textFile += "<h1 style=text-align:center>JORNADA DE " + grupos[i].slice(6) + "</h1><br>";
    
    
    while(j < journeyObjects[grupos[i]].length){
        
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
}
textFile += "</div>";

// fs.writeFile('../../Google\ Drive/SESC/conteudoSESC.docx', textFile, (err) =>{
//    if (err) throw err;
//    console.log("File saved on Drive");
//})

fs.writeFile('index.html', textFile, (err) =>{
    if (err) throw err;
    console.log("File written on same dir");
})
