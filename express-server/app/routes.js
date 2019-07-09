var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};


// 条件查询,通过用户名来单一查询
function getAccount(account){
    var whereStr={"account":account};
    return Todo.findOne(whereStr)

}

//更新存款,通过账户名来更新
function updateBalance(account,balance){
    var whereStr={"account":account};
    var set={$set:{"balance":balance}};
    Todo.updateOne(whereStr,set,function(){});
}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });
    //转账
    app.post("/transfer",function(req,res){
            //updateBalance(req.body.account,req.body.balance);
            updateBalance(req.body.account,req.body.balance);
            var result={"account":req.body.trans_account};
            Todo.findOne(result,function(err,todo){

                updateBalance(todo.account,todo.balance+req.body.trans_money);

            });
            getAccount(req.body.account,res);
       
        })
    //注册
    app.post("/register",function(req,res){
	console.log(req.body);
        Todo.create({
            account: req.body.account,
            password: req.body.password,
            name:req.body.username,
        },function(){
        res.send({msg:"注册成功"});
	});
    })
    //登录
    app.post("/login",function(req,res){

    })
    //存钱
    app.post("/deposit",function(req,res){

    })
    //取钱
    app.post("/withdrwa",function(req,res){

    })

};
