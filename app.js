//Tomamos la información del formulario
var formulario = document.getElementById("form-recipe");
var contenedor = document.getElementById("view");
var lista_de_ingredientes = document.getElementById ("ingredient-temp-list");
var lista_recetas = "lista_de_recetas";
var ingredientes = "lista_de_ingredientes"
//Acceso a los botones
const guardar = document.getElementById('guardar');
const guaradr_ingrediente = document.getElementById('guardar-ingrediente');

//--------------------EVENTOS---------------------------------------
//Guardar una receta
guardar.addEventListener('click', GuardarReceta);

//Agregar un ingredient
guaradr_ingrediente.addEventListener('click', GuardarIngrediente);



//Agregar un ingredient
function getListaDeIngredientes() {
    let list = JSON.parse(localStorage.getItem(lista_ingredientes)); //Para leer el objeto
    if (list === null) 
        return []; 
    else 
        return list;
}
function GuardarIngrediente (e){
    e.preventDefault();
    e.stopPropagation();
    //Creamos el twitt
    let ingrediente = {
        id: Date.now(),
        inigrediente: formulario["ingredient-name"].value,  
    };
    let ListaIngrediente = getListaDeIngredientes(); 
    ListaIngrediente.push(ingrediente); 
    localStorage.setItem(lista_ingredientes, JSON.stringify(ListaIngrediente));
    mostrarListaDeIngredientes(); 
}
function mostrarListaDeIngredientes() {
    let ListaIngredientes = getListaDeIngredientes();
    html = ""
    //En el sigueinte ciclo vamos apilando todos los twitts, como si de un
    //contador se tratase
    for(var i = 0; i < ListaIngredientes.length; i++) {
        html += 
                `<li class="[ bg-white color-gray ]">
                    <p>${ListaIngredientes[i].ingrediente}</p>
                    <button class="close" type="button" >X</button>
                </li>`;
            
    }
    lista_de_ingredientes.innerHTML = html;
}

//Ver la receta

//Eliminar la receta


//Conseguimos la lista de recetas
function getListaDeRecetas() {
    let list = JSON.parse(localStorage.getItem(lista_recetas)); //Para leer el objeto
    if (list === null) 
        return []; 
    else 
        return list;
}

//Funcion para guardar recetas
function GuardarReceta(e) {
    console.log("Evento del boton guardar");
    e.preventDefault();
    e.stopPropagation();
    //Creamos el twitt
    let receta = {
        id: Date.now(),
        title: formulario["title"].value, 
        img_url: formulario["img_url"].value,
        description: formulario["description"].value,
        ingredientes
    };
    let ListaRecetas = getListaDeRecetas(); 
    ListaRecetas.push(receta); 
    localStorage.setItem(lista_recetas, JSON.stringify(ListaRecetas));
    mostrarListaDeRecetas(); 
}
//Funcion para ver una receta
function mostrarListaDeRecetas() {
    let ListaRecetas = getListaDeRecetas();
    let html = `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>`; 
    //En el sigueinte ciclo vamos apilando todos los twitts, como si de un
    //contador se tratase
    for(var i = 0; i < ListaRecetas.length; i++) {
        html += 
                `<div class="[ row ] [ flex ]" data-state="wrap">
                    <div class="[ col ]">
                        <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${ListaRecetas[i].id}">
                            <img src="${ListaRecetas[i].img_url}" alt="">
                            <div class="[ flow ]">
                                <h5>${ListaRecetas[i].title}</h5>
                                <div class="[ flex ]" data-state="justify-between">
                                    <button class="[ btn ]" data-state="white" onclick="getRecipe(${ListaRecetas[i].id})">Ver</button>
                                    <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${ListaRecetas[i].id})">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            
    }
    contenedor.innerHTML = html;
}
//Funcion para eliminar una receta

function deleteRecipe(id){
    let ListaRecetas = getListaDeRecetas();
    ListaRecetas = ListaRecetas.filter(i => i.id !== id);
    localStorage.setItem(lista_recetas, JSON.stringify(ListaRecetas));
    let receta = document.getElementById(id);
    
    receta.className += ' hide';
    
    setTimeout(() => {
        receta.remove();
    }, 300);
}

function getRecipe (id){
    let ListaRecetas = getListaDeRecetas();
    let html = `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>`; 
    ListaRecetas = ListaRecetas.filter(i => i.id !== id);
    localStorage.setItem(lista_recetas, JSON.stringify(ListaRecetas));
    let receip = document.getElementById(id);
    //En el sigueinte ciclo vamos apilando todos los twitts, como si de un
    //contador se tratase
        html += 
                `<h1 class="[ color-primary ] [ text-center ]">Receta</h1>

                <div class="[ recipe ] [ flex ] [ shadow ]">
                    <div class="recipe-img">
                        <img src="${recipe.img_url}" alt="">
                    </div>
                    <div class="[ recipe-info ] [ flow ]">
                        <h2>${recipe.title}</h2>
                        <div class="[ text-justify ]">${recipe.description}</div>
                        <h5>Ingredientes</h5>
                        <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                            <li></li>
                        </ul>
                    </div>
                </div>
        
                <div class="text-right">
                    <button class="[ btn ]" data-state="primary" onclick="paintRecipeList()">Volver al listado</button>
                </div>`;
            
    
    contenedor.innerHTML = html;
}