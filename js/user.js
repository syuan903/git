class validator{
  constructor(id,validateFunc){
    this.input=$(`#${id}`)
    this.p=this.input.nextElementSibling
    this.validateFunc=validateFunc
    this.input.onblur=()=>{
      this.validate()
    }
  }

  async validate(){
    const err=await this.validateFunc(this.input.value)
    if(err){
      this.p.innerHTML=err
      return false
    }else{
      this.p.innerHTML=''
      return true
    }
  }

  static async validate(...validators){
    const isTrue=await Promise.all(validators.map((item)=>item.validate()))
    const result=isTrue.reduce((a,b)=>b&&a,true)
    return result
  }
}
