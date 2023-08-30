allposts=[];

function putallposts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response=>response.json())
    .then(posts=>{
        allposts=posts;
    })
    .catch(err=>alert('Error accessing posts'));
}

function fetchapi() {
    document.getElementById('Data-submit').addEventListener('submit', function (event) {
        event.preventDefault();
        const dataTitle = document.getElementById('title').value;
        const dataBody = document.getElementById('body').value;
        this.reset();
        if(!(dataTitle && dataBody)) {
            let span=document.getElementById('error');
            span.textContent='Empty Fields!'
            span.style.display='flex';
            return;
        }
        document.getElementById('Data-submit').style.display='none';
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

        fetch('https://jsonplaceholder.typicode.com/posts',opt )
        .then(response => response.json())
        .then(data => {
            allposts.push(data);
            getposts(allposts);
        })
        .catch(err=>alert("Error"));
        document.getElementById('error').style.display='none';
        document.getElementById('Submit-again').style.display='flex';
    });

}

function elem(tag) {
    return document.createElement(tag);
}

function getposts(posts) {
    let ul = document.getElementById('postlist');    
    document.getElementById('postlist').style.display='block';   
    
    posts.forEach(post=>{
        let container = elem('div');
        container.classList.add('posts');

        let dtitle = elem('p');
        let dbody = elem('p');
    
        dtitle.textContent = `Title: ${post.title}`;
        dbody.textContent = `Body: ${post.body}`;

        container.append(dtitle);
        container.append(dbody);

        ul.append(container);
    });

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

function postagain(){
    document.getElementById('Data-submit').style.display='flex';
    document.getElementById('postlist').style.display='none';
}

putallposts();
fetchapi();
