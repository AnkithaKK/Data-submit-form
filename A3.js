function fetchapi() {
    document.getElementById('Data-submit').addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('Data-submit').style.display='none';
        const userid=document.getElementById('UserId');
        const dataTitle = document.getElementById('title').value;
        const dataBody = document.getElementById('body').value;
        if(!(userid && dataTitle && dataBody)) {
            alert("Error: Empty fields");
            location.reload();
            return;
        }  
        const postData = {
            title: dataTitle,
            body: dataBody
        };
        const opt={
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>response.json())
        .then(posts=>posts.forEach(post=>getposts(post)))
        .catch(error=>alert("Couldn't access data"));

        fetch('https://jsonplaceholder.typicode.com/posts',opt )
        .then(response => response.json())
        .then(data => getposts(data))
        .catch(error=>alert("Api not updated"));

        setTimeout(()=>{if(confirm('Submit data again?')) location.reload();},5000);
    });

}

function elem(tag) {
    return document.createElement(tag);
}

function getposts(post) {
    let ul = document.getElementById('postlist');       
    let container = elem('div');
    container.classList.add('posts');

    let did=elem("div");
    let dtitle = elem('p');
    let dbody = elem('p');
    
    did.textContent=`Id:${post.id}`;
    dtitle.textContent = `Title: ${post.title}`;
    dbody.textContent = `Body: ${post.body}`;

    container.append(did);
    container.append(dtitle);
    container.append(dbody);

    ul.append(container);
    document.body.append(ul);
}

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.getElementById("spinnerload").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.getElementById("spinnerload").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 1000);
    }
};

fetchapi();
