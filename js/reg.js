const loginIdValidator=new validator('txtLoginId',async (val)=>{
  if(!val){
    return '请填写账号'
  }
  const body=await exists(val)
  if(body.data){
    return '账号已存在'
  }
})

const nickNameValidator=new validator('txtNickname',(val)=>{
    if(!val){
      return '请填写昵称'
  }
})

const loginPwdValidator=new validator('txtLoginPwd',(val)=>{
    if(!val){
      return '请填写密码'
  }
})

const loginPwdConfirmValidator=new validator('txtLoginPwdConfirm',(val)=>{
  if(!val){
      return '请填写密码'
  }
  if(val!==loginPwdValidator.input.value){
    return '两次密码不一致'
  }
})

const form=$('.user-form')
form.onsubmit=async (e)=>{
  e.preventDefault()
  const result=await validator.validate(
    loginIdValidator,nickNameValidator,loginPwdValidator,loginPwdConfirmValidator)
  if(result){
    const formData=new FormData(form)
    const body=await reg(Object.fromEntries(formData.entries()))
    if(body.code===0){
      alert('注册成功，点击跳转登录页')
      location.href='./login.html'
    }
  }
}
