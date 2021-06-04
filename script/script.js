/*jshint esversion: 8 */

// элементы навигации по странице
const btn_push = document.querySelector("[data-action~='push']");
const btn_pull = document.querySelector("[data-action~='pull']");
const btn_clear = document.querySelector("[data-action~='clear']");
const btn_random = document.querySelector("[data-action~='random']");
const db_form = document.querySelector("[name='db-form']");

//подключение к серверу
const FETCH_URL = "http://localhost:3000";

// Массив всех сотрудников, находящихся в теккущий момент в офисе
PERSONS = [];

//константы для костыльного отслеживания (ифания) ID дверей выходов с 5 и 4 этажей
EXIT_4_FLOOR = "26108";
EXIT_5_FLOOR = "149051";

class Person {
    constructor(personID, cab_id, checker_name, full_fio, location_name) {
        this.ID = personID;
        this.checker_name = checker_name;
        this.fullName = full_fio;
        this.location = cab_id;
        this.location_name = location_name;
        this.html = undefined;
    }
}

btn_random.addEventListener("click", async (e) => {
    e.preventDefault(); 
    console.log("nazhal");

    fetch(FETCH_URL + "/rnd", {
        method: 'GET',
        mode: 'cors'
        }).then((response) => {
            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа 
        
                return response.text();
        
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
    }).then(text => {
        console.log(text);
    });
    
});
btn_clear.addEventListener("click", async (e) => {
    e.preventDefault(); 

    fetch(FETCH_URL + "/clr", {
        method: 'GET',
        mode: 'cors'
        }).then((response) => {
            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа 
        
                return response.text();
        
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
    }).then(text => {
        console.log(text);
    });
    
});
btn_push.addEventListener("click", async (e) => {
    e.preventDefault(); //убираем обновление страницы от стандартного поведения

    // const form_field_name = document.querySelector("[data-input-name]");
    // const form_field_number = document.querySelector("[data-input-number]");

    form_data = new FormData(db_form);

    var request_body = {};
    form_data.forEach((value, key) => {request_body[key] = value;});
    var json = JSON.stringify(request_body);
    console.log(json);

    fetch(FETCH_URL, {
        method: 'POST',
        body: json,
        mode: 'cors'
        }).then((response) => {
            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа (см. про этот метод ниже)
        
                return response.text();
        
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
    }).then(text => {
        console.log(text);
    });
});


btn_pull.addEventListener("click", async (e) => {
    e.preventDefault();
    
    fetch(FETCH_URL, { mode: 'cors' })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response  
                response.json().then((raw_persons) => {

                    raw_persons.forEach((current_raw_person) => {

                        let current_person = new Person(
                            current_raw_person.id,
                            current_raw_person.cab_id,
                            current_raw_person.checker_name,
                            current_raw_person.full_fio,
                            current_raw_person.location_name
                        );

                        if (!isPersonIn(current_person.ID)) {
                            // let personRawData = data[key];
                            // let personFullName = personRawData.full_fio;
                            // let currentLocation = personRawData.config_tree_id;
                            // currentPerson = new Person(key, personFullName, currentLocation);

                            addNewPersonToMap(current_person);
                            
                        } else {
                            let currentLocation = current_person.location;

                            if(currentLocation == EXIT_4_FLOOR || currentLocation == EXIT_5_FLOOR) {

                                // если человек существует (находится в PERSONS),
                                // и если его последняя активность - взаимодействие с дверью выхода
                                // то не добавлять его (он же вышел)

                                console.log("here");
                                // deletePerson(isPersonIn(key));
                            }
                        }

                    });

                    console.log(PERSONS);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
});

function isPersonIn(personID) {
    res = false;
    PERSONS.forEach(element => {
        if (element.ID == personID) {
            // console.log(element)
            res = element;
        }
    });
    return res;
}

function deletePerson(person) {
    PERSONS = PERSONS.filter(person_ => person.ID != person_.ID);

    JQ_who = $(person.html)[0];

    disappear(JQ_who);
}

// убирает приветственный экран
$('.preview').click(() => {

    var el = document.getElementById("4-floor");
    el.classList.remove("display");
    el.classList.add("floor-4-map-display");

    var el2 = document.getElementById("background");
    el2.classList.add("map-texture");

    var el3 = document.getElementById("grid-for-help");
    el3.classList.remove("display");

    var el4 = document.getElementById("intro");
    el4.classList.add("text-display");

    var el6 = document.getElementById("5floor-container");
    el6.classList.remove("existance");

    var el5 = document.getElementById("5-floor");
    el5.classList.remove("existance");
    el5.classList.add("floor-4-map-display");
});

// стартовая инициализация всех людей, которые на текущий момент находятся в офисе
function initPersons() {
    fetch(FETCH_URL, { mode: 'cors' })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response  
                response.json().then((raw_persons) => {

                    raw_persons.forEach((current_raw_person) => {

                        let current_person = new Person(
                            current_raw_person.id,
                            current_raw_person.cab_id,
                            current_raw_person.checker_name,
                            current_raw_person.full_fio,
                            current_raw_person.location_name
                        );

                        if (!isPersonIn(current_person.ID)) {
                            // let personRawData = data[key];
                            // let personFullName = personRawData.full_fio;
                            // let currentLocation = personRawData.config_tree_id;
                            // currentPerson = new Person(key, personFullName, currentLocation);

                            addNewPersonToMap(current_person);
                            
                        } else {
                            let currentLocation = current_person.location;

                            if(currentLocation == EXIT_4_FLOOR || currentLocation == EXIT_5_FLOOR) {

                                // если человек существует (находится в PERSONS),
                                // и если его последняя активность - взаимодействие с дверью выхода
                                // то не добавлять его (он же вышел)

                                console.log("here");
                                // deletePerson(isPersonIn(key));
                            }
                        }

                    });
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

// добавление списка людей на карту и в PERSONS
function addNewPersonToMap(person) {

    // PERSONS.push(person);

    let strCabID = APItoLayoutMap[person.location].layoutName;

    // костыль для того, чтобы люди не толклись на 5 этаже в двери
    if (strCabID.split("-")[1] == "17") {
        strCabID = "cab-31-place";
        console.log(strCabID);
    }
    let destinationPlaceholder = $("." + strCabID)[0];

    let personHTML = document.createElement('div');
    personHTML.setAttribute("class", "person-icon");
    personHTML.setAttribute("data-title", person.fullName);
    // перебираем
    // FullnameArray = person.fullName.split(" ");
    // FullName = "";
    // FullnameArray.forEach((elem) => {
    //     FullName += elem;
    // });

    personHTML.style = "background-color: " + randomColor() + ";";
    personHTML.style.opacity = 0;
    person.html = personHTML;

    PERSONS.push(person);
    destinationPlaceholder.appendChild(personHTML);
    appear(person.html);

    // try {
    //     // назначение иконок людям. (добавить икноку в папку, задать ей имя объединиф ФИО из апи)
    //     //например (API: 'Карноухов Семён ', img-name: 'КарноуховСемен')

    //     // как убрать вывод ошибок??????
    //     fetch("http://127.0.0.1:8080/images/worker-icons/" + FullName + ".jpg", { mode: 'same-origin' })
    //     .then(
    //         function (response) {
    //             if (response.status !== 200) {
    //                 console.log('Image not found, error code: ' + response.status);

    //                 //задание вместо картинки рандомного цвета
    //                 personHTML.style = "background-color: " + randomColor() + ";";
    //                 personHTML.style.opacity = 0;
    //                 person.html = personHTML;
    //                 PERSONS.push(person);

    //                 destinationPlaceholder.appendChild(personHTML);
    //                 appear(person.html);
    //                 return;
    //             }

    //             let path_ = "url(http://127.0.0.1:8080/images/worker-icons/" + "kfc" + ".jpg)";
    //             personHTML.style.backgroundImage = path_;
    //             person.html = personHTML;
    //             personHTML.style.opacity = 0;

    //             PERSONS.push(person);
    //             destinationPlaceholder.appendChild(personHTML);
    //             appear(person.html);
    //         }
    //     )
    //     .catch(function (err) {
    //         console.log('Fetch Error :-S', err);
    //     });
    // } catch (error) {
        //задание вместо картинки рандомного цвета
        // personHTML.style = "background-color: " + randomColor() + ";";
        // personHTML.style.opacity = 0;
        // person.html = personHTML;

        // PERSONS.push(person);
        // destinationPlaceholder.appendChild(personHTML);
        // appear(person.html);
    // }
}

function randomColor() {
    let number = Math.floor(Math.random() * (10777215) + 3000000);
    return ("#" + Number(number).toString(16));
}

function appear(personHTML) {

    // место для анимации
    let start = Date.now(); // запомнить время начала

    let timer_ = setInterval(function () {
        
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer_);
            personHTML.style.opacity = 1;
            return;
        }

        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        draw_start(timePassed);
    }, 20);

    // в то время как timePassed идёт от 0 до 2000
    // opacity изменяет значение от 1 до 0
    function draw_start(timePassed) {
        personHTML.style.opacity = (0 + (timePassed / 20 / 100));
    }
}

// анимация исчезновения
function disappear(personHTML) {

    // место для анимации
    let start = Date.now(); // запомнить время начала

    let timer_ = setInterval(function () {
        
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer_);
            // удаление html-элемента
            personHTML = $(personHTML).detach();
            return;
        }

        // отрисовать анимацию на момент timePassed, прошедший с начала анимации
        draw_start(timePassed);
    }, 20);

    // в то время как timePassed идёт от 0 до 2000
    // opacity изменяет значение от 1 до 0
    function draw_start(timePassed) {
        personHTML.style.opacity = (1 - (timePassed / 20 / 100));
    }
}

// получение изменений состояний всех людей в PERSONS и в файле-источнике
function getStateDiffs() {

    return new Promise(function(resolve, reject) {
        // мапа с ключами:
        // "dif" для людей, чья локация поменялась;
        // "new" для новых людей (первая активность в офисе)
        // "del" для тех, кто еще находится в PERSONS, но последней активностью числится взаимодействие с выходом
        let resultData = new Map();
        let diffPersonStates = [];
        let newPersons = [];
        let deletedPersons = [];

        // если локальный запрос, то добавить timeStamp к FETCH_PATH, для независимости от кэша
        fetch(FETCH_URL, { mode: 'cors' })
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response  
                    response.json().then((raw_persons) => {

                        let db_persons = [];

                        raw_persons.forEach((current_raw_person) => {
                            let current_person = new Person(
                                current_raw_person.id,
                                current_raw_person.cab_id,
                                current_raw_person.checker_name,
                                current_raw_person.full_fio,
                                current_raw_person.location_name
                            );

                            db_persons.push(current_person);
                        });


                        PERSONS.forEach((person) => {
                            let isPerson_in = false;
                            db_persons.forEach((db_person) => {
                                if (db_person.ID == person.ID) {
                                    isPerson_in = true;
                                }
                            });
                            if(!isPerson_in) {
                                deletedPersons.push(person);
                            }
                        });
            
                    
                        db_persons.forEach((person) => {

                            if (! (isPersonIn(person.ID))) {

                                //если человека еще нет, то добавить его в PERSONS
                                // его активность не выход из офиса, то добавить его в PERSONS
                                if(person.location == EXIT_4_FLOOR || person.location == EXIT_5_FLOOR) {
                                    // ничего не делать
                                } else {
                                    newPersons.push(person);
                                }

                            } else {
                                //если человек уже есть
                                PERSONS.forEach((existed_person) => {
                                    // найти его "двойника" в PERSONS
                                    if (existed_person.ID == person.ID) {
                    
                                        person.html = existed_person.html;
                                        // если локация поменялась, то добавить в изменения
                                        if (person.location != existed_person.location) {
                                            diffPersonStates.push(person);
                                        }
                                    }
                                });
                            }
                        });


                        // удаление человека, который взаимодействовал с выходом
                        PERSONS.forEach((person) => {

                            let checker = false; // человека считается отсутствующим

                            db_persons.forEach((cur_person) => {
                                if (person.ID == cur_person.ID) {
                                    if(person.location == EXIT_4_FLOOR || person.location == EXIT_5_FLOOR) {
                                        checker = true;
                                    }
                                }
                            });

                            if (checker) {
                                deletedPersons.push(person);
                            }
                        });

                        resultData.set("dif", diffPersonStates);
                        resultData.set("new", newPersons);
                        console.log(deletedPersons);
                        resultData.set("del", deletedPersons);

                        resolve(resultData);
                    });
                }
            ).catch(function (err) {
                console.log('Fetch Error :-S', err);
                reject(err);
            }
        );
    });

}

// агрегация изменений состояний БД
async function checkPersonsStateChange() {

    getStateDiffs().then(changedData => {
        // console.log(changedData.entries().size);
        // console.log(changedData.get("dif"));
        // console.log("size ", changedData.size);
        // console.log(changedData);
        if(changedData) {
            if (changedData.get("dif")) {

                let diffs = changedData.get("dif");
                let newPersons = changedData.get("new");
                let deletedPersons = changedData.get("del");
    
                newPersons.forEach((newPerson) => {
                    addNewPersonToMap(newPerson);
                });
    
                diffs.forEach((diffPerson) => {
                    let from, to;
                    PERSONS.forEach((person) => {
                        if (person.ID == diffPerson.ID) {
                            from = person.location;
                            to = diffPerson.location;
                            person.location = diffPerson.location;
                            diffPerson = person;
                        }
                    });
                    personOnChangeState(diffPerson, from, to);
                });
    
                deletedPersons.forEach((delPerson) => {
                    deletePerson(delPerson);
                });
            } else {
                console.log("----------no diffs commited-----------");
            }
        }
        
    });
}

//вызов передвижения для человека
function personOnChangeState(person, from, to) {

    let strCabIDStart = APItoLayoutMap[from].layoutName;
    let strCabIDDestination = APItoLayoutMap[to].layoutName;

    let fromID = strCabIDStart.split("-")[1];
    let toID = strCabIDDestination.split("-")[1];

    movePerson(
        person,
        person.html,
        fromID,
        toID
    );
}
//передвижение человека между двумя кабинетами
//person - объект человека
//who - его html-бегунок (иконка) (дублирует то, что уже есть как поле .html в person,
// но костыль получился в процессе стрессовой отладки, можно смело чинить)
// from, to - ID кабинетов по типу (кабинет cab-16-place, тогда его ID 16)
function movePerson(person, who, from, to) {

    let path = [];

    // костыль для фикса несоответсятвия ID кабинета в верстке и в файле-карте, можно чинить
    if(to == "1") {
        to = "1-8";
    }

    // получаем список ID кабинетов в пути
    let routeFinder = new FindShortRoute(roomMap);
    let pathStringsID = routeFinder.findRoute(from, to);

    // получаем точки в пути как html-объекты
    pathStringsID.forEach(step => {
        path.push($(`.cab-${step}-place`)[0]);
    });

    // сохраняем текущие координаты для сохранения позиции иконки после ее открепления от кабинета
    let x = $(who)[0].offsetLeft;
    let y = $(who)[0].offsetTop;

    let JQ_who = $(who).detach();
    // для движения внутри body, а не вокруг него
    JQ_who[0].style.position = "fixed";

    //добавление в body
    JQ_who.appendTo($('.preview'));

    // fix для передвижения (ломается при скролле 5 этажа)
    if( from > 16) {
        JQ_who.offset({
            left: x - document.getElementsByClassName("floor-5-wrapper")[0].scrollLeft,
            top: y + window.scrollY
        });
    } else {
        JQ_who.offset({
            left: x,
            top: y + window.scrollY
        });
    }

    function animate({ timing, draw, duration }) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // вычисление текущего состояния анимации
            let progress = timing(timeFraction);

            draw(progress); // отрисовать её ,progress==1

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    function moveByList() {
        // distanation points
        const list = path;
        moveClass.move(list);
    }

    class Move {
        static checker = false;
        /** index of active route step */
        index = 0;
        /** list with dest point */
        list;
        /** html node should move */
        movingNode;

        // для выполнения анимации ПОСЛЕ передвижения
        doneCallback;

        // параметр - html иконка
        constructor(node) {
            this.movingNode = node;
        }

        /**
         * run move by route list
         */
        move(list) {
            this.index = 0;
            this.list = list;
            this._next();
            this.checker = true;
        }

        /**
         * Move to point
         */
        _moveToPoint(destinationPoint) {
            // save context for call next()
            const self = this;
            let nextCoordinates = destinationPoint.getBoundingClientRect();

            //координаты следующего блока к которому идем
            let x = nextCoordinates.x;
            let y = nextCoordinates.y + 0;

            // коррекция для передвижения к центру блока, а не к краю
            let correctionX = destinationPoint.offsetWidth / 2;
            let correctionY = destinationPoint.offsetHeight / 2;

            // calc move time
            // это надо пофиксить, после изменений кода перестала работать правильно
            const t = parseInt(self.movingNode.style.top) || 0;
            const l = parseInt(self.movingNode.style.left) || 0;
            let time = Math.sqrt((l - x) * (l - x) + (t - y) * (t - y)) * 10;

            animate({
                duration: time,
                draw(progress) {
                    const node = self.movingNode;
                    //get current position
                    const top = parseInt(node.style.top) || 0;
                    const left = parseInt(node.style.left) || 0;
                    //calculate transition
                    const xTrans = (x - left + correctionX - 10);
                    const yTrans = (y - top + correctionY - 10);

                    node.style.transform = `translate3d(${progress * (xTrans)
                        }px, ${progress * (yTrans)}px, 0)`;

                    if (progress === 1) {
                        // set finish position, reset transition
                        node.style.top = `${y + correctionY - 10}px`;
                        node.style.left = `${x + correctionX - 10}px`;
                        node.style.transform = ``;
                        self._next();
                    }
                },
                timing(a) {
                    return a;
                }
            });
        }

        /**
         * Run next step in route
         */
        _next() {
            const step = this.list[this.index];

            if (step) {
                // let nextCoordinates = step.getBoundingClientRect() || 0;
                this._moveToPoint(step);
            } else {
                if (typeof this.doneCallback === 'function') {
                    this.doneCallback();
                }
            }
            this.index++;
        }
    }

    const moveClass = new Move(JQ_who[0]);

    moveClass.doneCallback = () => {

        // костыльные проверки на кабинет-выход
        if(to == "17" || to == "1-8") {
            deletePerson(person);
            return;
        }
        JQ_who[0].style.position = "relative";


        let start = Date.now(); // запомнить время начала

        // анимация исчезновения
        let timer_ = setInterval(function () {
            
            let timePassed = Date.now() - start;

            if (timePassed >= 2000) {
                clearInterval(timer_);
                startOpacityAnimation();
                return;
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            draw_start(timePassed);
        }, 20);

        // в то время как timePassed идёт от 0 до 2000
        // opacity изменяет значение от 1 до 0
        function draw_start(timePassed) {
            JQ_who[0].style.opacity = (1 - (timePassed / 20 / 100));
        }

        //анимация появления
        let startOpacityAnimation = () => {
            
            start = Date.now(); // запомнить время начала

            timer_ = setInterval(function () {
               
                let timePassed = Date.now() - start;

                if (timePassed >= 2000) {
                    clearInterval(timer_);
                    return;
                }

                // отрисовать анимацию на момент timePassed, прошедший с начала анимации
                draw_end(timePassed);
            }, 20);

            // в то время как timePassed идёт от 0 до 2000
            // opacity изменяет значение от 0 до 1
            function draw_end(timePassed) {
                JQ_who[0].style.opacity = (0 + (timePassed / 20 / 100));
            }
        };
        JQ_who = $(JQ_who[0]).detach();

        JQ_who.appendTo($("." + path[path.length - 1].classList[0]));
        JQ_who[0].style.top = 0;
        JQ_who[0].style.left = 0;
        JQ_who[0].style.transform = "none";

    };

    moveByList();
}

$(document).ready(() => {
    initPersons();
    

    // проверка изменений в файле API
    let timerId = setInterval(() => {
        checkPersonsStateChange();
    }, 7000);
});

