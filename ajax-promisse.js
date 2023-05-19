async function myRequest(method, url){
    return new Promise((resolve,reject) =>{
        //Instanciando o objeto XMLhttpRequest
        let xhr = new XMLHttpRequest();
        //Tratamento do Retorno
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                resolve(JSON.parse(xhr.responseText));
            }else{
                console.log(xhr.readyState);
            }
        }
        //Tratamento de Erro
        xhr.onerror = () => reject(xhr.statusText);
        //Configurando Requisição
        xhr.open(method, url, true);
        //Enviando a requisição
        xhr.send();
    });
}
async function main(){
    try{
        let images = await myRequest('GET', 'images.json');
        var divImagens = document.getElementById("images");
        var imagensEmbaralhadas = embaralharImagens(images.animals);
        for(const image of imagensEmbaralhadas){
            var img = document.createElement("img");
            img.src = image.url;
            divImagens.appendChild(img);
        }       
    }catch(error){
        console.log(error);
    }
}
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      main();
    }
};
function embaralharImagens(images) {
    var imagensEmbaralhadas = images.slice(); // cria uma cópia da matriz original
    for (var i = imagensEmbaralhadas.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = imagensEmbaralhadas[i];
      imagensEmbaralhadas[i] = imagensEmbaralhadas[j];
      imagensEmbaralhadas[j] = temp;
    }
    return imagensEmbaralhadas;
}