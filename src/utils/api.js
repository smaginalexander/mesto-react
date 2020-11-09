class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    // инофрмация профиля
    loadingUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                headers: this._headers
            })
            .then(this._checkResult)
    }
    setUserInfo(userInfo) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: userInfo.userName,
                    about: userInfo.userJob
                })
            }
        )
            .then(this._checkResult)
    }
    //загрузка изначальных карточек
    loadingCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResult)
    }
    // добавление новой карточки
    loadNewCard(cardName, cardLink) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then(this._checkResult)
    }
    //редактирование профиля
    redactUserInfo(redactName, redactInfo) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: redactName,
                    about: redactInfo
                })
            })
            .then(this._checkResult);
    }
    //удаление карточки
    deleteCard(itemId) {
        return fetch(`${this._url}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResult);
    }
    //лайк
    likeCard(cardId) {

        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResult);
    }
    //снять лайк
    unlikeCard(cardId) {

        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResult);
    }
    //
    patchNewAvatar(link) {
        console.log(link)
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(link)
        })
            .then(this._checkResult);
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '6d48ba52-ec94-43bc-a696-2925494647b4',
        'Content-Type': 'application/json'
    }
})