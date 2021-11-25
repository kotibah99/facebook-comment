let myPosts = [];
let comments = [];

window.addEventListener('load', () => {

    fetch('http://localhost:3000/posts')
        .then(res => res.json()).then(posts => {
            myPosts = posts;
            posts.forEach(async element => {

                let dv = document.createElement('div');
                let publisher = document.createElement('h4');
                publisher.innerText = element.publisher;
                publisher.setAttribute('class', 'titleClass');

                let content = document.createElement('h3');
                content.setAttribute('style', 'float:left; margin-left:50px');
                content.innerText = element.content;


                let img = document.createElement('img');


                let image = document.createElement('img');
                image.src = element.image;
                image.setAttribute('class', 'imageClass');

                let Delete = await axios.get('http://localhost:3000/active');

                let edit = document.createElement('button');
                let del = document.createElement('button');
                edit.textContent = "Edit";
                del.textContent = "Delete";
                edit.myParametrs = element.id;

                del.setAttribute('class', 'btnclass');
                edit.setAttribute('class', 'btn1class');

                if (element.publisher == Delete.data[0].name) {

                    dv.appendChild(del);
                    dv.appendChild(edit);
                    edit.textContent = "Edit";
                    del.textContent = "Delete";

                    del.addEventListener('click', function () {
                        axios({
                            method: 'DELETE',
                            url: 'http://localhost:3000/posts/' + element.id,
                        })
                            .then((response) => {
                                window.location.assign('./home.html');
                            })
                    });
                    edit.addEventListener('click', function (event) {

                        let id = event.currentTarget.myParametrs;
                        let button1 = document.createElement('input');

                        button1.value = element.content;

                        button1.setAttribute('id', 'edit');
                        button1.setAttribute('class', 'button1class');

                        let button2 = document.createElement('button');
                        button2.textContent = "confirm ";
                        button2.setAttribute('class', 'button2class');
                        button2.addEventListener('click', function () {
                            let cun = document.getElementById('edit').value;



                            axios.put('http://localhost:3000/posts/' + id,

                                {
                                    "content": cun,
                                    "publisher": element.publisher,
                                    "image": element.image,
                                    "comments": [],


                                })




                                .then((response) => {
                                    window.location.assign('./home.html');
                                })

                        })
                        dv.appendChild(button1);
                        dv.appendChild(button2);
                    });

                }


                dv.setAttribute('class', 'divClass');

                dv.appendChild(image);
                dv.appendChild(publisher);
                dv.appendChild(content);
                dv.appendChild(img);






                let commentsDiv = document.createElement('div');
                for (let i = 0; i < element.comments.length; i++) {
                    let dvv = document.createElement('div');
                    dvv.setAttribute('class', 'divvClass');

                    let publisherr = document.createElement('h4');
                    publisherr.innerText = element.comments[i].publisher;
                    publisherr.setAttribute('class', 'titleeClass');

                    let imagee = document.createElement('img');
                    imagee.src = element.comments[i].image;
                    imagee.setAttribute('class', 'imageeClass');



                    let contentt = document.createElement('h3');
                    contentt.innerText = element.comments[i].content;


                    dvv.appendChild(imagee);
                    dvv.appendChild(publisherr);
                    dvv.appendChild(contentt);

                    commentsDiv.appendChild(dvv);


                }
                commentsDiv.setAttribute('style', 'margin-top:40px');
                let postsDialog = document.getElementById('posts');
                postsDialog.setAttribute('class', 'divClass');
                dv.appendChild(commentsDiv);
                postsDialog.appendChild(dv);
            });
        });

});




let id = 1;



function addPost() {



    let cur = fetch('http://localhost:3000/active')

        .then(active => active.json()).then(async cur => {

            console.log(cur);

            let content = document.getElementById('post').value;


            let posts = await axios.get('http://localhost:3000/posts');

            axios.post('http://localhost:3000/posts', {

                "id": posts.length + 1,

                "publisher": cur[0].name,

                "content": content,


                "image": cur[0].image,

                "comments": [],

            })

                .then((response) => {

                    window.location.assign('file:///D:/web%20abd%20alsalam/personal%20work/json/Login/home.html');

                })



        })


}

