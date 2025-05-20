const BASE_URL='https://study.duyiedu.com'
const TOKEN_KEY='token'

function get(url){
  const headers={'Content-Type':'application/json'}
  const token=localStorage.getItem(TOKEN_KEY)
  if(token){
    headers.authorization=`Bearer ${token}`
  }
  return fetch(`${BASE_URL}${url}`,{
    headers,
  })
}

function post(url,regInfo){
  const headers={'Content-Type':'application/json'}
  const token=localStorage.getItem(TOKEN_KEY)
  if(token){
    headers.authorization=`Bearer ${token}`
  }
  return fetch(`${BASE_URL}${url}`,{
    method:'POST',
    headers,
    body:JSON.stringify(regInfo)
  })
}

async function reg(regInfo){
  const resp=await post(`/api/user/reg`,regInfo)
  const body=await resp.json()
  return body
}

async function login(loginInfo){
  const resp=await post(`/api/user/login`,loginInfo)
  const body=await resp.json()
  if(!body.code){
    const token=resp.headers.get('authorization')
    localStorage.setItem(TOKEN_KEY,token)
  }
  return body
}

async function exists(loginId){
  const resp=await get(`/api/user/exists?loginId=${loginId}`)
  const body=await resp.json()
  return body
}

async function profile(){
  const resp=await get(`/api/user/profile`)
  const body=await resp.json()
  return body
}

async function sendChat(content){
  const resp=await post(`/api/chat`,{content})
  const body=await resp.json()
  return body
}

async function getChat(){
  const resp=await get(`/api/chat/history`)
  const body=await resp.json()
  return body
}

function loginOut(){
  localStorage.removeItem(TOKEN_KEY)
}