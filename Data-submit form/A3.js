function fetchapi() {
    document.getElementById('Data-submit').addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('Data-submit').style.display='none';
        const dataTitle = document.getElementById('title').value;
        const dataBody = document.getElementById('body').value;
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
        .then(data => getposts(data))
        .catch(err => alert('Error: Not able to access data'));
    });

}

function elem(tag) {
    return document.createElement(tag);
}

function getposts(data) {
    let ul = document.getElementById('postlist');
        
    let container = elem('div');
    container.classList.add('posts');
    let dtitle = elem('p');
    let dbody = elem('p');
    let did=elem("p");
    
    did.append(`Id:${data.id}`);
    dtitle.textContent = `Title: ${data.title}`;
    dbody.textContent = `Body: ${data.body}`;

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

