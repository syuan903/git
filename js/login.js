const loginIdValidator=new validator('txtLoginId',async (val)=>{
  if(!val){
    return '请填写账号'
  }
})

const loginPwdValidator=new validator('txtLoginPwd',(val)=>{
    if(!val){
      return '请填写密码'
  }
})

const form=$('.user-form')
form.onsubmit=async (e)=>{
  e.preventDefault()
  const result=await validator.validate(loginIdValidator,loginPwdValidator)
  if(result){
    const formData=new FormData(form)
    const body=await login(Object.fromEntries(formData.entries()))
    if(body.code===0){
      alert('登录成功')
      location.href='./index.html'
    }
    else{
      alert(`${body.msg}`)
    }
  }
}