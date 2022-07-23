
const url = "https://struclife-db.herokuapp.com"

export const getTasks = async () => {
    try {
      const task = await fetch(`${url}/api/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const _data = await task.json()

    return _data
  }
    catch (error) {
      console.log(error)
    }
  }



 export const getStudys = async () => {
    try {
      const study =  await fetch(`${url}/api/studies`, {	
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
      const _data = await study.json()
        return _data

    } catch (error) {
      console.log(error);
    }
  }

export  const getIdeas = async () => {
    try{

      const _ideas = await fetch(`${url}/api/ideas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const _ideasJson = await _ideas.json()
        return _ideasJson

    }catch(err){
      console.log(err)
    }

  }

export const getTurns = async () => {
    try{ 
    const turns = await fetch(`${url}/api/turns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const turnsJson = await turns.json()
    return turnsJson

    }catch(err){
      console.log(err)
    }
    
  } 

