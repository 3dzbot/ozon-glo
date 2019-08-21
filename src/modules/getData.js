export default function getData(){
    const goodsWrapper = document.querySelector('.goods');
//fetch API - запрос на сервер 
    return fetch('../db/db.json')   //add return for .then on getData()
    .then((response)=>{         //callback with objData (response)
        if(response.ok){            //.ok true/false
            return response.json();
        } else {
            throw new Error ('Данные не были получены, ошибка: ' + response.status);  //перехват ошибки
        }
    })
    .then((data)=> {
            return data;        //add return for .then on getData()
        }
    )
    .catch((err)=>{     //перехват ошибок
        console.warn(err);
        goodsWrapper.innerHTML = '<div style="color: red;">Упс, что-то пошло не так!</div>';
    }); 
}