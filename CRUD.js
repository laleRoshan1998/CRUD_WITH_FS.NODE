const fs = require('fs');
const { emit } = require('process');
console.log("1. Press 1 for Create\n2. Press 2 for Read\n3. Press 3 for Update\n4. Press 4 for Delete");
var r = require("readline-sync");
var l=[]
function option () {
    let a = r.question("Enter your option: ");
    if (a == '1') {
        return create() ;
    }
    else if (a == 2){
        return Read();
    }
    else if (a == 3) {
        return update();
    }
    else if (a == 4) {
        return Delete()
    }
    function create() {
        if (fs.existsSync('Crud.json')) {
            let file_data = fs.readFileSync("Crud.json", 'utf-8');
            let convert = JSON.parse(file_data);
            let email = r.question("Enter your E-mail: ");
            if ((email.includes("@")) && (email.includes(".com"))) {
                let check = true;
                for (let i in convert) {
                    if (convert[i]["Email"] == email) {
                        check = false;
                        console.log("Data is already Present, Please Log_in");
                    }
                }
                if (check) {
                    let json_data = JSON.parse(file_data);
                    const biodata = {
                        Email: email,
                        password: r.question("Enter your password: "),
                        name: r.question("Enter your name: "),
                        age: r.question("Enter your age: "),
                        qualification: r.question("Enter your qualification: ")
                    }
                    json_data.push(biodata);
                    let whole_data = JSON.stringify(json_data, null, 3)
                    fs.writeFileSync("Crud.json", whole_data);
                    console.log("Your data is Registered Successfully...");
                }
            }
            else{
                console.log("Your E-mail is Invalid, please put Valid E-mail...");
            }
        }else{
            fs.writeFileSync("Crud.json", JSON.stringify(l))
            create();
        }
        
    }
    function Read(){
        if(fs.existsSync("Crud.json")) {
            file_data = fs.readFileSync("Crud.json","utf-8")
            let convert = JSON.parse(file_data)
            let email = r.question("Enter the Email:- ")
            if(email.includes('@') && (email.includes(".com"))){
                let check = true;
                for(i of convert){
                    if(i["Email"]==email){
                        console.log(i)
                    }
                }
            }else{
                console.log("email not exite");
            }
        }else{
            fs.writeFileSync("Crud.json", JSON.stringify(l))
            Read()
        }
    }
    function update() {
        let Read = fs.readFileSync("Crud.json", "utf-8");
        let Read_data = JSON.parse(Read)
        let email = r.question("Enter your Email for conforming: ");
        for (let detail in Read_data) {
            if ( Read_data[detail]["Email"] == email) {
                Read_data.splice(detail, 1);
                console.log("Data has been deleted...");
                let update_biodata = {
                    Email: email,
                    password: r.question("Enter your updated Password: "),
                    Name: r.question("Enter you  updated Name: "),
                    Age: r.question("Enter you  updated Age: "),
                    qualification: r.question("Enter you updated Qualification: "),

                }
                Read_data.push(update_biodata)
                let jsonData=JSON.stringify(Read_data,null,3)
                console.log(jsonData);
                console.log("data has been updated...");
    
                fs.writeFileSync("Crud.json",(jsonData))
            }
        }
    }
    function Delete(){
        let Read_data = JSON.parse(fs.readFileSync("Crud.json",'utf-8'))
        let email = r.question("Enter your Email for conforming:- ")
        for (let i in Read_data){
            if (Read_data[i]["Email"] == email){
                Read_data.splice(i, 1)
                let read1 = JSON.stringify(Read_data,null,3)
                fs.writeFileSync("Crud.json",read1)
            }
        }
    }



}
option();

