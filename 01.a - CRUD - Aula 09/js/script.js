window.addEventListener('load', start); //garante que o js só vai ser executado após a página ser carregada

//variáveis criadas fora das funções para serem acessadas por mais de uma função
var globalNames = ['João', 'Maria', 'Jason', 'Joana']; //nomes já incluídos, como elementos de um array
var inputName = null;
var isEditing = false;
var currentIndex = null;

//apesar de ter sido citada lá no início, a função start só está sendo declarada agora, para executar.
//essas funções que estão sendo executadas apenas após a página ser carregada.
function start() {
    inputName = document.querySelector('#inputName')//está definindo a variável inputName a partir da entrada de dados digitados
    preventFormSubmit(); //essa função vai evitar que a página recarregue quando enviar o formulário.
    activateInput(); //função para direcionar a digitação diretamente para o formulário, quando carregar a página.
    render(); //chamando o método, para já montar a div com os nomes cadastrados.
}

function preventFormSubmit(){
    function handleSubmit(event) {
        event.preventDefault(); //este evento impede o recarregamento da página ao enviar o formulário.
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
}

function activateInput(){
    function insertName (newName) {
        globalNames.push(newName)
    }

    function updateName(newName){
        globalNames[currentIndex] = newName;
    }

    function handleTyping(event){ //Se houver digitação de 'Enter' então, insere o nome no inputName.
        var hasText = !!event.target.value && event.target.value.trim() !==''; //se estiver vazio não aceita

        if(!hasText){
            clearInput();//limpa o conteúdo escrito caso o usuário tenha incluído apenas espaços.
            return;
        }
        
        if (event.key ==='Enter'){
            if(isEditing){
                updateName(event.target.value);
            } else {
                insertName(event.target.value);
            }
        render();
        isEditing = false;
        clearInput();
        }
    }
      inputName.addEventListener('keyup', handleTyping);//monitora a digitação. Se receber algo, ativa handleTyping
      inputName.focus(); //Dá foco na digitação - input.
}


function render() {//vai renderizar a div
    function createDeleteButton(index){
        function deleteName (){
            globalNames.splice(index,1);
            render();
        }
        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);
        return button;
    }

    function createSpan(name, index){
        function editItem () {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
            }
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }

    var divNames = document.querySelector('#names');
    // divNames.innerHTML = '<ul><li>Nome 1</li><li>Nome 2</li></ul>'; acho que é assim que vai usar para exibir a div no desafio
    divNames.innerHTML = '';

    var ul = document.createElement('ul');//cria a variável para criar o elemento 'ul'

    for(var i = 0; i< globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }
    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){//função para limpar a digitação após a inserção. Transforma inputName em vazio e depois, foca a digitação.
    inputName.value = '';
    inputName.focus();
}