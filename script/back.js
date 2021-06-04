const http = require("http");
const { get } = require("https");
const {Client} = require('pg');
const sqlite = require('sqlite-sync');
const port = 3000;
//postgreSQL
const DB_port = 5432;

const names = [
    "Joe", "Mary", "Alex", "Dmitriy", "Darya", "Arthur", "John", "Barbara", 
    "Jimmy", "Bob", "Anna", "Liza", "Lev", "Gilbert", "Nikolay", "Frank"
];
const surNames = [
    "Smith", "Williams", "Taylor", "Evans", "Davies", "Abraham", "Abrams", 
    "Ainsworth", "Adcock", "Bolton", "Bonham", "Cole", "Clifford"
];
const cabinetsID = [
    "11505", "6070", "10861", "12143", "7665", "12462", "5751", "25956", "26108"
];
const departments = [
    "Management", "Frontend", "SEO", "Bookkeeping", "Cleaning", "Backend", "Design"
];


http.createServer(function(request, response) {

    if (request.method == 'POST') {

        response.setHeader("Content-Type", "text/html");
        // почему-то работает только с этими двумя строками (на фронте должен присылаться 'cors' запрос)
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

        data = '';

        request.on('data', function(chunk) {
            console.log(chunk);
            data += chunk.toString();
        });
        
        request.on('end', function() {

            let currObj = JSON.parse(data);
            let request_string = "insert into stuff (";
            for (key in currObj) {
                request_string += key + ", ";
            }

            request_string = request_string.slice(0, -2);
            request_string += " ) VALUES(";

            for (key in currObj) {
                request_string += `"${currObj[key]}"` + ", ";
            }
            request_string = request_string.slice(0, -2) + ");";


            response.write('hi');
            sqlite.connect('../databases/persons.db');
            var result = sqlite.run(request_string);
            // console.log(result); //количество записей в бд

            sqlite.close();
            response.end();
        });

    } else if (request.method == 'GET') {

        if (request.url == '/') {

            response.setHeader("Content-Type", "text/html");
            // почему-то работает только с этими двумя строками (на фронте должен присылаться 'cors' запрос)
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    
            user_list = [];
    
            sqlite.connect('../databases/persons.db');
            var result = sqlite.run("SELECT * FROM stuff");
            result.forEach((item) => {
                user = {};
                user.id = item._id;
                user.cab_id = item.cab_id;
                user.checker_name = item.checker_name;
                user.full_fio = item.full_fio;
                user.location_name = item.location_name;
                user.department = item.department;
                user_list.push(user);
            });
    
            response.write(JSON.stringify(user_list));
            console.log(JSON.stringify(user_list));
    
            sqlite.close();
            response.end();
        } else if (request.url == '/clr') {

            

         
        } else if(request.url == '/rnd') {
            response.setHeader("Content-Type", "text/html");
            // почему-то работает только с этими двумя строками (на фронте должен присылаться 'cors' запрос)
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
            
            
            let peopleCount = getRandomPeopleCount(15);
            let cabID = getRandomCabinetID();

            sqlite.connect('../databases/persons.db');
            
            for (let i = 0; i < peopleCount; i++) {
                
                let userName = getFullName(); 
                let cabID = getRandomCabinetID();
                let emailNickName = userName.split(" ").toString();
                let department = getRandomDepartment();

                console.log("email nickname: " + emailNickName);

                let request_string = "insert into stuff (cab_id, full_fio, email, " +
                "tel_number, location_name, department ) VALUES( " +
                cabID + ", " +
                userName + ", " +
                emailNickName + ", " +
                "@gmail.com" + ", " +
                "89086564987" + ", " +
                "выход" + ", " + 
                department + ");";
            

                console.log(request_string);

                response.write('hi');
                
                var result = sqlite.run(request_string);
                console.log(result);
            }
            sqlite.close();

            response.write("1");

            [
            {"id":1,"cab_id":6070,"checker_name":null,"full_fio":"Biba Boba","location_name":"выход","department":"cleaning"},
            {"id":2,"cab_id":5751,"checker_name":null,"full_fio":"Лена Хиди","location_name":"выход","department":"management"},
            {"id":3,"cab_id":5751,"checker_name":null,"full_fio":"Joe Doe","location_name":"выход","department":"nachalnik"}
            ]

            // {
            //     cab_id: '6070',
            //     full_fio: 'LupaPupa Pup',
            //     email: 'saint.4.script@gmail.com',
            //     tel_number: '89149484187',
            //     avatar_name: '',
            //     location_name: 'выход',
            //     department: 'nachalnik'
            // }

            // insert into stuff (cab_id, full_fio, email, tel_number, avatar_name, location_name, department ) VALUES("6070", "LupaPupa Pup", "saint.4.script@gmail.com", "89149484187", "", "выход", "nachalnik");
    
            response.end();
        }
    }
    
}).listen(port);

function getFullName() {
    //генерирует имя из списков имен и фамилий
    let nameIndex = Math.floor(Math.random() * names.length);
    let surNameIndex = Math.floor(Math.random() * surNames.length);
    return names[nameIndex] + " " + surNames[surNameIndex];
    // console.log(names[nameIndex] + " " + surNames[surNameIndex]);
}

function getRandomPeopleCount(peopleCountCoeff) {
    //peopleCountCoeff - задает максимальное количество генерируемых людей
    return Math.floor(Math.random() * peopleCountCoeff5);
}

function getRandomCabinetID() {
    return cabinetsID[Math.floor(Math.random() * cabinetsID.length)];
}

function getRandomDepartment() {
    return departments[Math.floor(Math.random() * departments.length)];
}