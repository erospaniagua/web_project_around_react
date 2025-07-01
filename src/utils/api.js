 class Api{
    constructor({baseUrl, headers}){
        
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
      _request(endpoint, options = {}) {
        const config = {
          headers: this._headers,
          ...options,
        };
        return fetch(this._baseUrl + endpoint, config)
        .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
    }
    
    getInitialCards(){
      return this._request('cards/')
    }

    getUserInfo(){
      return this._request('users/me')
      
    }

    getAppData() {
      return Promise.all([
        this.getUserInfo(),
        this.getInitialCards()
      ]);
    }

    addCard(data) {
      return this._request('cards/', {
        method: 'POST',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    }

    deleteCard(cardid){
      return this._request('cards/' + cardid,{
        method: 'DELETE',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json',
        }
      })
    }

    addLike(cardid){
      return this._request('cards/' + cardid + '/likes',{
        method: 'PUT',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json',
        }
      })
    }

    removeLike(cardid){return this._request('cards/' + cardid + '/likes',{
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json',
      }
    })
  }

    editProfile(data){
      return this._request('users/me', {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    
    }

    editProfileImg(data){
      return this._request('users/me/avatar', {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }

}

 
 const api = new Api({baseUrl:"https://around-api.es.tripleten-services.com/v1/", headers: {
  authorization: "501126dc-a13f-46b3-9344-22355c0ac94e"}}
);

export default api;
