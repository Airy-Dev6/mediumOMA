const getPostData = () => {
    let category = $("#user-category").val();
    let title = $("#user-title").val();
    let postUserEntry = $("#user-post").val();
    let urlImage = $("#URL-image-post").val();
    let author = $("#user-author").val();
    let popular = $("#user-popular").val();;
    let postObject = {category, title, postUserEntry, urlImage, author, popular};
    $('#modal-form')[0].reset()
    location.reload()  
    addPostToDB(postObject);
   

}

$("#post-button").on("click",getPostData);


$('#user-popular').on('change', function(){
    $(this).val(this.checked ? "true" : "false");
})
  

const addPostToDB = (postEntry) => {
    $.ajax({
        url:"https://javascript-ajax-d0ce6.firebaseio.com/omar/post/.json",
        method:"POST",
        data: JSON.stringify(postEntry),
        success:(response)=>{
            console.log(response);            
        }

    }) 
}


const printPostAtMain = (array) => {
    $("#post-section").find("section").empty();
    array.forEach((post) => {
        if (post.popular === "true"){
            post.popular = "Entrada Popular"
        }else{
            post.popular = " "
        }
        let entrySlice = post.postUserEntry.slice(0,150)
        $("#post-section").find("section").append(`
        <a href="" class="post-modal" data-toggle="modal" data-target="#viewPost${post.key}">
        <div class="post-card d-flex">                    
            <div class="card-text">
                <span class="post-category">${post.category}</span><span class="post-popular">${post.popular}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-text">${entrySlice}...</p>
                <p class="post-author y-1">${post.author}</p>                
            </div>                
            <div class="card-image mx-md-3 mx-1">
                <img class="c-image" src="${post.urlImage}">                
            </div>
        </div>
        </a>
        `)
    })    
}


const printPostAtSide = () => {
    $("aside").find(".aside-container").empty();
    postArray.forEach((post) => {
        if (post.popular === "Entrada Popular"){
            $("aside").find(".aside-container").append(`
            <li class="aside-text">
                <a href="" class="post-modal" data-toggle="modal" data-target="#viewPost${post.key}">
                    <h2 class="aside-title mb-0">${post.title}</h2>
                    <p class="aside-author pb-3">${post.author}</p>
                </a>
            </li>
        `)            
        }        
    })    
}

const printPostAtModal = () => {    
    postArray.forEach((post) => {
        $("#modal-window").find("#modal-card").append(`
        <div class="modal fade" id="viewPost${post.key}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title" id="exampleModalLabel">Entrada</h5>
                    </div>                      
                    <div>
                        <p class="modal-post-author">${post.author}</p>                        
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-card-text">
                        <img class="modal-c-image" style="align-items: center;" src="${post.urlImage}">
                        <span class="modal-post-category">${post.category}</span><span class="post-popular">Popular Topic</span>
                        <h2 class="modal-post-title">${post.title}</h2>
                        <p class="modal-post-text">${post.postUserEntry}</p>
                    </div> 
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>      
                </div>
            </div>
        </div>
        </div>        
        `)
    })    
}


const getPostFromDb = () => {
    postArray= [];
    $.ajax({
        url:"https://javascript-ajax-d0ce6.firebaseio.com/omar/post/.json",
        method:"GET",
        success:(response)=>{
            $.each(response,(key,value)=>{
                postArray.push({...value,key})                
            })
            printPostAtMain(postArray);
            printPostAtModal();
            printPostAtSide();
        }
    })
}

getPostFromDb()

const deletePost = (PostId) => { //se crea una funcion que nos permitira ingresar el ID a eliminar
    

    let xhttp = new XMLHttpRequest()//se crea una variable con la consulta XMLHTTP

    xhttp.onreadystatechange = function(){ //una funcion va a ejecutarse cada que cambie el readyState
        if(this.readyState == 4 && this.status == 200){ //si readyState y status están OK... 
            
            let response = JSON.parse(this.responseText) //se crea una variable que parsea respuesta
            console.log(response) //nos manda la respuesta de la consulta (o sea sabremos si se mandó o no nuestro objeto)
        }
    }

    xhttp.open("DELETE",`https://javascript-ajax-d0ce6.firebaseio.com/omar/post/${PostId}.json`,true)
    xhttp.send() //envia la solicitud al servidor.
}



const filterArray = () =>{
    console.log($("#search-in").val())
    let resultFilter = postArray.filter ((post) => {
        return post.category === $("#search-in").val();    
    })
    return resultFilter
}


$("#search-but").on("click", () =>{
    let newArray = filterArray()
    printPostAtMain(newArray);
});




