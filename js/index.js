(async ()=>{
  const body=await profile()
  console.log(body);
  
  if(!body.data){
    alert(`${body.msg}`)
    location.href='./login.html'
    return
  }

  const doms={
    nickName:$('#nickname'),
    loginId:$('#loginId'),
    icoButton:$('.icon-close'),
    chatContainer:$('.chat-container'),
    msg:$('#txtMsg'),
    formMsg:$('.msg-container')
  }

  doms.icoButton.onclick=()=>{
    loginOut()
    location.href='./login.html'
  }

  setUserInfo()

  function setUserInfo(){
    doms.nickName.innerText=body.data.nickname
    doms.loginId.innerText=body.data.loginId
  }

  await loadHistory()

  async function loadHistory(){
    const data=await getChat()
    data.data.forEach(item => {
    addChat(item)
  });
  scrollBottom()
  }

  async function send(){
    const content=doms.msg.value
    if(!content){
      return
    }
    addChat({
      from:body.data.loginId,
      to:null,
      createdAt:Date.now(),
      content
    })
    scrollBottom()
    doms.msg.value=''
    const data=await sendChat(content)
    addChat({
      from:null,
      to:body.data.loginId,
      ...data.data
    })
    scrollBottom()
  }

  doms.formMsg.onsubmit=(e)=>{
    e.preventDefault()
    send()
  }


  function scrollBottom(){
    doms.chatContainer.scrollTop=doms.chatContainer.scrollHeight
  }

  function addChat(obj){
    const div=$$$('div')
    div.classList.add('chat-item')
    const img=$$$('img')
    img.classList.add('chat-avatar')
    img.src="./asset/robot-avatar.jpg"
    if(obj.from){
      div.classList.add('me')
      img.src="./asset/avatar.png"
    }
    const content=$$$('div')
    content.classList.add('chat-content')
    content.innerText=obj.content
    const date=$$$('div')
    date.classList.add('chat-date')
    date.innerText=formateDate(obj.createdAt)

    div.appendChild(img)
    div.appendChild(content)
    div.appendChild(date)

    doms.chatContainer.appendChild(div)
  }

  function formateDate(time){
    const date=new Date(time)
    const year=date.getFullYear()
    const month=(date.getMonth()+1).toString().padStart(2,0)
    const day=(date.getMonth()+1).toString().padStart(2,0)
    const hours=(date.getHours()).toString().padStart(2,0)
    const minutes=(date.getMinutes()).toString().padStart(2,0)
    const seconds=(date.getSeconds()).toString().padStart(2,0)
    return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}`
  }
})()