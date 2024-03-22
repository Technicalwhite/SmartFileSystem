# 备忘记录
## 各库管理员账号密码相关
### 库名 账号 密码
admin 账号:shenlilu 密码:qwerasdzx1997
smartFiles 账号:smartFilesAdmin 密码:qwertyui789456
连接  mongosh -u 账号 -p 密码 --authenticationDatabase 库名
######

### 增加
创建一个新用户。\
db.createUser({
  user: "shenlilu",
  pwd: "qwerasdzx1997",
  roles: [
    { role: "root", db: "admin"}
  ]
}); \
insertMany方法
该方法与create的区别是它接收的第一个参数是数据组成的数组，多条数据只会插入第一条
### 删除 
删除所在库一个用户。 \
db.dropUser('ManageRead') \
删除所在数据库关联的所有用户。\
db.dropAllUsers() \
删除所有数据库的所有用户。\
db.system.users.remove({})
### 更改 
//更改·本库 \
db.updateUser( 
    "shenlilu",
    {
        pwd: "qwerasdzx1997",
        roles: [
            { role: "root", db: "admin"}
        ]
}); \
//指定库更改 \
db.adminCommand(runCommand里的对象)等于
db.getSiblingDB("smartFiles").runCommand({
  updateUser: 'smartFilesAdmin',
  pwd: "qwertyui789456",
  customData: {
    title: '智能文件系统管理员',
    email: ''
  }
});
### 查看 
//按条件查 \
db.getUsers( {
   showCredentials: true,
   filter: { user: 'name' }
}); \
db.runCommand(
   {
     usersInfo: [ <username1>, ... ],
     showCredentials: <Boolean>,
     showCustomData: <Boolean>,
     showPrivileges: <Boolean>,
     showAuthenticationRestrictions: <Boolean>,
     filter: <[ <username1>, ... ]>,
     comment: <any>
   }
) \
db.getSiblingDB("smartFiles").runCommand({}) \
查看所有数据库的所有用户。\
db.system.users.find().pretty()